import express, { Request, Response } from "express";
import validateSchema from '../middleware/validateSchema';
import { getGameSchema } from '../schema/gamelog.schema';


const gamelogHandler = express.Router();


gamelogHandler.get("/gamelog/:id", validateSchema(getGameSchema), (req: Request, res: Response) => {
    res.status(200).json([
        {

        }
    ])
})


export default gamelogHandler;