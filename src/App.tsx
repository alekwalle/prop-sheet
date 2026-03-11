import { useEffect, useState } from "react";
import { useScenarioStore } from "./hooks/useScenarioStore";
import { useScenarioCalculator } from "./hooks/useScenarioCalculator";
import { validateScenario } from "./lib/validation";
import ScenarioSelector from "./components/ScenarioSelector";
import SectionCard from "./components/SectionCard";
import PropertyForm from "./components/forms/PropertyForm";
import FinancingForm from "./components/forms/FinancingForm";
import IncomeForm from "./components/forms/IncomeForm";
import ExpenseForm from "./components/forms/ExpenseForm";
import SummaryCards from "./components/SummaryCards";
import ProjectionTable from "./components/ProjectionTable";
import ProjectionCardsMobile from "./components/ProjectionCardsMobile";
import CashflowChart from "./components/charts/CashflowChart";
import EquityGrowthChart from "./components/charts/EquityGrowthChart";
import InvestmentScoreCard from "./components/InvestmentScoreCard";
import StressTestPanel from "./components/StressTestPanel";

const themeKey = "rental-theme";

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(themeKey) as "light" | "dark" | null;
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(themeKey, theme);
  }, [theme]);

  const {
    scenarios,
    selectedId,
    activeScenario,
    selectScenario,
    updateActiveScenario,
    createScenario,
    duplicateScenario,
    renameScenario,
    deleteScenario
  } = useScenarioStore();

  const hasScenario = Boolean(activeScenario);
  const result = useScenarioCalculator(activeScenario);
  const { summary, yearlyProjection } = result;
  const validation = activeScenario ? validateScenario(activeScenario) : { ok: false, errors: [] };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">
          <header className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/80 px-4 py-4 shadow-card ring-1 ring-transparent backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                  Fase 3 • Klar for publisering
                </p>
                <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  Utleie-analyse
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-200">
                  Kontantstrøm, yield og egenkapital – gratis og helt klient-side.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-300">
                  Endringer lagres automatisk
                </span>
                <button
                  onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-[1px] hover:shadow dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  aria-label="Bytt lys/mørk modus"
                >
                  {theme === "dark" ? "☀️ Lys" : "🌙 Mørk"}
                </button>
              </div>
            </div>
            <ScenarioSelector
              scenarios={scenarios}
              value={selectedId}
              onChange={selectScenario}
              onCreate={createScenario}
              onDuplicate={duplicateScenario}
              onRename={renameScenario}
              onDelete={deleteScenario}
            />
          </header>

          {!hasScenario ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
              Ingen scenarioer. Lag et nytt for å komme i gang.
            </div>
          ) : (
            <>
              {!validation.ok && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm dark:border-amber-400/60 dark:bg-amber-950/50 dark:text-amber-100">
                  <p className="font-semibold">Sjekk tallene:</p>
                  <ul className="list-disc pl-5">
                    {validation.errors.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              <SummaryCards summary={summary} />
              <InvestmentScoreCard summary={summary} />

              <div className="grid gap-4 lg:grid-cols-[360px,1fr]">
                <div className="space-y-3">
                  <SectionCard title="Eiendom" subtitle="Grunnleggende antakelser">
                    <PropertyForm scenario={activeScenario} onChange={updateActiveScenario} />
                  </SectionCard>
                  <SectionCard title="Finansiering" subtitle="Rente, lån og avdrag">
                    <FinancingForm scenario={activeScenario} onChange={updateActiveScenario} />
                  </SectionCard>
                  <SectionCard title="Leieinntekter" subtitle="Inntekt og ledighet">
                    <IncomeForm scenario={activeScenario} onChange={updateActiveScenario} />
                  </SectionCard>
                  <SectionCard title="Kostnader" subtitle="Løpende driftskostnader og skatt">
                    <ExpenseForm scenario={activeScenario} onChange={updateActiveScenario} />
                  </SectionCard>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-card dark:border-slate-700 dark:bg-slate-800/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                          Resultater
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-200">Oppdateres live</p>
                      </div>
                      <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800 dark:bg-brand-200 dark:text-brand-900">
                        {activeScenario.name}
                      </span>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <CashflowChart data={yearlyProjection} />
                      <EquityGrowthChart data={yearlyProjection} />
                    </div>
                  </div>

                  <StressTestPanel
                    baseScenario={activeScenario}
                    baseNetYield={summary.netYield}
                    baseCashFlowYear1={summary.monthlyNetCashFlow * 12}
                    baseEquity10={summary.builtEquityYear10}
                    baseScore={summary.investmentScore}
                  />

                  <SectionCard title="Prognose" subtitle="Årlig utvikling" collapsible={false} defaultOpen>
                    <ProjectionCardsMobile rows={yearlyProjection} />
                    <ProjectionTable rows={yearlyProjection} />
                  </SectionCard>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
