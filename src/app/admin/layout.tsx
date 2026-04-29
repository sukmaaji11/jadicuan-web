import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminShell from './admin-shell';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;

  if (role !== 'ADMIN') {
    redirect('/');
  }

  return <AdminShell>{children}</AdminShell>;
}
