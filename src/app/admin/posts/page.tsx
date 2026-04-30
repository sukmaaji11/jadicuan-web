import Link from 'next/link';
import PublishToggle from '@/components/publish-toggle';

async function getPosts() {
  const res = await fetch('http://localhost:3000/api/post', {
    cache: 'no-store',
  });

  return res.json();
}

type Post = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  excerpt?: string;
};

export default async function AdminBlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Posts</h1>
          <p className="text-sm text-zinc-500">
            Kelola artikel dan edukasi trading kamu
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:opacity-90"
        >
          + Tambah Artikel
        </Link>
      </div>

      <div className="flex gap-2 text-sm mt-2">
        <button className="px-3 py-1 rounded-lg bg-black text-white">
          All
        </button>
        <button className="px-3 py-1 rounded-lg bg-zinc-200">Draft</button>
        <button className="px-3 py-1 rounded-lg bg-zinc-200">Published</button>
      </div>

      {/* LIST */}
      <div className="space-y-4 mt-4">
        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-medium">Belum ada artikel</p>
            <p className="text-sm text-zinc-500 mb-4">
              Mulai bangun konten untuk Jadicuan 🚀
            </p>

            <Link
              href="/admin/posts/new"
              className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            >
              Buat Artikel Pertama
            </Link>
          </div>
        )}
        {posts.map((post: Post) => (
          <div
            key={post.id}
            className="p-5 rounded-2xl border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:shadow-sm transition"
          >
            <div className="flex justify-between items-start">
              {/* LEFT */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold">{post.title}</h3>

                <p className="text-sm text-zinc-500">/blog/{post.slug}</p>

                {/* STATUS */}
                <span
                  className={`inline-block text-xs px-2 py-1 rounded-full ${
                    post.published
                      ? 'bg-green-100 text-green-600'
                      : 'bg-zinc-200 text-zinc-600'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-sm px-3 py-1.5 rounded-lg border border-zinc-300 hover:bg-zinc-100 transition"
                >
                  Edit
                </Link>
                <div className="flex items-center gap-2">
                  <PublishToggle postId={post.id} published={post.published} />
                  <span className="text-xs text-zinc-500">
                    {post.published ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
