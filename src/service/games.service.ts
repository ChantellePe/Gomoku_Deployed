import GameModel from '../model/gamelog.model';

export async function getAllGames() {
    return await GameModel.find().lean();
}

export async function getGameById(id: string) {
    return await GameModel.findById(id).lean();
}  