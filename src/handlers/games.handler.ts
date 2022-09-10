import e from "express";
import express, { Request, Response } from "express";
import { z } from "zod";
import validateSchema from '../middleware/validateSchema';
import { deleteGameSchema, getGameSchema } from '../schema/game.schema';
import { getGameById, getGamesByUserId, createGame, deleteGame } from '../service/games.service'


const gamesHandler = express.Router();

let date = new Date();

// result.map(g => ({
//     _id: g._id,
//     gameID: g.gameID,
//     winner: g.winner,
//     date: g.date
// })));

gamesHandler.get("/", async (req: Request, res: Response) => {
    try {
        const userID = req.params.userId;
        const games = await getGamesByUserId(userID);
        if (!games) {
            return null;
        } else {
            return res.status(200).json(games);
        }

    } catch (err) {
        return res.status(500).send(err);
    }
})


gamesHandler.get("/:id", validateSchema(getGameSchema), async (req: Request, res: Response) => {
    const id = req.params.id;
    const game = await getGameById(id);
    if (!game) return res.sendStatus(404);
    return res.status(200).json({ game });
})



gamesHandler.delete("/:id", validateSchema(deleteGameSchema), async (req: Request, res: Response) => {
    console.log('Delete')
    const gameId = req.params.id;
    await deleteGame(gameId);
    res.sendStatus(200);
})

export default gamesHandler;