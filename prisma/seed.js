import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('123456', 10);

  // 🔥 USER FREE
  await prisma.user.upsert({
    where: { email: 'free@jadicuan.com' },
    update: {},
    create: {
      email: 'free@jadicuan.com',
      password,
      role: 'FREE',
    },
  });

  // 🔥 USER PREMIUM
  await prisma.user.upsert({
    where: { email: 'premium@jadicuan.com' },
    update: {},
    create: {
      email: 'premium@jadicuan.com',
      password,
      role: 'PREMIUM',
    },
  });

  console.log('✅ Seed user berhasil dibuat');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
