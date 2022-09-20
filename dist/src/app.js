"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const game_handler_1 = __importDefault(require("./handlers/game.handler"));
const games_handler_1 = __importDefault(require("./handlers/games.handler"));
const auth_handler_1 = __importDefault(require("./handlers/auth.handler"));
const connectDB_1 = __importDefault(require("./util/connectDB"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
// connect to database
(0, connectDB_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use('/game', game_handler_1.default);
app.use('/games', games_handler_1.default);
app.use('/', auth_handler_1.default);
mongoose_1.default.connection.once('connected', () => {
    console.log('⚡️[server]: Connected to MongoDB.');
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
});
