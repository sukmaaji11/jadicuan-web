'use client';

import SignalView from './signal-view';

export default function SignalPreview({ data }: any) {
  if (!data) {
    return (
      <div className="text-sm text-zinc-400">
        Preview akan muncul di sini...
      </div>
    );
  }

  return (
    <div className="sticky top-6">
      <SignalView data={data} />
    </div>
  );
}
