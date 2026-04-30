'use client';

import { useState } from 'react';
import { useEffect } from 'react';

type Block =
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'heading'; text: string }
  | { id: string; type: 'insight'; text: string };

const uid = () => Math.random().toString(36).slice(2);

export default function BlockEditor({
  value,
  onChange,
}: {
  value: Block[];
  onChange: (blocks: Block[]) => void;
}) {
  const [blocks, setBlocks] = useState(value?.length ? value : []);

  const update = (next: Block[]) => {
    setBlocks(next);
    onChange(next);
  };

  const addBlock = (type: Block['type']) => {
    update([...blocks, { id: uid(), type, text: '' }]);
  };

  const updateText = (id: string, text: string) => {
    update(blocks.map((b) => (b.id === id ? { ...b, text } : b)));
  };

  const remove = (id: string) => {
    const next = blocks.filter((b) => b.id !== id);
    update(next.length ? next : [{ id: uid(), type: 'paragraph', text: '' }]);
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...blocks];
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= next.length) return;
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    update(next);
  };

  useEffect(() => {
    const initial: Block[] = value?.length
      ? value
      : [{ id: uid(), type: 'paragraph', text: '' }];

    setBlocks(initial);
    onChange(initial);
  }, [value]);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <div
          key={block.id}
          className="p-4 rounded-xl border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 hover:border-zinc-400 transition"
        >
          {/* toolbar */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500 capitalize">
              {block.type}
            </span>

            <div className="flex gap-2 text-sm opacity-60 hover:opacity-100">
              <button
                type="button"
                className="hover:text-blue-500"
                onClick={() => move(i, -1)}
              >
                ↑
              </button>
              <button
                type="button"
                className="hover:text-blue-500"
                onClick={() => move(i, 1)}
              >
                ↓
              </button>
              <button
                type="button"
                className="hover:text-blue-500"
                onClick={() => remove(block.id)}
              >
                ✕
              </button>
            </div>
          </div>

          {/* input */}
          {block.type === 'heading' && (
            <input
              value={block.text}
              onChange={(e) => updateText(block.id, e.target.value)}
              placeholder="Judul section..."
              className="w-full outline-none text-md font-semibold"
            />
          )}

          {block.type === 'paragraph' && (
            <textarea
              value={block.text}
              onChange={(e) => updateText(block.id, e.target.value)}
              placeholder="Tulis paragraf..."
              className="w-full outline-none resize-none text-sm"
            />
          )}

          {block.type === 'insight' && (
            <textarea
              value={block.text}
              onChange={(e) => updateText(block.id, e.target.value)}
              placeholder="Insight..."
              className="w-full outline-none resize-none text-blue-600 text-sm"
            />
          )}
        </div>
      ))}

      {/* add block */}
      <div className="flex gap-2 mt-2 text-sm">
        <button
          type="button"
          className="px-3 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200"
          onClick={() => addBlock('paragraph')}
        >
          + Paragraf
        </button>
        <button
          type="button"
          className="px-3 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200"
          onClick={() => addBlock('heading')}
        >
          + Heading
        </button>
        <button
          type="button"
          className="px-3 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200"
          onClick={() => addBlock('insight')}
        >
          + Insight
        </button>
      </div>
    </div>
  );
}
