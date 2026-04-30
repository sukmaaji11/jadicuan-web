'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type Trade = {
  createdAt: string;
  profit: number | null;
  status: 'OPEN' | 'CLOSED';
};

export function EquityChart({ trades }: { trades: Trade[] }) {
  const data = buildEquityData(trades || []);
  const last = data[data.length - 1];

  if (!data.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border bg-white text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 mb-4">
        Belum ada trade
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 mb-4">
      <h3 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Equity Curve (Growth)
      </h3>
      <div className="absolute right-4 top-4 text-xs text-zinc-400">
        Equity: Rp {last?.equity.toLocaleString('id-ID')}
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
          >
            {/* 🔥 Gradient */}
            <defs>
              <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>

              {/* 🔥 Glow effect */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid */}
            <CartesianGrid strokeDasharray="3 3" opacity={0.08} />

            {/* X Axis */}
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              tickMargin={10}
              padding={{ left: 10, right: 10 }}
              stroke="#9ca3af"
            />

            {/* Y Axis */}
            <YAxis
              width={65}
              tickMargin={10}
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
              tickFormatter={(v) => `Rp ${v / 1000000}jt`}
            />

            {/* Tooltip */}
            <Tooltip
              formatter={(value: any) =>
                value ? `Rp ${Number(value).toLocaleString('id-ID')}` : '-'
              }
              contentStyle={{
                background: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '10px',
                padding: '8px 12px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#9ca3af' }}
            />

            {/* 🔥 Area */}
            <Area
              type="monotone"
              dataKey="equity"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#equityGradient)"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              style={{ filter: 'url(#glow)' }}
              isAnimationActive
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 🔧 DATA BUILDER
function buildEquityData(trades: Trade[]) {
  let cumulative = 0;

  return trades
    .filter((t) => t.status === 'CLOSED')
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
    .map((t) => {
      cumulative += t.profit ?? 0;

      return {
        date: new Date(t.createdAt).toLocaleString('id-ID', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
        equity: cumulative,
      };
    });
}
