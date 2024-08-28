const { PrismaClient } = require("@prisma/client");
const { generateFamousPersonDescription } = require("./description-generator");
const prisma = new PrismaClient();

const getPlayerById = async (id) => {
  const players = await getAllPlayersRankedByHits();
  let player = players.find((player) => player.id === Number(id));

  // Need to check player is defined

  if (!player.bio) {
    const bio = await generateFamousPersonDescription(player.player);
    await prisma.player.update({
      where: { id: player.id },
      data: { bio: bio },
    });
    player.bio = bio;
  }

  return { ...player };
};

const getAllPlayersRankedByHits = async () => {
  const players = await prisma.player.findMany({
    orderBy: {
      hits: "desc",
    },
  });

  return players
    .sort((a, b) => b.hits - a.hits)
    .map((player, rank) => {
      return {
        ...player,
        rank: rank + 1,
      };
    });
};

module.exports = {
  getPlayerById,
  getAllPlayersRankedByHits,
};
