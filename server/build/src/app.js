"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const games_1 = require("./routes/games");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger/swagger.json"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || "4000";
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN || "*",
}));
const startTime = Date.now();
app.get("/", (_, res) => {
    const uptimeMs = Date.now() - startTime;
    const uptimeHours = uptimeMs / 3600000; // in hours
    const uptimeSeconds = uptimeMs / 1000; // in seconds
    res.json({
        message: `Server running for ${uptimeHours.toFixed(2)} hours (${uptimeSeconds.toFixed(0)} seconds)`,
    });
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use("/api", games_1.games);
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
//# sourceMappingURL=app.js.map