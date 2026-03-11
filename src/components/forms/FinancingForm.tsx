import { PropertyScenario } from "../../types";
import NumberInput from "../inputs/NumberInput";
import PercentInput from "../inputs/PercentInput";

type Props = {
  scenario: PropertyScenario;
  onChange: (patch: Partial<PropertyScenario>) => void;
};

const FinancingForm = ({ scenario, onChange }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <NumberInput
        label="Lånebeløp"
        value={scenario.loanAmount}
        onChange={(v) => onChange({ loanAmount: v })}
        suffix="NOK"
        step={10000}
      />
      <NumberInput
        label="Egenkapital"
        value={scenario.equity}
        onChange={(v) => onChange({ equity: v })}
        suffix="NOK"
        step={10000}
      />
      <PercentInput
        label="Nominell rente"
        value={scenario.interestRate}
        onChange={(v) => onChange({ interestRate: v })}
        step={0.05}
        max={0.25}
      />
      <NumberInput
        label="Nedbetalingstid (år)"
        value={scenario.loanYears}
        onChange={(v) => onChange({ loanYears: v })}
        min={1}
        step={1}
      />
      <NumberInput
        label="Avdragsfrihet (år)"
        value={scenario.interestOnlyYears ?? 0}
        onChange={(v) => onChange({ interestOnlyYears: v })}
        min={0}
        step={1}
      />
      <NumberInput
        label="Manuelt årlig terminbeløp"
        value={scenario.manualAnnualPayment ?? 0}
        onChange={(v) => onChange({ manualAnnualPayment: v || null })}
        suffix="NOK"
        step={5000}
      />
    </div>
  );
};

export default FinancingForm;
