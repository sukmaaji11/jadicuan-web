'use client';
import UpgradeGate from '@/components/upgrade-gate';
import BlurLock from '@/components/blur-lock';

export default function SignalView({ data, isPremium }: any) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{data.code}</h1>
          <p className="text-sm text-zinc-500">{data.companyName}</p>
        </div>

        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
          {data.status || 'OPEN'}
        </span>
      </div>
      {/* ENTRY BOX */}
      <div className="p-4 border rounded-xl grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-zinc-500">Entry</p>
          <p className="font-semibold">
            {data.entryMin} - {data.entryMax}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Stop Loss</p>
          <p className="text-red-500 font-semibold">
            {' '}
            {isPremium ? data.sl : '🔒'}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">TP1</p>
          <p className="text-green-600 font-semibold">
            {' '}
            {isPremium ? data.tp1 : '🔒'}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">TP2</p>
          <p className="text-green-600 font-semibold">
            <p>{isPremium ? data.tp2 : '🔒'}</p>
          </p>
        </div>
      </div>
      {isPremium ? (
        <div className="space-y-2 text-sm">
          {' '}
          {/* SUMMARY */}
          {data.summary && (
            <div className="bg-blue-50 p-4 rounded-xl text-sm">
              💡 {data.summary}
            </div>
          )}
        </div>
      ) : (
        <>
          <BlurLock>
            <div className="space-y-2 text-sm">
              {' '}
              {/* SUMMARY */}
              {data.summary && (
                <div className="bg-blue-50 p-4 rounded-xl text-sm">
                  💡 {data.summary}
                </div>
              )}
            </div>
          </BlurLock>
          <UpgradeGate />
        </>
      )}

      {data.content && (
        <div className="space-y-2 text-sm">
          {data.content.split('\n').map((line: string, i: number) => {
            if (line.startsWith('-')) {
              return <li key={i}>{line.replace('-', '')}</li>;
            }

            return <p key={i}>{line}</p>;
          })}
        </div>
      )}
    </div>
  );
}
