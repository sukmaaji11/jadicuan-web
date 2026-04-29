'use client';

import { useEffect, useState } from 'react';
import { CreateTrade } from './create-trade';
import { useSession } from 'next-auth/react';
import { EquityChart } from '@/components/equity-chart';
import { computeDrawdown, computeAnalytics } from '@/lib/analytics';
import { StatsSection } from '@/components/stat-section';
import { formatShort } from '@/lib/format';
import TradeDetailModal from '@/components/trade-detail-modal';

export default function TrackerPage() {
  const { data: session, status } = useSession();
  const [trades, setTrades] = useState<any[]>([]);
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  const [selectedTrade, setSelectedTrade] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'CLOSED'>('ALL');
  const [sort, setSort] = useState<'LATEST' | 'PROFIT'>('LATEST');

  const formatRupiah = (n: number) => new Intl.NumberFormat('id-ID').format(n);

  // =============================
  // FETCH TRADES
  // =============================
  useEffect(() => {
    if (!session) return;

    fetch('/api/trade')
      .then((res) => res.json())
      .then((data) => setTrades(Array.isArray(data) ? data : []))
      .catch(() => setTrades([]));
  }, [session]);

  // =============================
  // REALTIME PRICE (SIMULATION)
  // =============================
  useEffect(() => {
    if (!trades.length) return;

    const interval = setInterval(() => {
      setLivePrices((prev) => {
        const updated = { ...prev };

        trades.forEach((t) => {
          if (t.status !== 'OPEN') return;

          const current = updated[t.code] ?? t.entry;

          // 🎯 target baru (random kecil)
          const target = current + current * (Math.random() * 0.01 - 0.005); // ±0.5%

          // 🔥 SMOOTH TRANSITION
          const smooth = current + (target - current) * 0.2;

          updated[t.code] = Math.round(smooth);
        });

        return updated;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [trades]);

  // =============================
  // UI CONTROL
  // =============================
  const openDetail = (trade: any) => {
    setSelectedTrade(trade);
    setIsOpen(true);
  };

  const closeDetail = () => {
    setIsOpen(false);
    setSelectedTrade(null);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  // =============================
  // FILTER + SORT
  // =============================
  const filteredTrades = trades
    .filter((t) => (filter === 'ALL' ? true : t.status === filter))
    .sort((a, b) => {
      if (sort === 'LATEST') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return (b.profit || 0) - (a.profit || 0);
    });

  // =============================
  // ANALYTICS
  // =============================
  const analytics = computeAnalytics(trades);
  const dd = computeDrawdown(trades);

  // =============================
  // AUTH STATES
  // =============================
  if (status === 'loading') return <div className="p-8">Loading...</div>;

  if (!session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold">Login dulu</h2>
        <a
          href="/login"
          className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-white"
        >
          Masuk
        </a>
      </div>
    );
  }

  const totalProfit = trades.reduce((acc, t) => {
    if (t.status === 'OPEN') {
      const price = livePrices[t.code] || t.entry;
      return acc + (price - t.entry) * t.quantity;
    }

    return acc + (t.profit || 0);
  }, 0);

  // =============================
  // UI
  // =============================
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <CreateTrade />

      <h1 className="text-2xl font-bold mb-6">Trading Tracker</h1>

      {/* 📈 CHART */}
      <EquityChart trades={trades} />

      {/* 📊 STATS */}
      <StatsSection
        analytics={{ ...analytics, totalProfit }}
        dd={dd}
        formatShort={formatShort}
      />

      {/* FILTER */}
      <div className="mb-4 flex items-center justify-between rounded-xl p-2 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 mt-4">
        <div className="flex gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
          {['ALL', 'OPEN', 'CLOSED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1 text-xs rounded-md ${
                filter === f
                  ? 'bg-white shadow dark:bg-zinc-900'
                  : 'text-zinc-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="rounded-lg border px-2 py-1 text-xs dark:bg-zinc-900 dark:border-zinc-800"
        >
          <option value="LATEST">Terbaru</option>
          <option value="PROFIT">Profit terbesar</option>
        </select>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {filteredTrades.length === 0 && (
          <p className="text-center text-zinc-500 mt-10">Belum ada trade 😴</p>
        )}

        {filteredTrades.map((trade) => {
          const currentPrice =
            trade.status === 'OPEN'
              ? (livePrices[trade.code] ?? trade.entry)
              : (trade.exit ?? trade.entry);

          const floating =
            trade.status === 'OPEN'
              ? (currentPrice - trade.entry) * trade.quantity
              : trade.profit;

          const pct =
            trade.status === 'OPEN'
              ? ((currentPrice - trade.entry) / trade.entry) * 100
              : ((trade.exit - trade.entry) / trade.entry) * 100;

          const isProfit = (floating ?? 0) >= 0;

          return (
            <div
              key={trade.id}
              onClick={() => openDetail(trade)}
              className="cursor-pointer rounded-2xl border p-4 md:p-5 transition bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                {/* LEFT */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        trade.status === 'OPEN'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                      }`}
                    >
                      {trade.status}
                    </span>

                    <h2 className="font-semibold text-sm md:text-base text-zinc-900 dark:text-white">
                      {trade.code}
                    </h2>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Entry {trade.entry} → Exit {trade.exit ?? '-'}
                  </p>

                  {trade.note && (
                    <p className="mt-2 text-xs italic text-zinc-500 dark:text-zinc-400 max-w-[70%] line-clamp-1">
                      "{trade.note}"
                    </p>
                  )}

                  {/* TAGS */}
                  <div className="flex gap-2 flex-wrap mt-2">
                    {trade.setup && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        {trade.setup}
                      </span>
                    )}

                    {trade.emotion && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                        {trade.emotion}
                      </span>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p
                    className={`text-base md:text-lg font-semibold ${
                      isProfit ? 'text-emerald-500' : 'text-red-500'
                    }`}
                  >
                    Rp {formatRupiah(Math.abs(floating))}
                  </p>

                  <p className="text-xs text-zinc-400">
                    {pct.toFixed(2)}% @ {currentPrice}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      <TradeDetailModal
        open={isOpen}
        onClose={closeDetail}
        trade={selectedTrade}
      />
    </div>
  );
}
