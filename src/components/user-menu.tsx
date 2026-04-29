'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';

export function UserMenu({ email }: { email?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Button user */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs text-white">
          {email?.[0]?.toUpperCase()}
        </div>
        <span className="text-xs text-zinc-600 dark:text-zinc-300">
          {email}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          {/* User Info */}
          <div className="px-3 py-2">
            <p className="text-sm font-medium">{email}</p>
            <p className="text-xs text-zinc-500">Akun kamu</p>
          </div>

          <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-700" />

          {/* Menu */}
          <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
            Profile
          </button>

          <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
            Settings
          </button>

          <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-700" />

          {/* Logout */}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            🚪 Keluar
          </button>
        </div>
      )}
    </div>
  );
}
