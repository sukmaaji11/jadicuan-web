'use client';

import { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export default function BottomSheet({ open, onClose, children, title }: Props) {
  // lock scroll saat open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* sheet */}
      <div className="absolute bottom-0 left-0 right-0 animate-slideUp">
        <div className="rounded-t-3xl bg-white dark:bg-zinc-900 p-4 shadow-2xl border-t border-zinc-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
          {/* drag indicator */}
          <div className="w-10 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mb-3" />

          {/* title */}
          {title && (
            <h2 className="text-base font-semibold mb-3 text-center">
              {title}
            </h2>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
