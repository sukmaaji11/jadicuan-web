'use client';

import { ArrowUpRight, Shield, Target, Clock } from 'lucide-react';
import BlurLock from '@/components/blur-lock';
import UpgradeGate from '@/components/upgrade-gate';

export default function SignalDetail({ signal, isPremium }: any) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <a
          href="/dashboard"
          className="mb-3 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          ← Kembali ke Watchlist
        </a>

        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{signal.code}</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {signal.companyName || 'Nama Perusahaan'}
            </p>

            <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <Clock className="h-3 w-3" />
              Last updated:{' '}
              {new Date(signal.createdAt).toLocaleDateString('id-ID')}
            </p>
          </div>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
            {signal.status === 'OPEN' && '🟢 Open Setup'}
            {signal.status === 'TP1' && '🟡 TP1 Hit'}
            {signal.status === 'TP2' && '🔵 TP2 Hit'}
            {signal.status === 'SL' && '🔴 Stop Loss'}{' '}
          </span>
        </div>
      </div>

      <div className="mb-6">
        {signal.imageUrl ? (
          <img
            src={signal.imageUrl}
            alt={signal.code}
            className="cursor-zoom-in w-full rounded-2xl border border-zinc-200 dark:border-zinc-800"
          />
        ) : (
          <div className="flex h-60 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 text-center text-sm text-zinc-400 dark:border-zinc-700">
            <span>📊 Chart belum tersedia</span>
            <span className="text-xs mt-1">Analisa tetap bisa digunakan</span>
          </div>
        )}
      </div>

      {/* Price Box */}
      <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <p className="text-xs text-zinc-500">Entry</p>
          <p className="font-semibold">
            {signal.entryMin} – {signal.entryMax}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Stop Loss</p>
          <p className="font-semibold text-rose-600 dark:text-rose-400">
            {isPremium ? signal.sl : '🔒'}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">TP1</p>
          <p className="font-semibold text-emerald-600 dark:text-emerald-400">
            {isPremium ? signal.tp1 : '🔒'}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">TP2</p>
          <p className="font-semibold text-emerald-600 dark:text-emerald-400">
            {isPremium ? signal.tp2 : '🔒'}
          </p>
        </div>
      </div>

      {/* Analisa */}
      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold">📌 Trading Setup</h2>

        <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
          {/* Alasan Entry */}
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
              Alasan Entry
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {(signal.summary || '')
                .split('\n')
                .filter((l: string) => l.trim())
                .map((line: string, i: number) => (
                  <li key={i}>{line}</li>
                ))}
            </ul>
          </div>

          {/* Trading Plan */}
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
              Trading Plan
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Entry */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
                <p className="text-xs text-zinc-500">Entry Area</p>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {signal.entryMin} – {signal.entryMax}
                </p>
              </div>

              {/* Stop Loss */}
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 dark:border-rose-900/40 dark:bg-rose-900/20">
                <p className="text-xs text-rose-500">Stop Loss</p>
                <p className="font-semibold text-rose-600 dark:text-rose-400">
                  {isPremium ? signal.sl : '🔒'}
                </p>
              </div>

              {/* TP1 */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/40 dark:bg-emerald-900/20">
                <p className="text-xs text-emerald-600">Take Profit 1</p>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {isPremium ? signal.tp1 : '🔒'}
                </p>
              </div>

              {/* TP2 */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/40 dark:bg-emerald-900/20">
                <p className="text-xs text-emerald-600">Take Profit 2</p>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {isPremium ? signal.tp2 : '🔒'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-2 text-lg font-semibold">Analisa Lengkap</h2>
        {isPremium ? (
          <div className="prose prose-zinc max-w-none dark:prose-invert">
            {' '}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-3 text-lg font-semibold">
                🏢 Insight Perusahaan
              </h2>

              <div className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {signal.content ? (
                  signal.content
                    .split('\n')
                    .map((p: string, i: number) => <p key={i}>{p}</p>)
                ) : (
                  <p className="italic text-zinc-500">
                    Belum ada insight perusahaan.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <BlurLock>
              <div className="prose prose-zinc max-w-none dark:prose-invert">
                {' '}
                <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <h2 className="mb-3 text-lg font-semibold">
                    🏢 Insight Perusahaan
                  </h2>

                  <div className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {signal.content ? (
                      signal.content
                        .split('\n')
                        .map((p: string, i: number) => <p key={i}>{p}</p>)
                    ) : (
                      <p className="italic text-zinc-500">
                        Belum ada insight perusahaan.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </BlurLock>
            <UpgradeGate />
          </>
        )}
      </div>
    </div>
  );
}
