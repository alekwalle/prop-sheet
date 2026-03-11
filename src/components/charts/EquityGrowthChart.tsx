import { YearlyProjectionRow } from "../../types";
import { formatCurrency } from "../../lib/formatting";
import LineChart from "./LineChart";

type Props = {
  data: YearlyProjectionRow[];
};

const EquityGrowthChart = ({ data }: Props) => {
  const points = data.map((row) => ({ label: row.year, value: row.builtEquity }));
  return (
    <LineChart
      title="Opparbeidet egenkapital"
      subtitle="Kontantstrøm + nedbetaling"
      points={points}
      valueFormatter={formatCurrency}
      positiveColor="#0ea5e9"
      negativeColor="#ef4444"
    />
  );
};

export default EquityGrowthChart;
