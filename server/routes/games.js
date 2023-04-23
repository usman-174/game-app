const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");

const games = Router();
const prisma = new PrismaClient();

games.get("/all-games", async (_, res) => {
  try {
    const games = await prisma.game.findMany(); // Find all games in the database

    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: "Game not Available" });
  }
});

// Get game by ID
games.get("/game/:id", async (req, res) => {
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
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Route to search games by name
games.get("/games", async (req, res) => {
  // Get the value of the "q" query parameter
  const name = req.query.q;
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
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: "Game not found" });
  }
});
games.get("/games-top", async (req, res) => {
  try {
    // Finding Games by Recommendation
    const games = await prisma.game.findMany({
      orderBy: {
        percentRecommended: "desc",
      },
      take: 10,
    });

    // Return the created game as the response
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Game not found" });
  }
});
games.post("/add-game", async (req, res) => {
  //In put validation
  const schema = Joi.object({
    percentRecommended: Joi.number().min(0).max(100).required(),
    numReviews: Joi.number().min(0).required(),
    topCriticScore: Joi.number().min(0).max(100).required(),
    tier: Joi.string().required(),
    name: Joi.string().required(),
    firstReleaseDate: Joi.date().required(),
    url: Joi.string().required(),
  });
  // Validate the input
  const { error } = schema.validate(req.body);
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
        percentRecommended: req.body.percentRecommended,
        numReviews: req.body.numReviews,
        topCriticScore: req.body.topCriticScore,
        tier: req.body.tier,
        name: req.body.name,
        firstReleaseDate: req.body.firstReleaseDate,
        url: req.body.url,
      },
    });

    // Return the created game as the response
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create game" });
  }
});

// PUT /games/:id
games.put("/update-game/:id", async (req, res) => {
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
    res.json(updatedGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update game" });
  }
});

exports.games = games;

/**
 * @swagger
 * components:
 *   schemas:
 *    Game:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        percentRecommended:
 *          type: integer
 *          example: 100
 *        numReviews:
 *          type: integer
 *          example: 41
 *        topCriticScore:
 *          type: number
 *          format: float
 *          example: 89.6470588235294
 *        tier:
 *          type: string
 *          example: "Mighty"
 *        name:
 *          type: string
 *          example: "The Stanley Parable: Ultra Deluxe"
 *        firstReleaseDate:
 *           type: integer
 *           description: The date the game was first released.
 *           example: 2016
 *        url:
 *          type: string
 *          example: "https://opencritic.com/game/13083/the-stanley-parable-ultra-deluxe"
 *    required:
 *      - id
 *      - percentRecommended
 *      - numReviews
 *      - topCriticScore
 *      - tier
 *      - name
 *      - firstReleaseDate
 *      - url
 *
 *
 *
 * paths:
 *  /api/all-games:
 *   get:
 *     summary: Retrieve all games.
 *     description: Get all games from database
 *     tags:
 *      - Games
 *     responses:
 *       200:
 *         description: A list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *  /api/game/{id}:
 *   get:
 *     summary: Get a game by ID
 *     description: Get a game from the database by its ID
 *     tags:
 *      - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: The ID of the game to retrieve
 *         required: true
 *     responses:
 *       '200':
 *         description: The game object that matches the given ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       '500':
 *         description: Game not found
 *  /api/games:
 *    get:
 *      summary: Get games by name
 *      description: Get a list of games by name from the database
 *      tags:
 *       - Games
 *      parameters:
 *        - in: query
 *          name: q
 *          schema:
 *            type: string
 *          description: The name of the game to search for
 *          required: true
 *      responses:
 *        '200':
 *          description: A list of games that match the search criteria
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Game'
 *        '500':
 *          description: Game not found
 *
 *  /api/games-top:
 *   get:
 *     summary: Get top 10 games by recommendation percentage.
 *     tags:
 *       - Games
 *     responses:
 *       200:
 *         description: Returns an array of top 10 games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       500:
 *         description: Games not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *  /api/add-game:
 *   post:
 *     summary: Create a new game
 *     tags:
 *       - Games
 *     requestBody:
 *       description: Object containing the game data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: Successfully created a new game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       500:
 *         description: Failed to create game
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *  /api/update-game/{id}:
 *    put:
 *     summary: Update a game by ID
 *     description: Update a game in the database using its ID
 *     tags:
 *      - Games
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the game to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated game object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       '200':
 *         description: OK. Returns the updated game object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       '400':
 *         description: Bad Request. Invalid input parameters.
 *       '404':
 *         description: Not Found. Game not found.
 *       '500':
 *         description: Internal Server Error. Failed to update game in the database.
 */
