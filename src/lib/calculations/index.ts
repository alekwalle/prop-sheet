import {
  CalculationResult,
  LoanAmortizationRow,
  PropertyScenario,
  SummaryMetrics,
  YearlyProjectionRow
} from "../../types";
import { clampNumber, normalizeRate, safeNumber } from "../validation";

const MONTHS_IN_YEAR = 12;

const annuityPayment = (principal: number, monthlyRate: number, months: number) => {
  if (months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, -months);
  return principal * (monthlyRate / (1 - factor));
};

const aggregateDebtByYear = (schedule: LoanAmortizationRow[]) => {
  const byYear: Record<
    number,
    { interest: number; principal: number; payment: number; closingBalance: number }
  > = {};

  schedule.forEach((row) => {
    const existing = byYear[row.year] ?? {
      interest: 0,
      principal: 0,
      payment: 0,
      closingBalance: row.closingBalance
    };

    byYear[row.year] = {
      interest: existing.interest + row.interest,
      principal: existing.principal + row.principal,
      payment: existing.payment + row.payment,
      closingBalance: row.closingBalance
    };
  });

  return byYear;
};

export const buildAmortizationSchedule = (scenario: PropertyScenario): LoanAmortizationRow[] => {
  const schedule: LoanAmortizationRow[] = [];
  const monthlyRate = normalizeRate(scenario.interestRate) / MONTHS_IN_YEAR;
  const totalMonths = Math.max(1, Math.round(scenario.loanYears * MONTHS_IN_YEAR));
  const interestOnlyMonths = Math.max(0, Math.round((scenario.interestOnlyYears ?? 0) * MONTHS_IN_YEAR));
  const manualMonthlyPayment =
    scenario.manualAnnualPayment != null ? scenario.manualAnnualPayment / MONTHS_IN_YEAR : null;

  let balance = scenario.loanAmount;

  for (let month = 1; month <= totalMonths; month++) {
    const year = Math.ceil(month / MONTHS_IN_YEAR);
    const interestOnly = month <= interestOnlyMonths;
    const interest = safeNumber(balance * monthlyRate, 0);
    const remainingMonths = totalMonths - month + 1;

    let payment: number;
    let principal: number;

    if (manualMonthlyPayment != null) {
      payment = manualMonthlyPayment;
      const principalCandidate = payment - interest;
      principal = principalCandidate > 0 ? principalCandidate : 0;
    } else if (interestOnly) {
      if (monthlyRate === 0) {
        payment = 0;
        principal = 0;
      } else {
        payment = interest;
        principal = 0;
      }
    } else {
      if (monthlyRate === 0) {
        payment = balance / remainingMonths;
        principal = payment;
      } else {
        payment = annuityPayment(balance, monthlyRate, remainingMonths);
        principal = Math.max(payment - interest, 0);
      }
    }

    // Avoid negative amortization
    if (payment < interest && monthlyRate > 0) {
      payment = interest;
      principal = 0;
    }

    if (principal > balance) {
      principal = balance;
      payment = interest + principal;
    }

    const closingBalance = safeNumber(balance - principal, 0);

    schedule.push({
      month,
      year,
      openingBalance: balance,
      interest,
      principal,
      payment,
      closingBalance,
      interestOnly
    });

    balance = closingBalance;
  }

  return schedule;
};

