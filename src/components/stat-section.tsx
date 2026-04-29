import { StatBig } from './stat-big';
import { MiniStat } from './mini-stat';

type Props = {
  analytics: any;
  dd: any;
  formatShort: (n: number) => string;
};

export function StatsSection({ analytics, dd, formatShort }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 shadow-sm">
      {/* 🔥 PRIMARY KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 rounded-xl md:rounded-2xl shadow-sm md:shadow">
        <StatBig
          label="Total Profit"
          value={`Rp ${formatShort(analytics.totalProfit)}`}
          tone="green"
        />

        <StatBig label="Winrate" value={`${analytics.winrate.toFixed(0)}%`} />

        <StatBig
          label="Max Drawdown"
          value={`Rp ${formatShort(dd.maxDrawdown)}`}
          sub={`${dd.maxDDPct.toFixed(1)}%`}
          tone="red"
        />
      </div>

      {/* ⚖️ SECONDARY */}
      <div className="flex justify-center md:justify-start gap-6 text-sm text-zinc-500 mb-6">
        {' '}
        <span>
          Win: <b className="text-emerald-500">5</b>
        </span>
        <span>
          Loss: <b className="text-red-500">2</b>
        </span>
      </div>

      {/* 🧠 ADVANCED */}
      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-xs uppercase tracking-wide text-zinc-400 mb-4">
          Performance
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <MiniStat
            label="Avg Win"
            value={`Rp ${formatShort(analytics.avgWin)}`}
          />
          <MiniStat
            label="Avg Loss"
            value={`Rp ${formatShort(Math.abs(analytics.avgLoss))}`}
          />
          <MiniStat label="RR" value={analytics.safeRR.toFixed(2)} />
          <MiniStat
            label="Expectancy"
            value={`Rp ${formatShort(analytics.expectancy)}`}
          />
        </div>
      </div>
    </div>
  );
}
