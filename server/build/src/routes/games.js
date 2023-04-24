"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.games = void 0;
const express_1 = require("express");
const gameController_1 = require("../controllers/gameController");
const games = (0, express_1.Router)();
exports.games = games;
games.get("/all-games", gameController_1.getAllGames);
// Get game by ID
games.get("/game/:id", gameController_1.getGameById);
// Route to search games by name
games.get("/games", gameController_1.searchGame);
games.get("/games-top", gameController_1.getTopGames);
games.post("/add-game", gameController_1.addGame);
// PUT /games/:id
games.put("/update-game/:id", gameController_1.updateGame);
//# sourceMappingURL=games.js.map