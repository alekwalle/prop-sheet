import { YearlyProjectionRow } from "../../types";
import { formatCurrency } from "../../lib/formatting";
import LineChart from "./LineChart";

type Props = {
  data: YearlyProjectionRow[];
};

const CashflowChart = ({ data }: Props) => {
  const points = data.map((row) => ({ label: row.year, value: row.cashFlow }));
  return (
    <LineChart
      title="Årlig kontantstrøm"
      subtitle="Etter skatt og gjeldsbetjening"
      points={points}
      valueFormatter={formatCurrency}
      positiveColor="#22c55e"
      negativeColor="#ef4444"
    />
  );
};

export default CashflowChart;
