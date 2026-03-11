type Point = { label: string | number; value: number };

type Props = {
  title: string;
  subtitle?: string;
  points: Point[];
  valueFormatter?: (v: number) => string;
  positiveColor?: string;
  negativeColor?: string;
};

const LineChart = ({
  title,
  subtitle,
  points,
  valueFormatter = (v) => v.toString(),
  positiveColor = "#22c55e",
  negativeColor = "#ef4444"
}: Props) => {
  if (points.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
        Ingen data ennå.
      </div>
    );
  }

  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const path = points
    .map((p, idx) => {
      const x = (idx / Math.max(points.length - 1, 1)) * 100;
      const y = 100 - ((p.value - min) / span) * 100;
      return `${idx === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");

  const fillPath =
    path +
    ` L 100,100 L 0,100 Z`; // close to bottom to create area fill

  const color = max >= 0 ? positiveColor : negativeColor;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-card dark:border-slate-700 dark:bg-slate-800/80">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
            {title}
          </p>
          {subtitle && <p className="text-sm text-slate-600 dark:text-slate-200">{subtitle}</p>}
        </div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {valueFormatter(points[points.length - 1].value)}
        </p>
      </div>
      <svg viewBox="0 0 100 100" className="mt-3 h-32 w-full">
        <path d={fillPath} fill={`${color}22`} stroke="none" />
        <path d={path} fill="none" stroke={color} strokeWidth={2} />
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-slate-500 dark:text-slate-300">
        {points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
