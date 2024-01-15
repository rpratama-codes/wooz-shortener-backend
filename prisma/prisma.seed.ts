import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  return await prisma.$transaction([
    prisma.user_types.createMany({
      data: [{ type: 'guest' }, { type: 'free' }, { type: 'paid' }],
    }),
    prisma.users.create({
      data: {
        first_name: 'user',
        last_name: 'guest',
        user_type: 'guest',
        email: 'guest@example.com',
        password: 'itsNotAPassword',
        user_uid: 'e19a18f4-b37d-11ee-a506-0242ac120002',
      },
    }),
  ]);
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
