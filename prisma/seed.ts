import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seedDatabase() {
  //   await prisma.user.create({
  //     data: {
  //       name: "Alice",
  //       email: "abc@d.com",
  //       alias: "alice",
  //       bio: "random person",
  //     },
  //   })
}

seedDatabase()
  .then(async () => {
    console.log("disconnecting...")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
