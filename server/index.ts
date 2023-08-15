import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "abc@d.com",
    },
  })

  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .then(async () => {
    console.log("disconnecting...")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
