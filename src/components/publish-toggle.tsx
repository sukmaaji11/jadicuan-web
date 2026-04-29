'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PublishToggle({
  postId,
  published,
}: {
  postId: string;
  published: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(published);
  const router = useRouter();

  const toggle = async () => {
    setLoading(true);

    const res = await fetch(`/api/post/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        published: !enabled,
      }),
    });

    if (res.ok) {
      setEnabled(!enabled);
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        enabled ? 'bg-green-500' : 'bg-zinc-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
