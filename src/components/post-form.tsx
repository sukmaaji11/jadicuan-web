'use client';

import { useState, useEffect } from 'react';
import BlockEditor from '@/components/block-editor';
import PublishToggle from '@/components/publish-toggle';

type Block =
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'heading'; text: string }
  | { id: string; type: 'insight'; text: string };

type PostForm = {
  title: string;
  slug: string;
  excerpt: string;
  coverUrl: string;
  published: boolean;
  content: Block[];
};

export default function PostForm({
  initialData,
  onSubmit,
}: {
  initialData?: PostForm;
  onSubmit: (data: PostForm) => Promise<void>;
}) {
  const [form, setForm] = useState<PostForm>({
    title: '',
    slug: '',
    excerpt: '',
    coverUrl: '',
    published: false,
    content: [], // ✅ sekarang sudah Block[]
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        slug: initialData.slug || '',
        excerpt: initialData.excerpt || '',
        content: initialData.content || [],
        coverUrl: initialData.coverUrl || '',
        published: initialData.published ?? false,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* TITLE */}
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Judul Post"
        className="w-full border p-3 rounded-lg"
      />

      {/* SLUG */}
      <input
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
        placeholder="Slug"
        className="w-full border p-3 rounded-lg"
      />

      {/* EXCERPT */}
      <input
        value={form.excerpt || ''}
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        placeholder="Ringkasan"
        className="w-full border p-3 rounded-lg"
      />

      {/* 🔥 BLOCK EDITOR */}
      <BlockEditor
        value={form.content}
        onChange={(blocks: Block[]) =>
          setForm((prev) => ({ ...prev, content: blocks }))
        }
      />

      {/* COVER */}
      <input
        value={form.coverUrl || ''}
        onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
        placeholder="Cover URL"
        className="w-full border p-3 rounded-lg"
      />

      {/* 🔥 PUBLISH TOGGLE */}
      <div className="flex items-center justify-between">
        <span>Status</span>
        <PublishToggle
          value={form.published}
          onChange={(val) => setForm({ ...form, published: val })}
        />
      </div>

      <button className="bg-black text-white px-4 py-2 rounded-lg">
        Save Post
      </button>
    </form>
  );
}
