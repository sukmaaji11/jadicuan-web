import { prisma } from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverUrl: true,
      createdAt: true,
    },
  });

  return Response.json(posts);
}
