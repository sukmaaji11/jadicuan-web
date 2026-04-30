'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PublishToggle({
  postId,
  published,
  value,
  onChange,
}: {
  postId?: string;
  published?: boolean;
  value?: boolean;
  onChange?: (val: boolean) => void;
}) {
  const isControlled = value !== undefined;
  const current = isControlled ? value : published;

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggle = async () => {
    if (isControlled) {
      onChange?.(!current);
      return;
    }

    setLoading(true);

    await fetch(`/api/post/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify({ published: !current }),
    });

    setLoading(false);
    router.refresh(); // 🔥 penting
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        current ? 'bg-green-500' : 'bg-zinc-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          current ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
