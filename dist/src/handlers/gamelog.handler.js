"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const gamelog_schema_1 = require("../schema/gamelog.schema");
const gamelogHandler = express_1.default.Router();
const winners = {
    PlayerOne: "Black",
    PlayerTwo: "White",
    Tie: "It's a Tie"
};
let today = new Date();
gamelogHandler.get("/:id", (0, validateSchema_1.default)(gamelog_schema_1.getGameSchema), (req, res) => {
    res.status(200).json([
        {
            gameId: "Game 1",
            winner: winners.PlayerTwo,
            boardSize: 44,
            date: today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
            gameArray: [[2, 3], [4, 5]]
        }
    ]);
});
exports.default = gamelogHandler;
