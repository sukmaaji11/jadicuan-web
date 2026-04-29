type MiniStatProps = {
  label: string;
  value: string;
};

export function MiniStat({ label, value }: MiniStatProps) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px] text-zinc-500">{label}</span>
      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {value}
      </span>
    </div>
  );
}
