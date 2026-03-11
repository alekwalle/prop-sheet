export type PropertyScenario = {
  id: string;
  name: string;
  purchasePrice: number;
  purchaseCosts: number;
  loanAmount: number;
  equity: number;
  interestRate: number; // decimal e.g. 0.05 for 5%
  loanYears: number;
  monthlyRent: number;
  monthlyCommonCosts: number;
  monthlyMunicipalFees: number;
  monthlyPropertyTax: number;
  monthlyUtilities: number;
  monthlyOtherCosts: number;
  monthlyInsurance: number;
  vacancyRate: number; // decimal
  maintenanceRate: number; // decimal
  taxRate: number; // decimal
  inflationRate: number; // decimal
  annualRentGrowthRate: number; // decimal
  projectionYears: number;
  interestOnlyYears?: number;
  manualAnnualPayment?: number | null;
};

export type LoanAmortizationRow = {
  month: number;
  year: number;
  openingBalance: number;
  interest: number;
  principal: number;
  payment: number;
  closingBalance: number;
  interestOnly: boolean;
};

export type YearlyProjectionRow = {
  year: number;
  annualGrossRent: number;
  annualCommonCosts: number;
  annualMunicipalFees: number;
  annualPropertyTax: number;
  annualUtilities: number;
  annualOtherCosts: number;
  annualInsurance: number;
  vacancyCost: number;
  maintenanceReserve: number;
  netRent: number;
  interestPaid: number;
  principalPaid: number;
  debtService: number;
  taxOnNetRent: number;
  interestDeduction: number;
  cashFlow: number;
  accumulatedCashFlow: number;
  remainingBalance: number;
  builtEquity: number;
};

export type SummaryMetrics = {
  scenarioId: string;
  grossYield: number;
  netYield: number;
  cashFlowYield: number;
  netRentOnEquity: number;
  cashFlowPlusPrincipalOnEquity: number;
  builtEquityYear10: number;
  monthlyNetCashFlow: number;
  annualDebtService: number;
  investmentScore: number;
};

export type StressTestResult = {
  id: string;
  label: string;
  adjustedScenario: PropertyScenario;
  summary: SummaryMetrics;
  notes?: string;
};

export type CalculationResult = {
  amortizationSchedule: LoanAmortizationRow[];
  yearlyProjection: YearlyProjectionRow[];
  summary: SummaryMetrics;
};
