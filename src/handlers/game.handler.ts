import express, { Request, Response } from "express";
import validateSchema from '../middleware/validateSchema';
import { createGameSchema, updateGameSchema } from '../schema/game.schema';
import { createGame, getGameByFilter, updateGame } from "../service/games.service";
import mongoose from "mongoose";
import { deserializeUser } from "../middleware/deserializeUser";

const gameHandler = express.Router();
gameHandler.use(deserializeUser);

// Create a game
gameHandler.post("/", validateSchema(createGameSchema), async (req: Request, res: Response) => {
    // TODO: decode user id from token
    const userId = req.userId;
    const game = req.body;
    const newGame = await createGame({ userId, ...game });
    return res.status(200).send(newGame);
})

// Modify a game
gameHandler.put("/:id", validateSchema(updateGameSchema), async (req: Request, res: Response) => {
    // update in storage
    const game = req.body;
    const userId = req.userId;;
    const gameId = req.params.id;
    const currentGame = await getGameByFilter({ userId: new mongoose.Types.ObjectId(userId), _id: { $ne: new mongoose.Types.ObjectId(gameId) } });
    if ((currentGame?.gameOver)) return res.sendStatus(405)
    if ((currentGame?.winner)) return res.sendStatus(405)
    const newGame = await updateGame(gameId, userId, { ...game });
    if (!newGame) return res.sendStatus(404)
    return res.status(200).json(newGame)
})



export default gameHandler;