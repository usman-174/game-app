
import { Router } from "express";
import { addGame, getAllGames, getGameById, getTopGames, searchGame, updateGame } from "../controllers/gameController";

const games = Router();

games.get("/all-games", getAllGames);

// Get game by ID
games.get("/game/:id", getGameById);
// Route to search games by name
games.get("/games", searchGame);
games.get("/games-top", getTopGames);
games.post("/add-game", addGame);

// PUT /games/:id
games.put("/update-game/:id", updateGame);

export {
  games
};
