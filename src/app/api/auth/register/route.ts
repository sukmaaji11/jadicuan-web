import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return Response.json(
      { message: 'Email & password wajib' },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return Response.json({ message: 'Email sudah digunakan' }, { status: 400 });
  }

  const hashed = await hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashed,
    },
  });

  return Response.json({ success: true });
}
