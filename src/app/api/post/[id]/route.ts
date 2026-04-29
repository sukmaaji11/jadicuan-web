import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// 🔥 GET: ambil 1 post by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  return NextResponse.json(post);
}

// 🔥 PATCH: update post (publish, content, dll)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params; // 🔥 WAJIB

  const body = await req.json();

  const post = await prisma.post.update({
    where: { id }, // ✅ sudah benar
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.coverUrl !== undefined && { coverUrl: body.coverUrl }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.published !== undefined && { published: body.published }),
    },
  });

  return NextResponse.json(post);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const updated = await prisma.post.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.coverUrl !== undefined && { coverUrl: body.coverUrl }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.published !== undefined && { published: body.published }),
    },
  });

  return NextResponse.json(updated);
}

// 🔥 DELETE (optional tapi berguna)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await prisma.post.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Deleted' });
}
