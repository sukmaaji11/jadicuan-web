'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { UserMenu } from '@/components/user-menu';
import { signOut } from 'next-auth/react';
import { BarChart3, LineChart, Newspaper } from 'lucide-react';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔️ Hindari render di server agar tidak hydration mismatch
  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-white">
              JC
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Jadi Cuan
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-4 text-sm md:flex">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="h-4 w-4 text-zinc-500" />
              <span>Watchlist</span>
            </div>
            <span className="text-xs text-zinc-400"></span>
          </Link>

          <Link
            href="/tracker"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <div className="flex items-center gap-3">
              <LineChart className="h-4 w-4 text-zinc-500" />
              <span>Tracker</span>
            </div>
            <span className="text-xs text-zinc-400"></span>
          </Link>

          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <div className="flex items-center gap-3">
              <Newspaper className="h-4 w-4 text-zinc-500" />
              <span>Berita</span>
            </div>
            <span className="text-xs text-zinc-400"></span>
          </Link>

          <ThemeToggle />
          {!session ? (
            <Link
              href="/login"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
            >
              Masuk
            </Link>
          ) : (
            <UserMenu email={session.user?.email ?? undefined} />
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100
                       dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <div className="flex flex-col gap-2 px-4 py-3 text-sm">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="h-4 w-4 text-zinc-500" />
                <span>Watchlist</span>
              </div>
              <span className="text-xs text-zinc-400">›</span>
            </Link>

            <Link
              href="/tracker"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="flex items-center gap-3">
                <LineChart className="h-4 w-4 text-zinc-500" />
                <span>Tracker</span>
              </div>
              <span className="text-xs text-zinc-400">›</span>
            </Link>

            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="flex items-center gap-3">
                <Newspaper className="h-4 w-4 text-zinc-500" />
                <span>Berita</span>
              </div>
              <span className="text-xs text-zinc-400">›</span>
            </Link>

            {!session ? (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-zinc-900 px-4 py-2 text-center text-xs font-medium text-white dark:bg-white dark:text-zinc-900"
              >
                Masuk
              </Link>
            ) : (
              <div className="mt-2">
                {session && (
                  <div className="mt-3 border-t border-zinc-200 pt-3 dark:border-zinc-800">
                    {/* User Info */}
                    <div className="flex items-center gap-3 px-1">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm text-white">
                        {session.user?.email?.[0]?.toUpperCase()}
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">{session.user?.email}</p>
                        <p className="text-xs text-zinc-500">Akun kamu</p>
                      </div>
                    </div>

                    {/* Menu Account */}
                    <div className="mt-3 flex flex-col gap-1 text-sm">
                      <button className="rounded-lg px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        Profile
                      </button>

                      <button className="rounded-lg px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        Settings
                      </button>

                      <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="rounded-lg px-3 py-2 text-left text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        Keluar
                      </button>
                    </div>
                  </div>
                )}{' '}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
