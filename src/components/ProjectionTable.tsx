import { YearlyProjectionRow } from "../types";
import { formatCurrency } from "../lib/formatting";

type Props = {
  rows: YearlyProjectionRow[];
};

const ProjectionTable = ({ rows }: Props) => {
  return (
    <div className="hidden overflow-auto rounded-2xl border border-slate-200 bg-white/90 shadow-card dark:border-slate-700 dark:bg-slate-800/80 md:block">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-300">
          <tr>
            <Th>År</Th>
            <Th>Brutto leie</Th>
            <Th>Driftskost</Th>
            <Th>Netto leie</Th>
            <Th>Rente</Th>
            <Th>Avdrag</Th>
            <Th>Terminbeløp</Th>
            <Th>Skatt</Th>
            <Th>Rente-fradrag</Th>
            <Th>Kontantstrøm</Th>
            <Th>Oppsamlet kontantstrøm</Th>
            <Th>Bygget EK</Th>
          </tr>
        </thead>
        <tbody>
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
              <tr key={row.year} className="border-t border-slate-100 dark:border-slate-700/60">
                <Td>{row.year}</Td>
                <Td>{formatCurrency(row.annualGrossRent)}</Td>
                <Td>{formatCurrency(operatingCosts)}</Td>
                <Td>{formatCurrency(row.netRent)}</Td>
                <Td>{formatCurrency(row.interestPaid)}</Td>
                <Td>{formatCurrency(row.principalPaid)}</Td>
                <Td>{formatCurrency(row.debtService)}</Td>
                <Td>{formatCurrency(row.taxOnNetRent)}</Td>
                <Td>{formatCurrency(row.interestDeduction)}</Td>
                <Td className={row.cashFlow >= 0 ? "text-emerald-600" : "text-rose-600"}>
                  {formatCurrency(row.cashFlow)}
                </Td>
                <Td>{formatCurrency(row.accumulatedCashFlow)}</Td>
                <Td className="font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(row.builtEquity)}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-2 text-left">{children}</th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="px-3 py-2 align-top text-slate-800 dark:text-slate-100">{children}</td>
);

export default ProjectionTable;
