'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      return setError('Password tidak sama');
    }

    setLoading(true);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }

    // 👉 auto login setelah register
    await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    router.push('/dashboard');
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* LEFT */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 text-white p-12">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Mulai perjalanan trading kamu 🚀
          </h1>
          <p className="text-zinc-300 text-sm">
            Buat akun dan mulai tracking profit, follow signal, dan analisa
            market.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold">Daftar Akun</h1>
            <p className="text-sm text-zinc-500">
              Mulai trading journey kamu 🔥
            </p>
          </div>

          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border p-2"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border p-2"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-lg border p-2"
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black text-white py-2 hover:opacity-90"
            >
              {loading ? 'Loading...' : 'Daftar'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Sudah punya akun?{' '}
            <a href="/login" className="font-semibold">
              Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
