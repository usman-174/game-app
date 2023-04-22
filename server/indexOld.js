const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const port = process.env.PORT || "3000";
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const express = require("express");
const cors = require("cors");
const games = require("./routes/games");

const app = express();
// Swagger set up
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Games API",
      version: "1.0.0",
      description: "This API provides endpoints for managing games in a database. The /games endpoint retrieves a list of all games, while the /games/{id} endpoint retrieves a specific game by ID. The /game endpoint allows for searching games by name, while /api/games-top retrieves the top 10 games by recommendation percentage. The /api/games endpoint creates a new game in the database, while the /api/games/{id} endpoint updates an existing game. The API is built using Swagger and follows the OpenAPI specification. The Game schema defines the structure of a game object, including properties such as ID, recommendation percentage, number of reviews, top critic score, tier, name, first release date, and URL. The API returns responses in JSON format and provides error messages for invalid requests.",
    },
  },
  apis: ["./routes/*.js"], // Path to the API routes
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(express.json());
app.use(
  cors({
    origin: process.env.NODE_ENV !== "production" ? "*" : process.env.ORIGIN,
  })
);

process.on("uncaughtException", (err) => {
  console.error("Unhandled Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", games);

// Not found route
app.use((_, res, __) => {
  res.status(404).json({ error: "Path donot exist" });
});

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});
