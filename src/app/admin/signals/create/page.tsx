'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export default function CreateSignalPage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch(`${baseUrl}/api/admin/signal`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      router.push('/admin/signals');
    } else {
      alert('Gagal menyimpan signal');
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Tambah Signal
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
        {/* FORM */}
        <div className="md:col-span-2 space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Informasi Dasar */}
          <Section title="Informasi Dasar">
            <input
              name="code"
              placeholder="Kode Saham (ex: ERAA)"
              className="input"
              required
            />
            <input
              name="companyName"
              placeholder="Nama Perusahaan"
              className="input"
            />
            <input
              name="timeframe"
              placeholder="Timeframe (H4 / Daily)"
              className="input"
            />
          </Section>

          {/* Level Harga */}
          <Section title="Level Harga">
            <div className="grid grid-cols-2 gap-3">
              <input
                name="entryMin"
                placeholder="Entry Min"
                className="input"
                required
              />
              <input
                name="entryMax"
                placeholder="Entry Max"
                className="input"
                required
              />
              <input name="tp1" placeholder="TP1" className="input" />
              <input name="tp2" placeholder="TP2" className="input" />
              <input
                name="sl"
                placeholder="Stop Loss"
                className="input col-span-2"
                required
              />
            </div>
          </Section>

          {/* Analisa */}
          <Section title="Analisa">
            <textarea
              name="summary"
              placeholder="Analisa singkat"
              rows={2}
              className="input"
            />
            <textarea
              name="content"
              placeholder="Analisa lengkap"
              rows={5}
              className="input"
            />
          </Section>

          {/* Upload Chart */}
          <Section title="Chart Analisa">
            <div className="space-y-3">
              {/* Upload Box */}
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 p-6 text-center hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                <span className="text-sm text-zinc-500">
                  Klik untuk upload chart
                </span>
                <span className="text-xs text-zinc-400">PNG / JPG</span>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
              </label>

              {/* Preview */}
              {preview && (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full rounded-xl border dark:border-zinc-700"
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="absolute right-2 top-2 rounded-lg bg-black/70 px-2 py-1 text-xs text-white hover:bg-black"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          </Section>

          {/* Status */}
          <Section title="Status">
            <select name="status" className="input">
              <option value="OPEN">OPEN</option>
              <option value="TP1">TP1</option>
              <option value="TP2">TP2</option>
              <option value="SL">SL</option>
            </select>
          </Section>

          {/* Action */}
          <div className="flex justify-end">
            <button
              disabled={loading}
              className="rounded-xl bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {loading ? 'Menyimpan...' : 'Simpan Signal'}
            </button>
          </div>
        </div>

        {/* SIDE PANEL (Desktop Only) */}
        <div className="hidden md:block space-y-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="mb-2 font-medium">Tips Admin</p>
            <ul className="list-disc pl-4 text-zinc-500 dark:text-zinc-400">
              <li>Pastikan kode saham benar</li>
              <li>Upload chart dengan area entry jelas</li>
              <li>Analisa singkat tampil di watchlist</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
