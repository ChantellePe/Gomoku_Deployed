import e from "express";
import express, { Request, Response } from "express";
import { z } from "zod";
import validateSchema from '../middleware/validateSchema';
import { deleteGameSchema, getGameSchema } from '../schema/game.schema';
import { getGameByFilter, deleteGame, getGamesByFilter, getGameById } from '../service/games.service'
import mongoose from "mongoose";

const gamesHandler = express.Router();

//Get games by User
gamesHandler.get("/", async (req: Request, res: Response) => {
    try {
        const userId = "62f88bd5e67347af189c4baa";
        //const userId = req.body.userId;
        const games = await getGamesByFilter({ userId });
        if (!games) {
            return null;
        } else {
            return res.status(200).json({ games });
        }
    } catch (err) {
        return res.status(500).send(err);
    }
})

//Get game by Game Id
gamesHandler.get("/:id", validateSchema(getGameSchema), async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const game = await getGameById(id);
        if (!game) return res.sendStatus(404);
        return res.status(200).json({ game });
    } catch (err) {
        return res.status(500).send(err);
    }
})

//Delete game by Game Id
gamesHandler.delete("/:id", validateSchema(deleteGameSchema), async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await deleteGame(id);
        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default gamesHandler;