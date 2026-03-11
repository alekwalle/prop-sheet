type Props = {
  label: string;
  value: number; // decimal 0-1
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

const PercentInput = ({ label, value, onChange, min = 0, max = 1, step }: Props) => {
  const percentValue = Number.isFinite(value) ? value * 100 : "";

  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-100">
      <span className="flex items-center justify-between">
        <span>{label}</span>
        <span className="text-xs text-slate-500 dark:text-slate-300">%</span>
      </span>
      <input
        type="number"
        inputMode="decimal"
        value={percentValue}
        min={min * 100}
        max={max * 100}
        step={step ?? "any"}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-inner focus:border-brand-400 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white"
      />
    </label>
  );
};

export default PercentInput;
