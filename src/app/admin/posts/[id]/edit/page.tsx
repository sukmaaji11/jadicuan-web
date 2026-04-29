'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BlockEditor from '@/components/block-editor';
import PublishToggle from '@/components/publish-toggle';
import PostPreview from '@/components/post-preview';
type Block =
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'heading'; text: string }
  | { id: string; type: 'insight'; text: string };

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: [] as Block[],
    coverUrl: '',
    published: false,
  });

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/post/${id}`);
      const data = await res.json();

      setForm({
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content: data.content || [],
        coverUrl: data.coverUrl || '',
        published: data.published ?? false,
      });

      setLoading(false);
    };

    if (id) fetchPost();
  }, [id]);

  // 🔥 HANDLE SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify(form),
    });

    router.push('/admin/posts');
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      {' '}
      <h1 className="text-xl font-bold">Edit Post</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* LEFT: EDITOR */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            {/* 🔥 INFORMASI ARTIKEL */}
            <div className="p-5 rounded-2xl border bg-white dark:bg-zinc-900">
              <p className="text-sm font-semibold mb-4">Informasi Artikel</p>
              <div className="grid gap-3">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Judul"
                  className="input text-lg font-semibold"
                />

                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="Slug"
                  className="input text-zinc-500"
                />

                <input
                  value={form.coverUrl}
                  onChange={(e) =>
                    setForm({ ...form, coverUrl: e.target.value })
                  }
                  placeholder="Cover URL"
                  className="input"
                />
                {form.coverUrl && (
                  <img
                    src={form.coverUrl}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                )}
              </div>
            </div>

            {/* 🔥 BLOCK EDITOR */}
            <div className="p-5 rounded-2xl border bg-white dark:bg-zinc-900 mt-4">
              <p className="text-sm font-semibold mb-4">Isi Artikel</p>

              <BlockEditor
                value={form.content || []}
                onChange={(blocks) => setForm({ ...form, content: blocks })}
              />
            </div>

            {/* 🔥 PUBLISH */}
            <div className="mt-4 flex items-center justify-between p-4 rounded-xl border">
              <div>
                <p className="text-sm font-medium">Publish artikel</p>
                <p className="text-xs text-zinc-500">
                  Artikel akan tampil di halaman blog
                </p>
              </div>

              <PublishToggle
                value={form.published}
                onChange={(val) => setForm({ ...form, published: val })}
              />
            </div>

            {/* 🔥 ACTION */}
            <div className="flex justify-end mt-4">
              <button className="bg-zinc-900 text-white px-4 py-2 rounded-xl">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        <div className="sticky top-6 h-fit">
          <PostPreview post={form} />
        </div>
      </div>
    </div>
  );
}
