import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const signal = await prisma.signal.create({
    data: {
      code: body.code,
      companyName: body.companyName,
      entryMin: Number(body.entryMin),
      entryMax: Number(body.entryMax),
      tp1: Number(body.tp1),
      tp2: Number(body.tp2),
      sl: Number(body.sl),
      summary: body.summary,
      status: body.status || 'OPEN',
    },
  });

  return NextResponse.json(signal);
}
