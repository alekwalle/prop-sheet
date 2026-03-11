type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
};

const SectionCard = ({ title, subtitle, children, defaultOpen = true, collapsible = true }: Props) => {
  if (collapsible) {
    return (
      <details
        open={defaultOpen}
        className="group rounded-2xl border border-slate-200 bg-white/90 shadow-card transition hover:-translate-y-[1px] hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/80"
      >
        <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
              {title}
            </p>
            {subtitle && <p className="text-sm text-slate-600 dark:text-slate-200">{subtitle}</p>}
          </div>
          <span className="text-xs text-slate-500 transition group-open:rotate-90 dark:text-slate-300">›</span>
        </summary>
        <div className="border-t border-slate-100 px-4 py-4 dark:border-slate-700">{children}</div>
      </details>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-card dark:border-slate-700 dark:bg-slate-800/80">
      <div className="px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
          {title}
        </p>
        {subtitle && <p className="text-sm text-slate-600 dark:text-slate-200">{subtitle}</p>}
      </div>
      <div className="border-t border-slate-100 px-4 py-4 dark:border-slate-700">{children}</div>
    </div>
  );
};

export default SectionCard;
