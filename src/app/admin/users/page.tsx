import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Admin – Users</h1>

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="rounded-xl border bg-white p-4 dark:bg-zinc-900"
          >
            <p className="font-semibold">{u.email}</p>
            <p className="text-xs text-zinc-500">{u.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
