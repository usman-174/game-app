interface Game {
  
  percentRecommended: number;
  numReviews: number;
  topCriticScore: number;
  tier: string;
  name: string;
  firstReleaseDate: number;
  url: string;
}


import data from "../data.json";
import { prisma } from "../prisma/index";

async function addGamesToModel(gameDataArray) {
  try {
    const gamePromises = gameDataArray.map((gameData : Game) => {
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