
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { request } from 'http';
import gameHandler from './handlers/game.handler';
import gamesHandler from './handlers/games.handler';
import gamelogHandler from './handlers/gamelog.handler';
import connectDB from './util/connectDB';
import mongoose from 'mongoose';

dotenv.config();

// connect to database
connectDB();


const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/game', gameHandler);
app.use('/games', gamesHandler);
app.use('/gamelog', gamelogHandler);


mongoose.connection.once('connected', () => {
    console.log('⚡️[server]: Connected to MongoDB.');
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
})