import { PropertyScenario } from "../../types";
import NumberInput from "../inputs/NumberInput";
import PercentInput from "../inputs/PercentInput";

type Props = {
  scenario: PropertyScenario;
  onChange: (patch: Partial<PropertyScenario>) => void;
};

const ExpenseForm = ({ scenario, onChange }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <NumberInput
        label="Felleskostnader pr mnd"
        value={scenario.monthlyCommonCosts}
        onChange={(v) => onChange({ monthlyCommonCosts: v })}
        suffix="NOK"
        step={250}
      />
      <NumberInput
        label="Kommunale avgifter pr mnd"
        value={scenario.monthlyMunicipalFees}
        onChange={(v) => onChange({ monthlyMunicipalFees: v })}
        suffix="NOK"
        step={250}
      />
      <NumberInput
        label="Eiendomsskatt pr mnd"
        value={scenario.monthlyPropertyTax}
        onChange={(v) => onChange({ monthlyPropertyTax: v })}
        suffix="NOK"
        step={250}
      />
      <NumberInput
        label="Strøm/oppvarming pr mnd"
        value={scenario.monthlyUtilities}
        onChange={(v) => onChange({ monthlyUtilities: v })}
        suffix="NOK"
        step={250}
      />
      <NumberInput
        label="Andre kostnader pr mnd"
        value={scenario.monthlyOtherCosts}
        onChange={(v) => onChange({ monthlyOtherCosts: v })}
        suffix="NOK"
        step={250}
      />
      <NumberInput
        label="Forsikring pr mnd"
        value={scenario.monthlyInsurance}
        onChange={(v) => onChange({ monthlyInsurance: v })}
        suffix="NOK"
        step={100}
      />
      <PercentInput
        label="Vedlikeholdsavsetning"
        value={scenario.maintenanceRate}
        onChange={(v) => onChange({ maintenanceRate: v })}
        step={0.1}
        max={0.5}
      />
      <PercentInput
        label="Skattesats"
        value={scenario.taxRate}
        onChange={(v) => onChange({ taxRate: v })}
        step={0.1}
        max={0.7}
      />
    </div>
  );
};

export default ExpenseForm;
