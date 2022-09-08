import express, { Request, Response } from "express";
import { date } from "zod";
import validateSchema from '../middleware/validateSchema';
import { getGameSchema } from '../schema/gamelog.schema';


const gamelogHandler = express.Router();
const winners = {
    PlayerOne: "Black",
    PlayerTwo: "White",
    Tie: "It's a Tie"
}

let today = new Date();

gamelogHandler.get("/:id", validateSchema(getGameSchema), (req: Request, res: Response) => {
    res.status(200).json([
        {
            gameId: "Game 1",
            winner: winners.PlayerTwo,
            boardSize: 44,
            date: today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
            gameArray: [[2, 3], [4, 5]]

        }
    ])
})


export default gamelogHandler;