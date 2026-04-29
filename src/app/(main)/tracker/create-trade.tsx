'use client';

import { useState } from 'react';
import BottomSheet from '@/components/bottom-sheet';
import { Plus } from 'lucide-react';

export function CreateTrade() {
  const [form, setForm] = useState({
    code: '',
    entry: '',
    exit: '',
    quantity: '',
    type: 'BUY',
    status: 'OPEN',
  });

  const [code, setCode] = useState('');
  const [stock, setStock] = useState<any>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [entry, setEntry] = useState('');
  const [exit, setExit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);

    setForm({
      code: '',
      entry: '',
      exit: '',
      quantity: '',
      type: 'BUY',
      status: 'OPEN',
    });

    setSelectedStock(null);
    setQuery('');
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setQuery(val);

    if (val.length >= 2) {
      try {
        const res = await fetch(`/api/stock/search?q=${val}`);

        if (!res.ok) {
          setResults([]);
          return;
        }

        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedStock) {
        alert('Pilih saham dulu');
        return;
      }

      if (!form.entry || !form.quantity) {
        alert('Entry & quantity wajib diisi');
        return;
      }

      const res = await fetch('/api/trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ✅ WAJIB
        },
        body: JSON.stringify({
          ...form,
          code: selectedStock.code, // 🔥 pastikan ini ada
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        alert(data.error || 'Gagal simpan');
        return;
      }

      console.log('SUCCESS:', data);

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Terjadi error');
    }
  };

  return (
    <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
      <h2 className="mb-4 text-lg font-semibold">Tambah Trade</h2>{' '}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.99] transition-all shadow-sm hover:shadow-md dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        <Plus size={16} /> Catat Trade
      </button>{' '}
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Tambah Trade"
      >
        <div className="space-y-4">
          {/* 🔍 STOCK SEARCH */}
          <div className="relative">
            {!selectedStock ? (
              <>
                <input
                  placeholder="Kode saham (TINS)"
                  value={query}
                  onChange={handleSearch}
                  className="input"
                />

                {results.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full rounded-xl border bg-white shadow dark:bg-zinc-900">
                    {results
                      ?.filter((stock) => stock?.code)
                      .map((stock) => (
                        <div
                          key={stock.id}
                          onClick={() => {
                            setSelectedStock(stock);
                            setQuery(stock.code);
                            setResults([]);
                          }}
                          className="cursor-pointer px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <p className="font-medium">{stock.code}</p>
                          <p className="text-xs text-zinc-500">{stock.name}</p>
                        </div>
                      ))}
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl border px-3 py-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{selectedStock.code}</p>
                  <p className="text-xs text-zinc-500">{selectedStock.name}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedStock(null);
                    setQuery('');
                  }}
                  className="text-xs text-red-500"
                >
                  Ganti
                </button>
              </div>
            )}
          </div>

          {/* 🔥 GRID FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Entry"
              className="input"
              onChange={(e) => setForm({ ...form, entry: e.target.value })}
            />

            <input
              placeholder="Exit (opsional)"
              value={form.exit}
              onChange={(e) => setForm({ ...form, exit: e.target.value })}
              className="input"
            />

            <input
              placeholder="Quantity"
              className="input"
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />

            {/* FULL WIDTH */}
            <div className="md:col-span-2">
              <label className="text-sm text-zinc-500 mb-1 block">
                Catatan
              </label>

              <textarea
                placeholder="Kenapa entry?"
                className="input h-24 resize-none"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm text-zinc-500 mb-1 block">Setup</label>

              <select
                className="input"
                value={form.setup}
                onChange={(e) => setForm({ ...form, setup: e.target.value })}
              >
                <option value="">Pilih setup</option>
                <option value="breakout">Breakout</option>
                <option value="pullback">Pullback</option>
                <option value="reversal">Reversal</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-zinc-500 mb-1 block">Emosi</label>

              <select
                className="input"
                value={form.emotion}
                onChange={(e) => setForm({ ...form, emotion: e.target.value })}
              >
                <option value="">Pilih emosi</option>
                <option value="tenang">Tenang</option>
                <option value="fomo">FOMO</option>
                <option value="ragu">Ragu</option>
              </select>
            </div>
          </div>

          {/* 🔥 SUBMIT BUTTON (MOBILE FRIENDLY) */}
          <div className="sticky bottom-0 bg-white dark:bg-zinc-900 pt-3 flex gap-2">
            <button
              onClick={() => setOpen(false)}
              className="
      w-1/2 rounded-xl py-3 text-sm
      border border-zinc-300 dark:border-zinc-700
    "
            >
              Batal
            </button>

            <button
              onClick={() => {
                handleSubmit();
                setOpen(false);
              }}
              className="
      w-1/2 rounded-xl py-3 text-sm font-medium
      bg-zinc-900 text-white hover:bg-zinc-800
      dark:bg-white dark:text-zinc-900
    "
            >
              Simpan
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
