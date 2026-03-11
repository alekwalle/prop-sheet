import { useMemo } from "react";
import { PropertyScenario } from "../types";
import { computeScenario } from "../lib/calculations";
import { formatCurrency, formatPercent } from "../lib/formatting";

type Props = {
  baseScenario: PropertyScenario;
  baseNetYield: number;
  baseCashFlowYear1: number;
  baseEquity10: number;
  baseScore: number;
};

type StressRow = {
  id: string;
  label: string;
  scenario: PropertyScenario;
  cashFlow: number;
  netYield: number;
  equity10: number;
  score: number;
};

const StressTestPanel = ({ baseScenario, baseNetYield, baseCashFlowYear1, baseEquity10, baseScore }: Props) => {
  const items: StressRow[] = useMemo(() => {
    const adjustments = [
      {
        id: "rate-up",
        label: "Rente +1 pp",
        adjust: (s: PropertyScenario) => ({ ...s, interestRate: s.interestRate + 0.01 })
      },
      {
        id: "rent-down",
        label: "Leie -5 %",
        adjust: (s: PropertyScenario) => ({ ...s, monthlyRent: Math.max(0, s.monthlyRent * 0.95) })
      },
      {
        id: "vacancy-up",
        label: "Ledighet +3 pp",
        adjust: (s: PropertyScenario) => ({ ...s, vacancyRate: Math.min(0.9, s.vacancyRate + 0.03) })
      },
      {
        id: "maint-up",
        label: "Vedlikehold +2 pp",
        adjust: (s: PropertyScenario) => ({ ...s, maintenanceRate: Math.min(0.5, s.maintenanceRate + 0.02) })
      }
    ];

    return adjustments.map((a) => {
      const scenario = a.adjust(baseScenario);
      const { summary } = computeScenario(scenario);
      return {
        id: a.id,
        label: a.label,
        scenario,
        cashFlow: summary.monthlyNetCashFlow * 12,
        netYield: summary.netYield,
        equity10: summary.builtEquityYear10,
        score: summary.investmentScore
      };
    });
  }, [baseScenario]);

  const renderDelta = (current: number, base: number, formatter: (v: number) => string) => {
    const delta = current - base;
    const positive = delta >= 0;
    return (
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-900 dark:text-white">{formatter(current)}</span>
        <span className={`text-xs ${positive ? "text-emerald-600" : "text-rose-600"}`}>
          {positive ? "+" : ""}
          {formatter(delta)}
        </span>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-card dark:border-slate-700 dark:bg-slate-800/80">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
            Stress-test
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-200">Se hvordan nøkkeltall flytter seg</p>
        </div>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/60"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</span>
              <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Scenario
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-200">
              <span>K-strøm (år 1)</span>
              {renderDelta(item.cashFlow, baseCashFlowYear1, formatCurrency)}
              <span>Netto yield</span>
              {renderDelta(item.netYield, baseNetYield, formatPercent)}
              <span>Bygget EK (10 år)</span>
              {renderDelta(item.equity10, baseEquity10, formatCurrency)}
              <span>Score</span>
              {renderDelta(item.score, baseScore, (v) => `${Math.round(v)}p`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StressTestPanel;
