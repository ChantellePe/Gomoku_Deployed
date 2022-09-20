"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAYER_MOVE_ACTION = exports.PLAYER = exports.SQUARE_STATUS = void 0;
var SQUARE_STATUS;
(function (SQUARE_STATUS) {
    SQUARE_STATUS["AVAILABLE"] = "AVAILABLE";
    SQUARE_STATUS["OCCUPIED"] = "OCCUPIED";
})(SQUARE_STATUS = exports.SQUARE_STATUS || (exports.SQUARE_STATUS = {}));
var PLAYER;
(function (PLAYER) {
    PLAYER["PLAYER_ONE"] = "Black";
    PLAYER["PLAYER_TWO"] = "White";
    PLAYER["TIE"] = "Game is a draw";
})(PLAYER = exports.PLAYER || (exports.PLAYER = {}));
var PLAYER_MOVE_ACTION;
(function (PLAYER_MOVE_ACTION) {
    PLAYER_MOVE_ACTION["SELECT"] = "SELECT";
    PLAYER_MOVE_ACTION["RESET"] = "RESET";
})(PLAYER_MOVE_ACTION = exports.PLAYER_MOVE_ACTION || (exports.PLAYER_MOVE_ACTION = {}));
