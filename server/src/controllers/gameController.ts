import { Res } from 'src/types/Res';
import { Game } from "@prisma/client";
import Joi from "joi";

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
const getAllGames = async (_: Request, res: Response) :  Promise<Game[] | Res>=> {
    try {
      const games = await prisma.game.findMany();
  
      return res.status(200).json(games);
    } catch (err :any) {
      console.log("error=?",err.message );
      
      return res.status(500).json({ message: "Game not Available" });
    }
  }


  const getGameById =  async (req: Request, res: Response): Promise<Game | Res> => {
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
    } catch (err) {
      // If there was an error while querying the database, return a 500 error
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  const searchGame = async (req: Request, res: Response): Promise<Game[] | Res> => {
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
    } catch (err) {
      return res.status(500).json({ message: "Game not found" });
    }
  }
  const getTopGames = async (_: Request, res: Response): Promise<Game[] | Res> => {
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Game not found" });
    }
  }

  const addGame = async (req: Request, res: Response): Promise<Game | Res> => {
    //In put validation
    const schema = Joi.object({
      percentRecommended: Joi.number().min(0).max(100).required(),
      numReviews: Joi.number().min(0).required(),
      topCriticScore: Joi.number().min(0).max(100).required(),
      tier: Joi.string().required(),
      name: Joi.string().required(),
      firstReleaseDate: Joi.number().required(),
      url: Joi.string().required(),
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
    } catch (error) {
      console.error("err=>",error);
      return res.status(500).json({ error: "Failed to create game" });
    }
  }
  const updateGame = async (req: Request, res: Response): Promise<Game | Res> => {
    const gameId = parseInt(req.params.id);
  
    // Update the game in the database using Prisma
    try {
      // Build the update object based on non-empty fields in the req.body
      const updateObject: Record<string, unknown> = {};
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update game" });
    }
  }
  export {
    getAllGames,getGameById,searchGame,getTopGames,addGame,updateGame
  }