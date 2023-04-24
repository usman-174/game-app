"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("../data.json"));
const index_1 = require("../../prisma/index");
async function addGamesToModel(gameDataArray) {
    try {
        const gamePromises = gameDataArray.map((gameData) => {
            return index_1.prisma.game.create({
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
    }
    catch (err) {
        console.error(err);
    }
    finally {
        await index_1.prisma.$disconnect();
    }
}
addGamesToModel(data_json_1.default);
//# sourceMappingURL=addBulkGames.js.map