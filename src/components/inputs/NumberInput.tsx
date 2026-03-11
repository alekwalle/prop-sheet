type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  min?: number;
  step?: number;
};

const NumberInput = ({ label, value, onChange, suffix, min = 0, step }: Props) => {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-100">
      <span className="flex items-center justify-between">
        <span>{label}</span>
        {suffix && <span className="text-xs text-slate-500 dark:text-slate-300">{suffix}</span>}
      </span>
      <input
        type="number"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        step={step ?? "any"}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-inner focus:border-brand-400 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white"
      />
    </label>
  );
};

export default NumberInput;
