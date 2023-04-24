"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGame = exports.addGame = exports.getTopGames = exports.searchGame = exports.getGameById = exports.getAllGames = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllGames = async (_, res) => {
    try {
        const games = await prisma.game.findMany();
        return res.status(200).json(games);
    }
    catch (err) {
        console.log("error=?", err.message);
        return res.status(500).json({ message: "Game not Available" });
    }
};
exports.getAllGames = getAllGames;
const getGameById = async (req, res) => {
    // Parse game ID from request params
    const gameId = parseInt(req.params.id);
    // Check if the game ID is valid
    if (isNaN(gameId)) {
        return res.status(400).json({ message: "Invalid game ID" });
    }
    // Query the database for the game with the specified ID
    try {
        const game = await prisma.game.findUnique({
            where: {
                id: gameId,
            },
        });
        // If no game was found with the specified ID, return a 404 error
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        // Otherwise, return the game as the response
        return res.json(game);
    }
    catch (err) {
        // If there was an error while querying the database, return a 500 error
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getGameById = getGameById;
const searchGame = async (req, res) => {
    // Get the value of the "q" query parameter
    const name = String(req.query.q);
    try {
        // Query the database for games that match the search criteria
        const games = await prisma.game.findMany({
            where: {
                // Search for games whose name contains the search query (case-insensitive)
                name: {
                    contains: name,
                    mode: "insensitive",
                },
            },
        });
        // Send the search results as the response
        return res.status(200).json(games);
    }
    catch (err) {
        return res.status(500).json({ message: "Game not found" });
    }
};
exports.searchGame = searchGame;
const getTopGames = async (_, res) => {
    try {
        // Finding Games by Recommendation
        const games = await prisma.game.findMany({
            orderBy: {
                percentRecommended: "desc",
            },
            take: 10,
        });
        // Return the created game as the response
        return res.json(games);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Game not found" });
    }
};
exports.getTopGames = getTopGames;
const addGame = async (req, res) => {
    //In put validation
    const schema = joi_1.default.object({
        percentRecommended: joi_1.default.number().min(0).max(100).required(),
        numReviews: joi_1.default.number().min(0).required(),
        topCriticScore: joi_1.default.number().min(0).max(100).required(),
        tier: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        firstReleaseDate: joi_1.default.number().required(),
        url: joi_1.default.string().required(),
    });
    // Validate the input
    const { error, value } = schema.validate(req.body);
    if (error) {
        // Return a 400 Bad Request response with the validation error message
        return res
            .status(400)
            .json({ error: error.details[0].message.replace(/["\\]/g, "") });
    }
    // Create the game in the database using Prisma
    try {
        const game = await prisma.game.create({
            data: {
                percentRecommended: value.percentRecommended,
                numReviews: value.numReviews,
                topCriticScore: value.topCriticScore,
                tier: value.tier,
                name: value.name,
                firstReleaseDate: new Date(value.firstReleaseDate).getFullYear(),
                url: value.url,
            },
        });
        // Return the created game as the response
        return res.json(game);
    }
    catch (error) {
        console.error("err=>", error);
        return res.status(500).json({ error: "Failed to create game" });
    }
};
exports.addGame = addGame;
const updateGame = async (req, res) => {
    const gameId = parseInt(req.params.id);
    // Update the game in the database using Prisma
    try {
        // Build the update object based on non-empty fields in the req.body
        const updateObject = {};
        for (const key in req.body) {
            if (req.body[key]) {
                updateObject[key] = req.body[key];
            }
        }
        const updatedGame = await prisma.game.update({
            where: {
                id: gameId,
            },
            data: updateObject,
        });
        // Return the updated game as the response
        return res.json(updatedGame);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update game" });
    }
};
exports.updateGame = updateGame;
//# sourceMappingURL=gameController.js.map