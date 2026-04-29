type StatBigProps = {
  label: string;
  value: string;
  sub?: string;
  tone?: 'green' | 'red' | 'neutral';
};

export function StatBig({ label, value, sub, tone = 'neutral' }: StatBigProps) {
  const toneClass =
    tone === 'green'
      ? 'text-emerald-500'
      : tone === 'red'
        ? 'text-red-500'
        : 'text-zinc-900 dark:text-white';

  return (
    <div
      className="
      rounded-2xl p-5
      bg-white dark:bg-zinc-900
      border border-zinc-200 dark:border-zinc-800
      shadow-sm
    "
    >
      <p className="text-[11px] uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-1 text-xl md:text-2xl font-bold leading-tight ${toneClass}`}
      >
        {value}
      </p>

      {sub && <p className="text-xs text-zinc-400 mt-1">{sub}</p>}
    </div>
  );
}
