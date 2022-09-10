import express, { Request, Response } from "express";
import validateSchema from '../middleware/validateSchema';
import { createGameSchema, updateGameSchema } from '../schema/game.schema';
import { createGame, getGameByFilter, getGamesByUserId, updateGame } from "../service/games.service";
import mongoose from "mongoose";

const gameHandler = express.Router();

// Create a game
gameHandler.post("/", validateSchema(createGameSchema), async (req: Request, res: Response) => {
    // TODO: decode user id from token
    const userId = "62f88bd5e67347af189c4baa";
    const game = req.body;
    //const allUserGames = await getGamesByUserId(userId);

    const newGame = await createGame({ ...game, userId });
    return res.status(200).send(newGame);
})



// Modify a game aka Player Move
gameHandler.put("/:id", validateSchema(updateGameSchema), async (req: Request, res: Response) => {
    // update in storage
    const game = req.body;
    const userId = "62f88bd5e67347af189c4baa";
    const gameId = req.params.id;
    const currentGame = await getGameByFilter({ userId: new mongoose.Types.ObjectId(userId), _id: { $ne: new mongoose.Types.ObjectId(gameId) } });
    if ((currentGame?.winner)) return res.sendStatus(405)
    // if (currentGame?.gameArray) {
    //     logic
    // }
    const newGame = await updateGame(gameId, userId, { ...game });
    if (!newGame) return res.sendStatus(404)
    return res.status(200).json(newGame)
})



export default gameHandler;