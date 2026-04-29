import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  // only allow published on public API
  if (!post || !post.published) {
    return Response.json({ message: 'Not found' }, { status: 404 });
  }

  return Response.json(post);
}
