import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const trade = await prisma.trade.findUnique({
    where: { id: body.id },
  });

  if (!trade) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  const exit = parseFloat(body.exit);

  const profit = (exit - trade.entry) * trade.quantity;

  const updated = await prisma.trade.update({
    where: { id: body.id },
    data: {
      exit,
      status: 'CLOSED',
      profit,
    },
  });

  return Response.json(updated);
}
