import express, { Request, Response } from "express";
import validateSchema from '../middleware/validateSchema';
import { createGameSchema, updateGameSchema } from '../schema/game.schema';



const gameHandler = express.Router();

// Create a game
gameHandler.post("/game", validateSchema(createGameSchema), (req: Request, res: Response) => {
    // TODO: save into storage
    const game = req.body;
    res.status(200).json(game)
})

// Modify a game
gameHandler.put("/game", validateSchema(updateGameSchema), (req: Request, res: Response) => {
    // update in storage
    const game = req.body;
    res.status(200).json(game)
})



export default gameHandler;