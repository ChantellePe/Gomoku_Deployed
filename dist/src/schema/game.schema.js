"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGameSchema = exports.getGameSchema = exports.updateGameSchema = exports.createGameSchema = void 0;
const zod_1 = require("zod");
//saveGames({ ...games, [`Game-${Object.keys(games).length + 1}-${winner}-${Number(boardSize)}-${date}`]: finalArray })
const players = {
    PlayerOne: "Black",
    PlayerTwo: "White",
};
const winners = {
    PlayerOne: "Black",
    PlayerTwo: "White",
    Tie: "Tie"
};
const payload = {
    body: (0, zod_1.object)({
        userId: (0, zod_1.string)({
            required_error: "User id is required",
        }),
        gameOver: zod_1.z.boolean(),
        gameArray_PlayerOne: (0, zod_1.array)(zod_1.z.array((0, zod_1.number)())),
        gameArray_PlayerTwo: (0, zod_1.array)(zod_1.z.array((0, zod_1.number)())),
        gameArray: (0, zod_1.array)(zod_1.z.array((0, zod_1.number)())),
        currentPlayer: zod_1.z.nativeEnum(players),
        winner: zod_1.z.nativeEnum(winners).optional(),
        boardSize: (0, zod_1.number)({
            required_error: "Board size is required",
        }),
    })
};
const getParams = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "Game id is required",
        }),
    }),
};
const updateDeleteParams = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "Game id is required",
        }),
    }),
};
exports.createGameSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateGameSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), updateDeleteParams));
exports.getGameSchema = (0, zod_1.object)(Object.assign({}, getParams));
exports.deleteGameSchema = (0, zod_1.object)(Object.assign({}, updateDeleteParams));
