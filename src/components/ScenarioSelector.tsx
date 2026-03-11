import { PropertyScenario } from "../types";

type Props = {
  scenarios: PropertyScenario[];
  value: string;
  onChange: (id: string) => void;
  onCreate: () => void;
  onDuplicate: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};

const ScenarioSelector = ({
  scenarios,
  value,
  onChange,
  onCreate,
  onDuplicate,
  onRename,
  onDelete
}: Props) => {
  const current = scenarios.find((s) => s.id === value);

  const handleRename = () => {
    if (!current) return;
    const name = prompt("Nytt navn på scenarioet:", current.name);
    if (name && name.trim().length > 1) onRename(current.id, name.trim());
  };

  const handleDelete = () => {
    if (!current) return;
    if (confirm(`Slett scenario "${current.name}"?`)) onDelete(current.id);
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-3 shadow-sm ring-1 ring-transparent transition hover:ring-brand-200 dark:border-slate-700 dark:bg-slate-800/70">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
            Scenario
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-100">
            Velg, lagre, kopier eller slett
          </p>
        </div>
        <button
          onClick={onCreate}
          className="rounded-full bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-brand-700"
        >
          Nytt
        </button>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-[200px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm focus:border-brand-400 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        >
          {scenarios.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            onClick={() => current && onDuplicate(current.id)}
            className="rounded-lg border border-slate-200 px-3 py-2 font-semibold text-slate-800 shadow-sm hover:border-brand-300 hover:text-brand-800 dark:border-slate-600 dark:text-slate-100"
          >
            Dupliser
          </button>
          <button
            onClick={handleRename}
            className="rounded-lg border border-slate-200 px-3 py-2 font-semibold text-slate-800 shadow-sm hover:border-brand-300 hover:text-brand-800 dark:border-slate-600 dark:text-slate-100"
          >
            Endre navn
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg border border-rose-200 px-3 py-2 font-semibold text-rose-700 shadow-sm hover:bg-rose-50 dark:border-rose-400/60 dark:text-rose-100 dark:hover:bg-rose-950"
          >
            Slett
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSelector;
