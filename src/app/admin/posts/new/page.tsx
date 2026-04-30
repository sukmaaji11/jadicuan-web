'use client';

import { useState, useEffect } from 'react';
import BlockEditor from '@/components/block-editor';
import Preview from '@/components/post-preview';

const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export default function NewPostPage() {
  const [rawText, setRawText] = useState('');
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverUrl: '',
    published: false,
  });
  const [blocks, setBlocks] = useState<any[]>([]);
  const previewData = {
    ...form,
    content: blocks,
  };
  // 🔥 AUTO SLUG
  useEffect(() => {
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');

    setForm((prev) => ({ ...prev, slug }));
  }, [form.title]);

  const handleSubmit = async () => {
    const res = await fetch(`${baseUrl}/api/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        content: blocks, // 🔥 JSON
      }),
    });

    if (res.ok) {
      alert('Berhasil!');
    }
  };

  function parseToBlocks(text: string) {
    try {
      // 🔥 COBA PARSE JSON DULU
      const parsed = JSON.parse(text);

      if (Array.isArray(parsed)) {
        return parsed.map((b) => ({
          id: crypto.randomUUID(),
          type: b.type,
          text: b.text,
        }));
      }
    } catch (err) {
      // ❌ kalau bukan JSON → lanjut ke text parser
    }

    // 🔥 FALLBACK: TEXT BIASA
    const lines = text.split('\n');
    const blocks: any[] = [];

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      if (line.startsWith('##')) {
        blocks.push({
          id: crypto.randomUUID(),
          type: 'heading',
          text: line.replace('##', '').trim(),
        });
      } else if (
        line.toLowerCase().startsWith('insight') ||
        line.startsWith('💡')
      ) {
        blocks.push({
          id: crypto.randomUUID(),
          type: 'insight',
          text: line.replace('💡', '').replace('Insight:', '').trim(),
        });
      } else {
        blocks.push({
          id: crypto.randomUUID(),
          type: 'paragraph',
          text: line,
        });
      }
    }

    return blocks;
  }

  function handlePaste(text: string) {
    const parsed = parseToBlocks(text);
    setBlocks(parsed);
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Tulis Artikel</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* LEFT: EDITOR */}
        <div className="space-y-6">
          {/* BASIC */}
          <div className="p-5 rounded-2xl border bg-white dark:bg-zinc-900">
            <p className="text-sm font-semibold mb-4">Informasi Artikel</p>
            <div className="grid gap-3">
              <input
                placeholder="Judul"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input text-lg font-semibold"
              />

              <input
                value={form.slug}
                readOnly
                className="input text-zinc-500"
              />

              <input
                placeholder="Cover URL"
                value={form.coverUrl}
                onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
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

          {/* CONTENT */}
          <div className="p-5 rounded-2xl border bg-white dark:bg-zinc-900">
            <p className="text-sm font-semibold mb-4">Isi Artikel</p>
            <p className="text-xs text-zinc-500 mb-4">
              Gunakan Heading untuk judul section dan Insight untuk highlight
              penting
            </p>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste dari ChatGPT..."
              className="input h-32"
            />

            <button
              onClick={() => {
                const parsed = parseToBlocks(rawText);
                setBlocks(parsed);
              }}
              className="px-3 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 mb-4"
            >
              Convert ke Artikel
            </button>

            <BlockEditor value={blocks} onChange={setBlocks} />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border">
            <div>
              <p className="text-sm font-medium">Publish artikel</p>
              <p className="text-xs text-zinc-500">
                Artikel akan tampil di halaman blog
              </p>
            </div>

            <input type="checkbox" />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-zinc-900 text-white px-4 py-2 rounded-xl"
              onClick={handleSubmit}
            >
              Simpan Artikel
            </button>
          </div>
        </div>

        {/* RIGHT: PREVIEW */}
        <div className="hidden md:block">
          <Preview post={previewData} />
        </div>
      </div>
    </div>
  );
}
