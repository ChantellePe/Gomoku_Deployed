
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { request } from 'http';
import gameHandler from './handlers/game.handler';
import gamesHandler from './handlers/games.handler';
import gamelogHandler from './handlers/gamelog.handler';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/game', gameHandler);
app.use('/games', gamesHandler);
app.use('/gamelog', gamelogHandler);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
