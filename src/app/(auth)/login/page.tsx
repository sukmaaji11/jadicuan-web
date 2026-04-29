'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError('Email atau password salah');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {' '}
      {/* LEFT SIDE */}
      <div className="relative hidden md:flex w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 text-white">
        {' '}
        {/* Glow effect */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10">
          <div className="mb-6 text-4xl">📈</div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Trading jadi lebih terarah
          </h1>

          <p className="mt-4 text-zinc-300 text-sm leading-relaxed">
            Pantau watchlist, ikuti signal, dan catat performa trading kamu
            dalam satu platform.
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <div>✔ Signal terstruktur & jelas</div>
            <div>✔ Tracking profit & loss</div>
            <div>✔ Insight & analisa mendalam</div>
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 dark:bg-zinc-950">
        <div className="w-full max-w-md rounded-2xl border-zinc-200/60 border border-zinc-200 bg-white p-6 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition backdrop-blur dark:border-zinc-800 dark:bg-zinc-900">
          {/* Mobile Hero */}
          <div className="mb-6 text-center md:hidden">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              JC
            </div>
            <h1 className="text-lg font-semibold">Jadi Cuan</h1>
            <p className="text-xs text-zinc-500 mt-1">
              Trading lebih terarah & terstruktur
            </p>
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Masuk ke akun kamu
          </h1>
          <p className="text-sm text-zinc-500 mb-6">
            Lanjutkan perjalanan trading kamu 🚀
          </p>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                placeholder="Password"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm pr-12 outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-2 text-xs text-zinc-500"
              >
                {show ? 'Hide' : 'Show'}
              </button>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="hover:shadow-md hover:scale-[1.01] active:scale-[0.98] transition w-full rounded-lg bg-gradient-to-r from-zinc-900 to-zinc-700 py-2 text-sm font-medium text-white hover:from-zinc-800 hover:to-zinc-600 disabled:opacity-50 dark:from-white dark:to-zinc-300 dark:text-zinc-900"
            >
              {loading ? 'Loading...' : 'Masuk'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-xs text-zinc-400">
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
            atau
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
          </div>

          {/* Google */}
          <button
            onClick={() => signIn('google')}
            className="w-full rounded-lg border border-zinc-200 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Masuk dengan Google
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-zinc-500">
            Belum punya akun?{' '}
            <span className="font-medium text-zinc-900 dark:text-white cursor-pointer">
              Daftar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
