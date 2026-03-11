import { useMemo } from "react";
import { computeScenario } from "../lib/calculations";
import { PropertyScenario } from "../types";

const empty = computeScenario(
  // minimal dummy to avoid undefined branching; not exported
  {
    id: "empty",
    name: "Empty",
    purchasePrice: 0,
    purchaseCosts: 0,
    loanAmount: 0,
    equity: 1,
    interestRate: 0,
    loanYears: 1,
    monthlyRent: 0,
    monthlyCommonCosts: 0,
    monthlyMunicipalFees: 0,
    monthlyPropertyTax: 0,
    monthlyUtilities: 0,
    monthlyOtherCosts: 0,
    monthlyInsurance: 0,
    vacancyRate: 0,
    maintenanceRate: 0,
    taxRate: 0,
    inflationRate: 0,
    annualRentGrowthRate: 0,
    projectionYears: 1,
    interestOnlyYears: 0,
    manualAnnualPayment: 0
  }
);

export const useScenarioCalculator = (scenario?: PropertyScenario) =>
  useMemo(() => (scenario ? computeScenario(scenario) : empty), [scenario]);
