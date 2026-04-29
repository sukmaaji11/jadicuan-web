'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Mobile Topbar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg border p-2 dark:border-zinc-700"
          >
            <Menu size={18} />
          </button>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            Admin Panel
          </span>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-56px)] md:min-h-screen">
        {/* Sidebar Desktop */}
        <aside className="hidden w-64 shrink-0 border-r bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:flex md:flex-col">
          <Sidebar />
        </aside>

        {/* Sidebar Mobile */}
        {open && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <aside className="relative w-64 bg-white p-4 dark:bg-zinc-900">
              <Sidebar />
            </aside>
          </div>
        )}

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold">Jadi Cuan</div>

      <nav className="space-y-1 text-sm">
        <NavItem href="/admin">Dashboard</NavItem>
        <NavItem href="/admin/users">Users</NavItem>
        <NavItem href="/admin/signals">Signals</NavItem>
        <NavItem href="/admin/posts">Posts / Berita</NavItem>
      </nav>
    </div>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      {children}
    </Link>
  );
}
