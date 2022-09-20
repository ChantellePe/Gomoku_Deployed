"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const game_schema_1 = require("../schema/game.schema");
const games_service_1 = require("../service/games.service");
const deserializeUser_1 = require("../middleware/deserializeUser");
const gamesHandler = express_1.default.Router();
gamesHandler.use(deserializeUser_1.deserializeUser);
//Get games by User
gamesHandler.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const games = yield (0, games_service_1.getGamesByFilter)({ userId });
        if (!games) {
            return null;
        }
        else {
            return res.status(200).json({ games });
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }
}));
//Get game by Game Id
gamesHandler.get("/:id", (0, validateSchema_1.default)(game_schema_1.getGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userId = req.userId;
        const game = yield (0, games_service_1.getGameByFilter)({ id, userId });
        if (!game)
            return res.sendStatus(404);
        return res.status(200).json({ game });
    }
    catch (err) {
        return res.status(500).send(err);
    }
}));
//Delete game by Game Id
gamesHandler.delete("/:id", (0, validateSchema_1.default)(game_schema_1.deleteGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userId = req.userId;
        yield (0, games_service_1.deleteGame)(id, userId);
        return res.sendStatus(200);
    }
    catch (err) {
        return res.status(500).send(err);
    }
}));
exports.default = gamesHandler;
