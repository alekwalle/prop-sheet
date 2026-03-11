import { PropertyScenario } from "../../types";
import NumberInput from "../inputs/NumberInput";
import PercentInput from "../inputs/PercentInput";

type Props = {
  scenario: PropertyScenario;
  onChange: (patch: Partial<PropertyScenario>) => void;
};

const IncomeForm = ({ scenario, onChange }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <NumberInput
        label="Månedlig leie"
        value={scenario.monthlyRent}
        onChange={(v) => onChange({ monthlyRent: v })}
        suffix="NOK"
        step={500}
      />
      <PercentInput
        label="Ledighet"
        value={scenario.vacancyRate}
        onChange={(v) => onChange({ vacancyRate: v })}
        step={0.1}
        max={0.5}
      />
    </div>
  );
};

export default IncomeForm;
