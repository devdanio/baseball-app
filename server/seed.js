const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  try {
    const response = await fetch(
      "https://api.sampleapis.com/baseball/hitsSingleSeason"
    );
    const data = await response.json();

    for (const player of data) {
      await prisma.player.create({
        data: {
          player: player.Player,
          ageThatYear: parseInt(player.AgeThatYear),
          hits: player.Hits,
          year: player.Year,
          bats: player.Bats,
        },
      });
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
