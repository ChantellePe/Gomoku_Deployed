import express, { Express } from 'express';
import { createServer } from 'http'
import cors from 'cors'
import gameHandler from './handlers/game.handler';
import gamesHandler from './handlers/games.handler';
import authHandler from './handlers/auth.handler';
import connectDB from './util/connectDB';
import mongoose from 'mongoose';
import homeHandler from './handlers/home.handler';

const app: Express = express()

app.use(
    cors({
        origin: process.env.allowHost || true,
    })
)

app.use(express.json());

app.use('/api/game', gameHandler);
app.use('/api/games', gamesHandler, homeHandler);
app.use('/api/', authHandler, homeHandler);

export const server = createServer(app)

export default app
