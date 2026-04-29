import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  trade: any;
};

export default function TradeDetailModal({ open, onClose, trade }: Props) {
  // ✅ SEMUA HOOK HARUS DI ATAS
  const [isClosing, setIsClosing] = useState(false);
  const [exitValue, setExitValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsClosing(false);
      setExitValue('');
    }
  }, [open]);

  // ✅ BARU BOLEH RETURN
  if (!open || !trade) return null;

  const isProfit = (trade.profit ?? 0) >= 0;

  const handleCloseTrade = async () => {
    if (!exitValue) {
      alert('Isi harga exit dulu');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/trade/close', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: trade.id,
          exit: parseFloat(exitValue),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Gagal close');
        return;
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Terjadi error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div
        className="
        relative w-full md:max-w-lg
        rounded-t-2xl md:rounded-2xl
        bg-white dark:bg-zinc-900
        p-5 md:p-6
        shadow-xl
        animate-in slide-in-from-bottom md:zoom-in-95
      "
      >
        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-zinc-500">Detail Trade</p>
            <h2 className="text-lg font-semibold">{trade.code}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* status */}
        <div className="mb-4">
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              trade.status === 'OPEN'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
            }`}
          >
            {trade.status}
          </span>
        </div>

        {/* price */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-zinc-500">Entry</p>
            <p className="font-medium">{trade.entry}</p>
          </div>
          <div>
            <p className="text-zinc-500">Exit</p>
            <p className="font-medium">{trade.exit || '-'}</p>
          </div>
          <div>
            <p className="text-zinc-500">Quantity</p>
            <p className="font-medium">{trade.quantity}</p>
          </div>
          <div>
            <p className="text-zinc-500">Profit</p>
            <p
              className={`font-semibold ${
                isProfit ? 'text-emerald-500' : 'text-red-500'
              }`}
            >
              {trade.profit ? `Rp ${trade.profit}` : '-'}
            </p>
          </div>
        </div>

        {/* tags */}
        <div className="flex gap-2 mb-4">
          {trade.setup && (
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
              {trade.setup}
            </span>
          )}
          {trade.emotion && (
            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded">
              {trade.emotion}
            </span>
          )}
        </div>

        {/* note */}
        {trade.note && (
          <div className="mb-4">
            <p className="text-xs text-zinc-500 mb-1">Catatan</p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 italic">
              "{trade.note}"
            </p>
          </div>
        )}

        {/* action */}
        {trade.status === 'OPEN' && (
          <button
            onClick={() => setIsClosing(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 text-sm"
          >
            Tutup posisi
          </button>
        )}
        {isClosing && (
          <div className="mt-4 space-y-2">
            <input
              type="number"
              placeholder="Harga exit"
              value={exitValue}
              onChange={(e) => setExitValue(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm
                 bg-white dark:bg-zinc-900
                 border-zinc-200 dark:border-zinc-700"
            />

            {/* 🔥 PREVIEW PROFIT */}
            {exitValue && (
              <p className="text-xs text-zinc-500">
                Estimasi:{' '}
                <span
                  className={
                    (parseFloat(exitValue) - trade.entry) * trade.quantity >= 0
                      ? 'text-emerald-500'
                      : 'text-red-500'
                  }
                >
                  Rp{' '}
                  {(
                    (parseFloat(exitValue) - trade.entry) *
                    trade.quantity
                  ).toLocaleString('id-ID')}
                </span>
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setIsClosing(false)}
                className="w-1/2 border rounded-lg py-2 text-sm"
              >
                Batal
              </button>

              <button
                onClick={handleCloseTrade}
                disabled={loading}
                className="w-1/2 bg-green-500 text-white rounded-lg py-2 text-sm"
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