export const buildProjection = (
  scenario: PropertyScenario,
  schedule: LoanAmortizationRow[]
): YearlyProjectionRow[] => {
  const projection: YearlyProjectionRow[] = [];
  const debtByYear = aggregateDebtByYear(schedule);

  const rentGrowthRate = normalizeRate(scenario.annualRentGrowthRate);
  const inflationRate = normalizeRate(scenario.inflationRate);
  const vacancyRate = normalizeRate(scenario.vacancyRate);
  const maintenanceRate = normalizeRate(scenario.maintenanceRate);
  const taxRate = normalizeRate(scenario.taxRate);

  const baseGrossRent = scenario.monthlyRent * MONTHS_IN_YEAR;
  const baseCosts = {
    common: scenario.monthlyCommonCosts * MONTHS_IN_YEAR,
    municipal: scenario.monthlyMunicipalFees * MONTHS_IN_YEAR,
    propertyTax: scenario.monthlyPropertyTax * MONTHS_IN_YEAR,
    utilities: scenario.monthlyUtilities * MONTHS_IN_YEAR,
    other: scenario.monthlyOtherCosts * MONTHS_IN_YEAR,
    insurance: scenario.monthlyInsurance * MONTHS_IN_YEAR
  };

  let accumulatedCashFlow = 0;
  let accumulatedPrincipal = 0;

  for (let year = 1; year <= scenario.projectionYears; year++) {
    const rentFactor = Math.pow(1 + rentGrowthRate, year - 1);
    const costFactor = Math.pow(1 + inflationRate, year - 1);

    const annualGrossRent = baseGrossRent * rentFactor;
    const annualCommonCosts = baseCosts.common * costFactor;
    const annualMunicipalFees = baseCosts.municipal * costFactor;
    const annualPropertyTax = baseCosts.propertyTax * costFactor;
    const annualUtilities = baseCosts.utilities * costFactor;
    const annualOtherCosts = baseCosts.other * costFactor;
    const annualInsurance = baseCosts.insurance * costFactor;
    const vacancyCost = annualGrossRent * vacancyRate;
    const maintenanceReserve = annualGrossRent * maintenanceRate;

    const netRent =
      annualGrossRent -
      annualCommonCosts -
      annualMunicipalFees -
      annualPropertyTax -
      annualUtilities -
      annualOtherCosts -
      annualInsurance -
      vacancyCost -
      maintenanceReserve;

    const debtService = debtByYear[year]?.payment ?? 0;
    const interestPaid = debtByYear[year]?.interest ?? 0;
    const principalPaid = debtByYear[year]?.principal ?? 0;

    const taxOnNetRent = Math.max(netRent, 0) * taxRate;
    const interestDeduction = interestPaid * taxRate;
    const cashFlow = netRent - debtService - taxOnNetRent + interestDeduction;

    accumulatedCashFlow += cashFlow;
    accumulatedPrincipal += principalPaid;

    const remainingBalance = debtByYear[year]?.closingBalance ?? 0;
    const builtEquity = accumulatedCashFlow + accumulatedPrincipal;

    projection.push({
      year,
      annualGrossRent,
      annualCommonCosts,
      annualMunicipalFees,
      annualPropertyTax,
      annualUtilities,
      annualOtherCosts,
      annualInsurance,
      vacancyCost,
      maintenanceReserve,
      netRent,
      interestPaid,
      principalPaid,
      debtService,
      taxOnNetRent,
      interestDeduction,
      cashFlow,
      accumulatedCashFlow,
      remainingBalance,
      builtEquity
    });
  }

  return projection;
};

const computeInvestmentScore = (
  scenario: PropertyScenario,
  projection: YearlyProjectionRow[]
): number => {
  if (projection.length === 0) return 0;
  const first = projection[0];
  const equity = Math.max(scenario.equity, 1);
  const grossYield = first.annualGrossRent / (scenario.purchasePrice + scenario.purchaseCosts);
  const netYield = first.netRent / (scenario.purchasePrice + scenario.purchaseCosts);
  const cashFlowYield = first.cashFlow / equity;
  const builtEquityYear10 = projection[Math.min(9, projection.length - 1)].builtEquity;

  const grossScore = clampNumber(grossYield / 0.12, 0, 1) * 25; // cap at 12% gross
  const netScore = clampNumber(netYield / 0.08, 0, 1) * 25; // cap at 8% net
  const cashScore = clampNumber(cashFlowYield / 0.06, 0, 1) * 25; // cap at 6% cash flow yield
  const equityScore = clampNumber(builtEquityYear10 / equity, 0, 2) / 2 * 25; // up to 200% equity growth

  return clampNumber(grossScore + netScore + cashScore + equityScore, 0, 100);
};

export const computeSummary = (
  scenario: PropertyScenario,
  projection: YearlyProjectionRow[]
): SummaryMetrics => {
  const firstYear = projection[0];
  const equity = Math.max(scenario.equity, 1);
  const costBasis = scenario.purchasePrice + scenario.purchaseCosts;

  const grossYield = firstYear ? firstYear.annualGrossRent / costBasis : 0;
  const netYield = firstYear ? firstYear.netRent / costBasis : 0;
  const cashFlowYield = firstYear ? firstYear.cashFlow / equity : 0;
  const netRentOnEquity = firstYear ? firstYear.netRent / equity : 0;
  const cashFlowPlusPrincipalOnEquity = firstYear
    ? (firstYear.cashFlow + firstYear.principalPaid) / equity
    : 0;
  const builtEquityYear10 =
    projection.length >= 10 ? projection[9].builtEquity : projection.at(-1)?.builtEquity ?? 0;
  const monthlyNetCashFlow = firstYear ? firstYear.cashFlow / MONTHS_IN_YEAR : 0;
  const annualDebtService = firstYear?.debtService ?? 0;
  const investmentScore = computeInvestmentScore(scenario, projection);

  return {
    scenarioId: scenario.id,
    grossYield,
    netYield,
    cashFlowYield,
    netRentOnEquity,
    cashFlowPlusPrincipalOnEquity,
    builtEquityYear10,
    monthlyNetCashFlow,
    annualDebtService,
    investmentScore
  };
};

export const computeScenario = (scenario: PropertyScenario): CalculationResult => {
  const amortizationSchedule = buildAmortizationSchedule(scenario);
  const yearlyProjection = buildProjection(scenario, amortizationSchedule);
  const summary = computeSummary(scenario, yearlyProjection);

  return {
    amortizationSchedule,
    yearlyProjection,
    summary
  };
};
