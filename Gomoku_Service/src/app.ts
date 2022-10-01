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


app.use(express.json());

app.use('/game', gameHandler);
app.use('/games', gamesHandler, homeHandler);
app.use('/', authHandler, homeHandler);

export const server = createServer(app)

export default app
