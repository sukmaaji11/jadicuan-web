import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get('image') as File;

    let imageUrl = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(process.cwd(), 'public/uploads', fileName);

      await writeFile(filePath, buffer);

      imageUrl = `/uploads/${fileName}`;
    }

    const signal = await prisma.signal.create({
      data: {
        code: formData.get('code') as string,
        companyName: formData.get('companyName') as string,
        timeframe: formData.get('timeframe') as string,
        entryMin: Number(formData.get('entryMin')),
        entryMax: Number(formData.get('entryMax')),
        tp1: formData.get('tp1') ? Number(formData.get('tp1')) : null,
        tp2: formData.get('tp2') ? Number(formData.get('tp2')) : null,
        sl: Number(formData.get('sl')),
        summary: formData.get('summary') as string,
        content: formData.get('content') as string,
        status: formData.get('status') as any,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true, signal });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
