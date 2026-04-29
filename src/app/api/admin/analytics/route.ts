import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const totalUser = await prisma.user.count();
  const totalSignal = await prisma.signal.count();

  const signals = await prisma.signal.findMany();

  const tpCount = signals.filter(
    (s) => s.status === 'TP1' || s.status === 'TP2',
  ).length;
  const slCount = signals.filter((s) => s.status === 'SL').length;

  const winrate =
    signals.length > 0 ? ((tpCount / signals.length) * 100).toFixed(1) : 0;

  return NextResponse.json({
    totalUser,
    totalSignal,
    tpCount,
    slCount,
    winrate,
  });
}
