import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) return Response.json([]);

  const stocks = await prisma.stock.findMany({
    where: {
      code: {
        contains: q.toUpperCase(),
      },
    },
    take: 5,
  });

  return Response.json(stocks);
}
