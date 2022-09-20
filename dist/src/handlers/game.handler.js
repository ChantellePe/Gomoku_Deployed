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
const mongoose_1 = __importDefault(require("mongoose"));
const deserializeUser_1 = require("../middleware/deserializeUser");
const gameHandler = express_1.default.Router();
gameHandler.use(deserializeUser_1.deserializeUser);
// Create a game
gameHandler.post("/", (0, validateSchema_1.default)(game_schema_1.createGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: decode user id from token
    const userId = req.userId;
    const game = req.body;
    const newGame = yield (0, games_service_1.createGame)(Object.assign(Object.assign({}, game), { userId }));
    return res.status(200).send(newGame);
}));
// Modify a game
gameHandler.put("/:id", (0, validateSchema_1.default)(game_schema_1.updateGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // update in storage
    const game = req.body;
    const userId = req.userId;
    ;
    const gameId = req.params.id;
    const currentGame = yield (0, games_service_1.getGameByFilter)({ userId: new mongoose_1.default.Types.ObjectId(userId), _id: { $ne: new mongoose_1.default.Types.ObjectId(gameId) } });
    if ((currentGame === null || currentGame === void 0 ? void 0 : currentGame.winner))
        return res.sendStatus(405);
    // if (currentGame?.gameArray) {
    //     logic
    // }
    const newGame = yield (0, games_service_1.updateGame)(gameId, userId, Object.assign({}, game));
    if (!newGame)
        return res.sendStatus(404);
    return res.status(200).json(newGame);
}));
exports.default = gameHandler;
