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
exports.deleteGame = exports.getGamesByFilter = exports.getGameByFilter = exports.updateGame = exports.createGame = void 0;
const game_model_1 = __importDefault(require("../model/game.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// export async function getGamesByUserId(userId: string) {
//     return await GameModel.findById({ userId }).lean();
// }
// export async function getGameById(id: string) {
//     return await GameModel.findById(id).lean();
// }
function createGame(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return game_model_1.default.create(input);
    });
}
exports.createGame = createGame;
function updateGame(id, userId, input) {
    return __awaiter(this, void 0, void 0, function* () {
        return game_model_1.default.findOneAndUpdate({
            _id: new mongoose_1.default.Types.ObjectId(id),
            userId: new mongoose_1.default.Types.ObjectId(userId),
        }, input, { new: true } // new option to true to return the document after update was applied.
        );
    });
}
exports.updateGame = updateGame;
function getGameByFilter(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield game_model_1.default.findOne(query).lean();
    });
}
exports.getGameByFilter = getGameByFilter;
function getGamesByFilter(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield game_model_1.default.find(query).lean();
    });
}
exports.getGamesByFilter = getGamesByFilter;
function deleteGame(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield game_model_1.default.deleteOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
            userId: new mongoose_1.default.Types.ObjectId(userId)
        });
    });
}
exports.deleteGame = deleteGame;
