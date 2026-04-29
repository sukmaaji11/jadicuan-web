'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    const isDark = saved === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    setDark(isDark);
  }, []);

  if (!mounted) return null; // ⛔ cegah hydration mismatch

  function toggle() {
    const isDark = !dark;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setDark(isDark);
  }

  return (
    <button
      onClick={toggle}
      className="rounded-lg border border-zinc-200 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-100
                 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      aria-label="Toggle theme"
    >
      {dark ? 'Light' : 'Dark'}
    </button>
  );
}
