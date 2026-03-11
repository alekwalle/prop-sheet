type Props = {
  label: string;
  value: string;
  accent?: boolean;
};

const Stat = ({ label, value, accent }: Props) => (
  <div
    className={`flex flex-col gap-1 rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm ${
      accent ? "ring-2 ring-emerald-200" : ""
    }`}
  >
    <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
    <span className="text-lg font-semibold text-slate-900">{value}</span>
  </div>
);

export default Stat;
