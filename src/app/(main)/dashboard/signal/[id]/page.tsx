import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import SignalDetail from './signal-detail';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function SignalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) return notFound();

  const signal = await prisma.signal.findUnique({
    where: { id },
  });

  if (!signal) return notFound();

  // 🔥 ambil role user
  const session = await getServerSession(authOptions);
  const role = session?.user?.role || 'FREE';

  const isPremium = role === 'PREMIUM' || role === 'ADMIN';

  return <SignalDetail signal={signal} isPremium={isPremium} />;
}
