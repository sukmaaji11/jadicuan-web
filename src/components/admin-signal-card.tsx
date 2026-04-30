'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Signal = {
  id: string;
  code: string;
  companyName?: string | null;
  entryMin: number;
  entryMax: number;
  tp1?: number | null;
  sl: number;
  status: 'OPEN' | 'TP1' | 'TP2' | 'SL';
};

export default function AdminSignalCard({ signal }: { signal: Signal }) {
  const router = useRouter();

  const statusMap = {
    OPEN: {
      label: '🟢 Open',
      class: 'bg-emerald-500/10 text-emerald-500',
    },
    TP1: {
      label: '🎯 TP1',
      class: 'bg-blue-500/10 text-blue-500',
    },
    TP2: {
      label: '🚀 TP2',
      class: 'bg-indigo-500/10 text-indigo-500',
    },
    SL: {
      label: '❌ SL',
      class: 'bg-rose-500/10 text-rose-500',
    },
    CLOSED: {
      label: '⚫ Closed',
      class: 'bg-zinc-500/10 text-zinc-500',
    },
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      `Hapus signal ${signal.code}? Ini tidak bisa dibatalkan.`,
    );

    if (!confirmDelete) return;

    try {
      await fetch(`/api/admin/signal/${signal.id}`, {
        method: 'DELETE',
      });

      router.refresh();
    } catch {
      alert('Terjadi kesalahan');
    }
  };

  return (
    <div className="group rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-dark">{signal.code}</h3>
          <p className="text-xs text-zinc-400">
            {signal.companyName || 'Nama Perusahaan'}
          </p>
        </div>

        <span
          className={`
    px-3 py-1 rounded-full text-xs font-medium
    ${statusMap[signal.status].class}
  `}
        >
          {statusMap[signal.status].label}
        </span>
      </div>

      {/* Price Info */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-zinc-400">
        <div>
          Entry
          <div className="font-medium text-dark">
            {signal.entryMin} – {signal.entryMax}
          </div>
        </div>
        <div>
          TP1
          <div className="font-medium text-dark">{signal.tp1 ?? '-'}</div>
        </div>
        <div>
          SL
          <div className="font-medium text-dark">{signal.sl}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-end gap-3 text-xs">
        <Link
          href={`/admin/signals/${signal.id}/edit`}
          className="text-blue-400 hover:text-blue-300"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="text-xs text-rose-500 hover:text-rose-600 transition"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
