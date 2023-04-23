const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { games: gamesRouter } = require('./routes/games.js');
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const app = express();
const port = process.env.PORT || "4000";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Games API",
      version: "1.0.0",
      description:
        "This API provides endpoints for managing games in a database. The /games endpoint retrieves a list of all games, while the /games/{id} endpoint retrieves a specific game by ID. The /game endpoint allows for searching games by name, while /api/games-top retrieves the top 10 games by recommendation percentage. The /api/games endpoint creates a new game in the database, while the /api/games/{id} endpoint updates an existing game. The API is built using Swagger and follows the OpenAPI specification. The Game schema defines the structure of a game object, including properties such as ID, recommendation percentage, number of reviews, top critic score, tier, name, first release date, and URL. The API returns responses in JSON format and provides error messages for invalid requests.",
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN || "*",
  })
);
const startTime = Date.now();

app.get("/", (_, res) => {
  const uptimeMs = Date.now() - startTime;
  const uptimeHours = uptimeMs / 3600000; // in hours
  const uptimeSeconds = uptimeMs / 1000; // in seconds
  res.json({
    message: `Server running for ${uptimeHours.toFixed(
      2
    )} hours (${uptimeSeconds.toFixed(0)} seconds)`,
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", gamesRouter);

app.use((_, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

 
  
});

process.on("uncaughtException", (err) => {
  console.error("Unhandled exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});

exports.app = app