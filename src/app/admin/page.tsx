'use client';

import { useEffect, useState } from 'react';
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/analytics`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* 🔥 MAIN STATS */}
      <div className="grid md:grid-cols-4 gap-4">
        <Stat title="Total User" value={data.totalUser} />
        <Stat title="Total Signal" value={data.totalSignal} />
        <Stat title="Winrate" value={`${data.winrate}%`} />
        <Stat title="SL Hit" value={data.slCount} />
      </div>

      {/* 🔥 PERFORMANCE */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-medium mb-2">Signal Performance</h2>
          <p className="text-sm text-zinc-500">
            TP: {data.tpCount} | SL: {data.slCount}
          </p>
        </Card>

        <Card>
          <h2 className="font-medium mb-2">Insight</h2>
          <p className="text-sm text-zinc-500">
            Winrate kamu {data.winrate}% —{' '}
            {data.winrate > 60 ? '🔥 bagus' : '⚠️ perlu evaluasi'}
          </p>
        </Card>
      </div>
    </div>
  );
}

function Stat({ title, value }: any) {
  return (
    <div className="p-4 rounded-xl border bg-white dark:bg-zinc-900">
      <p className="text-sm text-zinc-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function Card({ children }: any) {
  return (
    <div className="p-4 rounded-xl border bg-white dark:bg-zinc-900">
      {children}
    </div>
  );
}
