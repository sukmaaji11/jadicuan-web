import AdminSignalCard from '@/components/admin-signal-card';
import prisma from '@/lib/prisma';

export default async function AdminSignalsPage() {
  const signals = await prisma.signal.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">
          Admin – Signal Saham
        </h1>
        <a
          href="/admin/signals/create"
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
        >
          + Tambah Signal
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {signals.map((signal) => (
          <AdminSignalCard key={signal.id} signal={signal} />
        ))}
      </div>
    </div>
  );
}
