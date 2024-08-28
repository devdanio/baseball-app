const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const { getPlayerById, getAllPlayersRankedByHits } = require("./models");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// GET all players
app.get("/players", async (req, res) => {
  const players = await getAllPlayersRankedByHits();
  res.json(players);
});

// GET player by id
app.get("/players/:id", async (req, res) => {
  const { id } = req.params;
  const player = await getPlayerById(id);
  res.json(player);
});

// POST new player
app.post("/players", async (req, res) => {
  const { player, ageThatYear, hits, year, bats } = req.body;
  const newPlayer = await prisma.player.create({
    data: { player, ageThatYear, hits, year, bats },
  });
  res.json(newPlayer);
});

// PUT update player
app.put("/players/:id", async (req, res) => {
  const { id } = req.params;
  const { player, ageThatYear, hits, year, bats, bio } = req.body;
  const updatedPlayer = await prisma.player.update({
    where: { id: parseInt(id) },
    data: { player, ageThatYear, hits, year, bats, bio },
  });
  res.json(updatedPlayer);
});

// DELETE player
app.delete("/players/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.player.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: "Player deleted successfully" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
