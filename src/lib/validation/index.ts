import { PropertyScenario } from "../../types";

export const safeNumber = (value: number, fallback = 0): number => {
  if (Number.isFinite(value)) return value;
  return fallback;
};

export const clampNumber = (value: number, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY): number => {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
};

/**
 * Accepts either a decimal (0.05) or percentage (5) and returns a decimal rate.
 * Clamped to a reasonable ceiling to avoid runaway projections.
 */
export const normalizeRate = (raw: number, ceiling = 5): number => {
  if (!Number.isFinite(raw)) return 0;
  const rate = raw > 1 ? raw / 100 : raw;
  return clampNumber(rate, 0, ceiling);
};

export const isNonNegativeNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

export const validateScenario = (scenario: PropertyScenario) => {
  const errors: string[] = [];

  const positiveFields: Array<keyof PropertyScenario> = [
    "purchasePrice",
    "purchaseCosts",
    "loanAmount",
    "equity",
    "monthlyRent",
    "monthlyCommonCosts",
    "monthlyMunicipalFees",
    "monthlyPropertyTax",
    "monthlyUtilities",
    "monthlyOtherCosts",
    "monthlyInsurance",
    "loanYears",
    "projectionYears"
  ];

  positiveFields.forEach((field) => {
    if (!isNonNegativeNumber((scenario as any)[field])) {
      errors.push(`${field} must be a non-negative number`);
    }
  });

  if (scenario.loanAmount > scenario.purchasePrice + scenario.purchaseCosts) {
    errors.push("loanAmount cannot exceed total purchase price + costs");
  }

  if (scenario.equity < 0) {
    errors.push("equity cannot be negative");
  }

  if (scenario.manualAnnualPayment != null && scenario.manualAnnualPayment < 0) {
    errors.push("manualAnnualPayment cannot be negative");
  }

  if (scenario.interestRate < 0) errors.push("interestRate cannot be negative");
  if (scenario.vacancyRate < 0) errors.push("vacancyRate cannot be negative");
  if (scenario.maintenanceRate < 0) errors.push("maintenanceRate cannot be negative");
  if (scenario.taxRate < 0) errors.push("taxRate cannot be negative");

  if (scenario.interestOnlyYears && scenario.interestOnlyYears > scenario.loanYears) {
    errors.push("interestOnlyYears cannot exceed total loanYears");
  }

  return {
    ok: errors.length === 0,
    errors
  };
};
