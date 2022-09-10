import express, { Request, Response } from "express";
import { z } from "zod";
import validateSchema from '../middleware/validateSchema';
import { deleteGamesSchema } from '../schema/gamelog.schema';
import { getGameSchema } from '../schema/gamelog.schema';
import { getAllGames, getGameById } from '../service/games.service'

const gamesHandler = express.Router();

let date = new Date();

gamesHandler.get("/", async (req: Request, res: Response) => {
    try {
        const result = await getAllGames();
        return res.status(200).send(result.map(g => ({
            _id: g._id,
            gameID: g.gameID,
            winner: g.winner,
            date: g.date
        })));
    } catch (err) {
        return res.status(500).send(err);
    }
})


gamesHandler.get("/:id", validateSchema(getGameSchema), async (req: Request, res: Response) => {
    const game = await getGameById(req.params.id);
    console.log(game)
    if (!game) return res.sendStatus(404);
    return res.status(200).json({ game });
})


gamesHandler.delete("/:id", validateSchema(deleteGamesSchema), (req: Request, res: Response) => {
    console.log('Delete')
    // Delete in storage
    res.sendStatus(200);
})


export default gamesHandler;