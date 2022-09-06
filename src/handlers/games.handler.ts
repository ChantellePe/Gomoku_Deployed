import express, { Request, Response } from "express";
import validateSchema from '../middleware/validateSchema';
import { getGameSchema, deleteGameSchema } from '../schema/games.schema';


const gamesHandler = express.Router();

// Get movies
gamesHandler.get("/games", validateSchema(getGameSchema), (req: Request, res: Response) => {
    res.status(200).json([
        {

        },
        {

        }
    ])
})



gamesHandler.delete("/games", validateSchema(deleteGameSchema), (req: Request, res: Response) => {
    console.log('Delete')
    // Delete in storage
    res.sendStatus(200);
})


export default gamesHandler;