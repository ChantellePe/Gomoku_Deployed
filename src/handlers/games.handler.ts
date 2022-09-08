import express, { Request, Response } from "express";
import { z } from "zod";
import validateSchema from '../middleware/validateSchema';
import { deleteGamesSchema } from '../schema/gamelog.schema';


const gamesHandler = express.Router();

const winners = {
    PlayerOne: "Black",
    PlayerTwo: "White",
    Tie: "Tie"
}

let date = new Date();

// Get games
gamesHandler.get("/", (req: Request, res: Response) => {
    try {
        return res.status(200).json(

            {
                id: "Game 1",
                boardSize: 21,
                winner: winners.PlayerOne,
                date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
            }

        )
    } catch (err) {
        return res.status(500).send(err);
    }
})


gamesHandler.delete("/:id", validateSchema(deleteGamesSchema), (req: Request, res: Response) => {
    console.log('Delete')
    // Delete in storage
    res.sendStatus(200);
})


export default gamesHandler;