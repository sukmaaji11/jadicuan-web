import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <span className="mb-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Jadi Cuan • Trading Tracker
        </span>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
          Platform Watchlist & Analisa Saham{' '}
          <span className="block text-zinc-500 dark:text-zinc-400">
            untuk trader aktif
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          Pantau signal terbaru, lihat area entry, target profit, stop loss, dan
          baca analisa lengkap dari admin. Dibuat ringkas, rapi, dan fokus ke
          eksekusi.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
          >
            Masuk Watchlist
          </Link>
          <Link
            href="/tracker"
            className="rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Buka Tracker
          </Link>
        </div>
      </section>

      {/* Value Props */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Signal Ringkas & Jelas',
              desc: 'Entry, TP, SL ditampilkan ringkas agar cepat dieksekusi.',
            },
            {
              title: 'Analisa Lengkap',
              desc: 'Setiap signal dilengkapi alasan teknikal & narasi market.',
            },
            {
              title: 'Tracking Pribadi',
              desc: 'Catat saham yang kamu beli dan pantau performanya.',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-2xl font-semibold text-zinc-900 dark:text-white">
            Cara Kerja
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Simpel. Fokus ke eksekusi.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Masuk Watchlist',
                desc: 'Lihat signal saham terbaru yang dibagikan admin.',
              },
              {
                step: '2',
                title: 'Baca Analisa',
                desc: 'Pahami alasan entry, target, dan risiko.',
              },
              {
                step: '3',
                title: 'Eksekusi & Track',
                desc: 'Eksekusi di broker dan pantau hasilnya di tracker.',
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="mb-2 text-sm font-medium text-zinc-500">
                  Step {s.step}
                </div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {s.title}
                </h4>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Siap lebih disiplin dalam trading?
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Mulai pantau watchlist & analisa sekarang.
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href="/dashboard"
            className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
          >
            Masuk Watchlist
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-zinc-500 dark:text-zinc-400 md:flex-row">
          <div>
            © {new Date().getFullYear()} Jadi Cuan. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
              Tentang
            </a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
              Kontak
            </a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
              Disclaimer
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
