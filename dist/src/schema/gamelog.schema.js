"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGamesSchema = exports.getGameSchema = void 0;
const zod_1 = require("zod");
const getParams = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "Game id is required",
        })
    })
};
exports.getGameSchema = (0, zod_1.object)(Object.assign({}, getParams));
exports.deleteGamesSchema = (0, zod_1.object)(Object.assign({}, getParams));
