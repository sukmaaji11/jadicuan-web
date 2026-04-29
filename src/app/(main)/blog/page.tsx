import Link from 'next/link';

async function getPosts() {
  const res = await fetch('http://localhost:3000/api/blog', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function BlogPage() {
  const data = await getPosts();

  if (!data.length) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center text-zinc-500">
        Belum ada artikel dipublish 🚀
      </div>
    );
  }

  const [featured, ...posts] = data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Berita & Insight Trading</h1>

      {/* FEATURED */}
      <Link href={`/blog/${featured.slug}`}>
        <div className="mb-10 rounded-2xl overflow-hidden relative group">
          <img
            src={featured.coverUrl || ''}
            className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
            <div className="text-white max-w-xl">
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                {featured.title}
              </h2>
              <p className="text-sm opacity-80 line-clamp-2">
                {featured.excerpt}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post: any) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="h-full flex flex-col rounded-2xl overflow-hidden bg-white/80 backdrop-blur border border-zinc-200/60 dark:bg-zinc-900/80 dark:border-zinc-800/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="h-40 overflow-hidden">
                <img
                  src={post.coverUrl || ''}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-semibold text-lg group-hover:text-blue-500 transition">
                  {post.title}
                </h2>

                <p className="text-sm text-zinc-500 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <span className="text-xs font-semibold text-blue-500">
                    Baca →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
