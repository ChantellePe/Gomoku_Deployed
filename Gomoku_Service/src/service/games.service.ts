import GameModel, { GameDocument } from '../model/game.model';
import mongoose, { DocumentDefinition, FilterQuery } from 'mongoose';


export async function getGameById(id: string) {
    return await GameModel.findById(id).lean();
}

export async function createGame(input: DocumentDefinition<GameDocument>) {
    return GameModel.create(input)
}

export async function updateGame(
    id: string,
    userId: string,
    input: DocumentDefinition<GameDocument>
) {
    return GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(id),
            userId: new mongoose.Types.ObjectId(userId),
        },
        input,
        { new: true } // new option to true to return the document after update was applied.
    )
}

export async function getGameByFilter(query: FilterQuery<GameDocument>) {
    return await GameModel.findOne(query).lean()
}

export async function getGamesByFilter(query: FilterQuery<GameDocument>) {
    return await GameModel.find(query).lean()
}

export async function deleteGame(id: string, userId: string) {
    return await GameModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
    })
}

export async function deleteGamesByFilter(query: FilterQuery<GameDocument>) {
    return await GameModel.deleteMany(query).lean()
}