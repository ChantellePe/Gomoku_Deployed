import mongoose, { Document } from "mongoose"
import { UserDocument } from './user.model'

export enum Winner {
    PlayerOne = 'Black',
    PlayerTwo = 'White',
    Tie = "It's a Tie!"
}

export enum Player {
    PlayerOne = 'Black',
    PlayerTwo = 'White',
}
export interface GameDocument extends Document {
    userId: UserDocument["_id"];
    gameID: String;
    currentPlayer: Player;
    winner: Winner;
    gameArray: [[number]];
    playerOneArray: [[number]];
    playerTwoArray: [[number]];
    boardSize: number;
    date: Date;
}

const getGamesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    gameID: String,
    winner: Winner,
    currentPlayer: Player,
    gameArray: [[Number]],
    playerOneArray: [[Number]],
    playerTwoArray: [[Number]],
    boardSize: Number,
    date: Date
})


export default mongoose.model<GameDocument>("Game", getGamesSchema)