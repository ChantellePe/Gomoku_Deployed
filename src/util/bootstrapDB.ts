import 'dotenv/config';
import connect from './connectDB';

import UserModel from "../model/user.model";
import GameModel from "../model/gamelog.model";


const run = async () => {
    try {
        await connect();

        await UserModel.deleteMany();
        await UserModel.create();

        await GameModel.deleteMany();
        await GameModel.create();

        process.exit(0)
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

run();