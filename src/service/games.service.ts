import GameModel from '../model/gamelog.model';

export async function getGamesByUserId(userId: string) {
    return await GameModel.findById({ userId }).lean();
}

export async function getGameById(id: string) {
    return await GameModel.findById(id).lean();
}  