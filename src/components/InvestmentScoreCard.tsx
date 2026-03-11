import { SummaryMetrics } from "../types";

type Props = {
  summary: SummaryMetrics;
};

const InvestmentScoreCard = ({ summary }: Props) => {
  const score = Math.round(summary.investmentScore);
  const gradient = `conic-gradient(#22c55e ${score * 3.6}deg, #e2e8f0 ${score * 3.6}deg)`;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-card dark:border-slate-700 dark:bg-slate-800/90">
      <div
        className="relative grid h-20 w-20 place-items-center rounded-full bg-slate-100 dark:bg-slate-900"
        style={{ backgroundImage: gradient }}
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-lg font-semibold text-slate-900 shadow-inner dark:bg-slate-800 dark:text-white">
          {score}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
          Investering score
        </p>
        <p className="text-lg font-semibold text-slate-900 dark:text-white">
          {score} / 100
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-200">
          Kombinerer yield, kontantstrøm og egenkapital-oppbygging
        </p>
      </div>
    </div>
  );
};

export default InvestmentScoreCard;
