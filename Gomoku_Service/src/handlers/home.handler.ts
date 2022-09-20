
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
        await deleteGamesByFilter(
            {
                $and: [
                    { userId: new mongoose.Types.ObjectId(userId) },
                    { $or: [{ gameOver: { $eq: false } }, { gameArray: { $eq: [] } }] }
                ]
            });
        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).send(err);
    }
})


export default homeHandler;
