
import express, { Request, Response } from "express";
import { deleteGamesByFilter } from '../service/games.service'
import { deserializeUser } from "../middleware/deserializeUser";
import mongoose from "mongoose";

const homeHandler = express.Router();
homeHandler.use(deserializeUser);

homeHandler.delete("/", async (req: Request, res: Response) => {
    try {
        const game = req.body;
        const id = req.params.id;
        const userId = req.userId;
        //const playerOneArrayLength = 0;
        const gamesToDelete = await deleteGamesByFilter(
            {
                userId: new mongoose.Types.ObjectId(userId),
                gameOver: { $eq: false }
            });
        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).send(err);
    }
})


export default homeHandler;
