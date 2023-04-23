import { Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { games } from "./routes/games";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || "4000";


app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN || "*",
  })
);
const startTime = Date.now();

app.get("/", (_ : Request, res: Response) => {
  const uptimeMs = Date.now() - startTime;
  const uptimeHours = uptimeMs / 3600000; // in hours
  const uptimeSeconds = uptimeMs / 1000; // in seconds
  res.json({
    message: `Server running for ${uptimeHours.toFixed(
      2
    )} hours (${uptimeSeconds.toFixed(0)} seconds)`,
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", games);

app.use((_: Request,res : Response) => {
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

export {
  app
}