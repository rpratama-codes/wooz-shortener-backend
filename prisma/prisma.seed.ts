import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const role = prisma.user_types.createMany({
    data: [{ type: 'guest' }, { type: 'free' }, { type: 'paid' }],
  });

  return role;
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
