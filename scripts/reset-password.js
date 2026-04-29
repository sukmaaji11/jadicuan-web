import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@jadicuan.co.id'; // ganti sesuai user kamu
  const newPassword = 'Passwordbaru**0'; // password baru

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
    },
  });

  console.log('✅ Password berhasil diupdate!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
