import { SummaryMetrics } from "../types";
import { formatCompact, formatCurrency, formatPercent } from "../lib/formatting";

type Props = {
  summary: SummaryMetrics;
};

const SummaryCards = ({ summary }: Props) => {
  const items = [
    { label: "Brutto yield", value: formatPercent(summary.grossYield) },
    { label: "Netto yield", value: formatPercent(summary.netYield) },
    { label: "Månedlig kontantstrøm", value: formatCurrency(summary.monthlyNetCashFlow) },
    { label: "Årlig gjeldsbetjening", value: formatCurrency(summary.annualDebtService) },
    { label: "Bygget EK (10 år)", value: formatCompact(summary.builtEquityYear10) }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white/80 px-3 py-3 shadow-card ring-1 ring-transparent transition hover:-translate-y-[1px] hover:shadow-lg hover:ring-brand-200 dark:border-slate-700 dark:bg-slate-800/80"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
            {item.label}
          </span>
          <span className="text-lg font-semibold text-slate-950 dark:text-white">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
