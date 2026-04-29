import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// ✅ GET (ambil semua trade user)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    console.log('SESSION:', session);

    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const trades = await prisma.trade.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return Response.json(trades);
  } catch (error) {
    console.error('GET TRADE ERROR:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

// ✅ POST (create trade)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    console.log('BODY:', body);

    // ✅ VALIDASI
    if (!body.code || !body.entry || !body.quantity) {
      return Response.json({ error: 'Invalid input' }, { status: 400 });
    }

    // 🔥 CEK ROLE
    const role = session.user.role || 'FREE';
    const isPremium = role === 'PREMIUM' || role === 'ADMIN';

    // 🔥 HITUNG TRADE USER
    const tradeCount = await prisma.trade.count({
      where: { userId: session.user.id },
    });

    // 🔥 LIMIT FREE USER
    if (!isPremium && tradeCount >= 5) {
      return Response.json(
        {
          error: 'Limit tercapai',
          message: 'Upgrade ke premium untuk tambah trade tanpa batas',
        },
        { status: 403 },
      );
    }

    const entry = parseFloat(body.entry);
    const quantity = parseInt(body.quantity);

    if (isNaN(entry) || isNaN(quantity)) {
      return Response.json({ error: 'Invalid number' }, { status: 400 });
    }

    const exit = body.exit && body.exit !== '' ? parseFloat(body.exit) : null;

    const isClosed = exit !== null;

    const profit = isClosed ? (exit - entry) * quantity : null;

    const trade = await prisma.trade.create({
      data: {
        userId: session.user.id,
        code: body.code,
        entry,
        exit,
        quantity,
        status: isClosed ? 'CLOSED' : 'OPEN',
        profit,
        type: body.type || 'BUY', // ✅ FIX

        // 🔥 journal
        note: body.note || null,
        setup: body.setup || null,
        emotion: body.emotion || null,
      },
    });

    return Response.json(trade);
  } catch (err) {
    console.error('ERROR CREATE TRADE:', err);

    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
