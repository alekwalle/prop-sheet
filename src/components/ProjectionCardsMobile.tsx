import { YearlyProjectionRow } from "../types";
import { formatCurrency } from "../lib/formatting";

type Props = {
  rows: YearlyProjectionRow[];
};

const ProjectionCardsMobile = ({ rows }: Props) => {
  return (
    <div className="grid gap-3 md:hidden">
      {rows.map((row) => {
        const operatingCosts =
          row.annualCommonCosts +
          row.annualMunicipalFees +
          row.annualPropertyTax +
          row.annualUtilities +
          row.annualOtherCosts +
          row.annualInsurance +
          row.vacancyCost +
          row.maintenanceReserve;
        return (
          <details
            key={row.year}
            className="group rounded-2xl border border-slate-200 bg-white/90 shadow-card dark:border-slate-700 dark:bg-slate-800/80"
          >
            <summary className="flex cursor-pointer items-center justify-between px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  År {row.year}
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(row.cashFlow)}
                </p>
              </div>
              <span className="text-sm text-slate-500 transition group-open:rotate-90 dark:text-slate-300">
                ›
              </span>
            </summary>
            <div className="border-t border-slate-100 px-4 py-3 text-sm dark:border-slate-700/70">
              <Row label="Brutto leie" value={formatCurrency(row.annualGrossRent)} />
              <Row label="Driftskostnader" value={formatCurrency(operatingCosts)} />
              <Row label="Netto leie" value={formatCurrency(row.netRent)} />
              <Row label="Rente" value={formatCurrency(row.interestPaid)} />
              <Row label="Avdrag" value={formatCurrency(row.principalPaid)} />
              <Row label="Terminbeløp" value={formatCurrency(row.debtService)} />
              <Row label="Skatt" value={formatCurrency(row.taxOnNetRent)} />
              <Row label="Rente-fradrag" value={formatCurrency(row.interestDeduction)} />
              <Row
                label="Akk. kontantstrøm"
                value={formatCurrency(row.accumulatedCashFlow)}
                strong
              />
              <Row label="Bygget EK" value={formatCurrency(row.builtEquity)} strong />
            </div>
          </details>
        );
      })}
    </div>
  );
};

const Row = ({
  label,
  value,
  strong
}: {
  label: string;
  value: string;
  strong?: boolean;
}) => (
  <div className="flex items-center justify-between py-1">
    <span className="text-slate-600 dark:text-slate-200">{label}</span>
    <span className={strong ? "font-semibold text-slate-900 dark:text-white" : "text-slate-800"}>
      {value}
    </span>
  </div>
);

export default ProjectionCardsMobile;
