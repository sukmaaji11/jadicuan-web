'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Target, Shield, Clock, Activity } from 'lucide-react';
import type { Signal } from '@prisma/client';

type Filter = 'ALL' | 'OPEN' | 'TP1' | 'TP2' | 'SL';

function isToday(d: Date) {
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

function formatDate(d: Date | string) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(date);
}

export default function WatchlistClient({ signals }: { signals: Signal[] }) {
  const [filter, setFilter] = useState<Filter>('ALL');
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const filtered = useMemo(() => {
    if (filter === 'ALL') return signals;
    return signals.filter((s) => s.status === filter);
  }, [signals, filter]);

  const todayList = filtered.filter((s) => isToday(new Date(s.createdAt)));
  const prevList = filtered.filter((s) => !isToday(new Date(s.createdAt)));

  const Card = ({ s }: { s: Signal }) => (
    <div
      key={s.id}
      className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm transition hover:shadow-md
                 dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <Activity className="mt-0.5 h-4 w-4 text-zinc-400" />
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {s.code}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {s.companyName ?? 'Nama Perusahaan'}
            </p>
          </div>
        </div>

        {/* Badge Status */}
        <span
          className={`rounded-full px-2 py-1 text-[11px] font-medium ${
            s.status === 'OPEN'
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800'
              : s.status === 'TP1'
                ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-800'
                : s.status === 'TP2'
                  ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:ring-indigo-800'
                  : s.status === 'SL'
                    ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:ring-rose-800'
                    : 'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700'
          }`}
        >
          {s.status}
        </span>
      </div>

      {/* Body */}
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <ArrowUpRight className="h-4 w-4 text-zinc-400" />
          <span>
            Entry{' '}
            <b className="text-zinc-900 dark:text-zinc-100">
              {s.entryMin}–{s.entryMax}
            </b>
          </span>
        </div>

        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <Shield className="h-4 w-4 text-zinc-400" />
          <span>
            SL <b className="text-zinc-900 dark:text-zinc-100">{s.sl}</b>
          </span>
        </div>

        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <Target className="h-4 w-4 text-zinc-400" />
          <span>
            TP1{' '}
            <b className="text-zinc-900 dark:text-zinc-100">{s.tp1 ?? '-'}</b>
          </span>
        </div>

        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <Target className="h-4 w-4 text-zinc-400" />
          <span>
            TP2{' '}
            <b className="text-zinc-900 dark:text-zinc-100">{s.tp2 ?? '-'}</b>
          </span>
        </div>
      </div>

      <div className="mt-3">
        {s.imageUrl ? (
          <img
            src={s.imageUrl}
            alt={s.code}
            className="h-28 w-full rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-28 w-full items-center justify-center rounded-lg border border-dashed border-zinc-300 text-xs text-zinc-400 dark:border-zinc-700">
            No Chart Available
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span>Last updated: {formatDate(s.createdAt)}</span>
        </div>

        <Link
          href={`/dashboard/signal/${s.id}`}
          className="font-medium text-zinc-600 hover:text-zinc-900 hover:underline dark:text-zinc-300 dark:hover:text-white"
        >
          Baca analisa →
        </Link>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-zinc-50 p-6 dark:bg-zinc-950">
      {/* Header + Filter */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Watchlist Jadi Cuan
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Signal saham untuk trader aktif
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['ALL', 'OPEN', 'TP1', 'TP2', 'SL'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                filter === f
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Today */}
      {todayList.length > 0 && (
        <>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Watchlist Terbaru (Hari Ini)
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {todayList.map((s) => (
              <Card key={s.id} s={s} />
            ))}
          </div>
        </>
      )}

      {/* Divider */}
      {todayList.length > 0 && prevList.length > 0 && (
        <div className="my-8 border-t border-zinc-200 dark:border-zinc-800" />
      )}

      {/* Previous */}
      {prevList.length > 0 && (
        <>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Watchlist Sebelumnya
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {prevList.map((s) => (
              <Card key={s.id} s={s} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
