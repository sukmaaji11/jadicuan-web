'use client';

import { useState } from 'react';

type SignalFormData = {
  code: string;
  companyName: string;
  entryMin: string;
  entryMax: string;
  sl: string;
  tp1: string;
  tp2: string;
  summary: string;
  content: string;
  status: string;
};

type Props = {
  initialData?: Partial<SignalFormData>;
  onSubmit: (data: SignalFormData) => void;
  onChange?: (data: SignalFormData) => void;
};

export default function SignalForm({ initialData, onSubmit, onChange }: Props) {
  const [form, setForm] = useState({
    code: initialData?.code || '',
    companyName: initialData?.companyName || '',
    entryMin: initialData?.entryMin || '',
    entryMax: initialData?.entryMax || '',
    sl: initialData?.sl || '',
    tp1: initialData?.tp1 || '',
    tp2: initialData?.tp2 || '',
    summary: initialData?.summary || '',
    content: initialData?.content || '',
    status: initialData?.status || 'OPEN',
  });

  const update = (key: string, value: any) => {
    const next = { ...form, [key]: value };
    setForm(next);
    onChange?.(next); // 🔥 kirim ke preview
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-6"
    >
      {/* 🔥 HEADER */}
      <div className="p-5 border rounded-xl space-y-4">
        <h2 className="text-sm text-zinc-500">Informasi Signal</h2>

        <input
          value={form.code}
          onChange={(e) => update('code', e.target.value.toUpperCase())}
          placeholder="Kode saham (BBRI)"
          className="w-full border p-3 rounded-lg font-semibold text-sm"
        />

        <input
          value={form.companyName}
          onChange={(e) => update('companyName', e.target.value)}
          placeholder="Nama perusahaan"
          className="w-full border p-3 rounded-lg text-sm"
        />

        <select
          value={form.status}
          onChange={(e) => update('status', e.target.value)}
          className="w-full border p-3 rounded-lg text-sm text-sm"
        >
          <option value="OPEN">Open Setup</option>
          <option value="TP1">TP1</option>
          <option value="TP2">TP2</option>
          <option value="SL">Stop Loss</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      {/* 🔥 TRADING PLAN */}
      <div className="p-5 border rounded-xl space-y-4">
        <h2 className="text-sm text-zinc-500">Trading Plan</h2>

        <div className="grid grid-cols-2 gap-3">
          <input
            value={form.entryMin}
            onChange={(e) => update('entryMin', e.target.value)}
            placeholder="Entry Min"
            className="border p-3 rounded-lg text-sm"
          />
          <input
            value={form.entryMax}
            onChange={(e) => update('entryMax', e.target.value)}
            placeholder="Entry Max"
            className="border p-3 rounded-lg text-sm"
          />
        </div>

        <input
          value={form.sl}
          onChange={(e) => update('sl', e.target.value)}
          placeholder="Stop Loss"
          className="border p-3 rounded-lg text-sm text-red-500"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            value={form.tp1}
            onChange={(e) => update('tp1', e.target.value)}
            placeholder="Take Profit 1"
            className="border p-3 rounded-lg text-sm text-green-600"
          />
          <input
            value={form.tp2}
            onChange={(e) => update('tp2', e.target.value)}
            placeholder="Take Profit 2"
            className="border p-3 rounded-lg text-green-600"
          />
        </div>
      </div>

      {/* 🔥 TRADING SETUP */}
      <div className="p-5 border rounded-xl space-y-4">
        <h2 className="text-sm text-zinc-500">Trading Setup</h2>

        <textarea
          value={form.summary}
          onChange={(e) => update('summary', e.target.value)}
          placeholder="Alasan entry, analisa, dll..."
          className="w-full border p-3 rounded-lg min-h-[120px] text-sm"
        />
      </div>
      <div className="p-5 border rounded-xl space-y-4">
        <h2 className="text-sm text-zinc-500">Analisa Lengkap</h2>

        <textarea
          value={form.content}
          onChange={(e) => update('content', e.target.value)}
          placeholder="Tulis analisa lengkap...
          Contoh:
          - Alasan entry
          - Struktur market
          - Risk management"
          className="w-full border p-3 rounded-lg min-h-[160px] text-sm"
        />
      </div>
      {/* 🔥 ACTION */}
      <div className="flex justify-end">
        <button className="bg-black text-white px-5 py-2 rounded-lg">
          Simpan Signal
        </button>
      </div>
    </form>
  );
}
