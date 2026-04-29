import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// 🔥 GET by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const signal = await prisma.signal.findUnique({
      where: { id },
    });

    if (!signal) {
      return NextResponse.json(
        { message: 'Signal tidak ditemukan' },
        { status: 404 },
      );
    }

    return NextResponse.json(signal);
  } catch (error) {
    return NextResponse.json(
      { message: 'Gagal mengambil signal', error },
      { status: 500 },
    );
  }
}

// 🔥 UPDATE
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.signal.update({
      where: { id },
      data: {
        ...(body.code !== undefined && { code: body.code }),
        ...(body.companyName !== undefined && {
          companyName: body.companyName,
        }),
        ...(body.entryMin !== undefined && {
          entryMin: Number(body.entryMin),
        }),
        ...(body.entryMax !== undefined && {
          entryMax: Number(body.entryMax),
        }),
        ...(body.tp1 !== undefined && { tp1: Number(body.tp1) }),
        ...(body.tp2 !== undefined && { tp2: Number(body.tp2) }),
        ...(body.sl !== undefined && { sl: Number(body.sl) }),
        ...(body.summary !== undefined && { summary: body.summary }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.content !== undefined && { content: body.content }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: 'Gagal update signal', error },
      { status: 500 },
    );
  }
}
