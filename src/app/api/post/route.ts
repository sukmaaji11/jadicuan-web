import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET ALL
// /api/admin/post
export async function GET() {
  const posts = await prisma.post.findMany({
    where: {
      published: true, // 🔥 INI KUNCI
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(posts);
}

// CREATE
export async function POST(req: Request) {
  const body = await req.json();

  const post = await prisma.post.create({
    data: body,
  });

  return NextResponse.json(post);
}
