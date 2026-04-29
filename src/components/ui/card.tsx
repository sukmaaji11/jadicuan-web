export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
      bg-white/80 dark:bg-zinc-900/80
      backdrop-blur
      border border-zinc-200/60 dark:border-zinc-800/60
      rounded-2xl
      shadow-sm
      p-5
    "
    >
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-zinc-500 mb-4">{children}</h2>;
}
