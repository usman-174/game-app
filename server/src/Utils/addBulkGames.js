
const data =require("../data.json");
const { PrismaClient } =require( '@prisma/client')
const prisma = new PrismaClient()

async function addGamesToModel(gameDataArray) {
  try {
    const gamePromises = gameDataArray.map((gameData) => {
      return prisma.game.create({
        data: {
          percentRecommended: Math.ceil(parseInt(gameData.percentRecommended.toFixed(2))),
          numReviews: gameData.numReviews,
          topCriticScore: gameData.topCriticScore,
          tier: gameData.tier,
          name: gameData.name,
          firstReleaseDate: new Date(gameData.firstReleaseDate).getFullYear(),
          url: gameData.url,
        },
      });
    });

    const games = await Promise.all(gamePromises);
    console.log(`Added ${games.length} games`);
  } catch (err) {
    console.error(err); 
  } finally {
    await prisma.$disconnect();
  }
}
addGamesToModel(data )