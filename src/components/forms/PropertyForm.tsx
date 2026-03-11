import { PropertyScenario } from "../../types";
import NumberInput from "../inputs/NumberInput";
import PercentInput from "../inputs/PercentInput";

type Props = {
  scenario: PropertyScenario;
  onChange: (patch: Partial<PropertyScenario>) => void;
};

const PropertyForm = ({ scenario, onChange }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-100 sm:col-span-2">
        <span>Navn</span>
        <input
          type="text"
          value={scenario.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-inner focus:border-brand-400 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </label>
      <NumberInput
        label="Kjøpesum"
        value={scenario.purchasePrice}
        onChange={(v) => onChange({ purchasePrice: v })}
        suffix="NOK"
        step={10000}
      />
      <NumberInput
        label="Kjøpskostnader"
        value={scenario.purchaseCosts}
        onChange={(v) => onChange({ purchaseCosts: v })}
        suffix="NOK"
        step={5000}
      />
      <NumberInput
        label="Prognose (år)"
        value={scenario.projectionYears}
        onChange={(v) => onChange({ projectionYears: v })}
        min={1}
        step={1}
      />
      <PercentInput
        label="Årlig leievekst"
        value={scenario.annualRentGrowthRate}
        onChange={(v) => onChange({ annualRentGrowthRate: v })}
        step={0.1}
        max={0.15}
      />
      <PercentInput
        label="Inflasjon (kostnader)"
        value={scenario.inflationRate}
        onChange={(v) => onChange({ inflationRate: v })}
        step={0.1}
        max={0.15}
      />
    </div>
  );
};

export default PropertyForm;
