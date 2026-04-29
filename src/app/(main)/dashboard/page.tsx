import { PrismaClient } from '@prisma/client';
import WatchlistClient from './watchlist-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  const signals = await prisma.signal.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <WatchlistClient signals={signals} />;
}
