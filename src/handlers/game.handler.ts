import express, { Request, Response } from "express";
import validateSchema from '../middleware/validateSchema';
import { createGameSchema, updateGameSchema, deleteGameSchema } from '../schema/game.schema';
import { createGame, getGameByFilter, updateGame, deleteGamesByFilter } from "../service/games.service";
import mongoose from "mongoose";
import { deserializeUser } from "../middleware/deserializeUser";

const gameHandler = express.Router();
gameHandler.use(deserializeUser);

// Create a game
gameHandler.post("/", validateSchema(createGameSchema), async (req: Request, res: Response) => {
    // TODO: decode user id from token
    const userId = req.userId;
    const game = req.body;
    const newGame = await createGame({ userId, ...game });
    return res.status(200).send(newGame);
})

// Modify a game
gameHandler.put("/:id", validateSchema(updateGameSchema), async (req: Request, res: Response) => {
    // update in storage
    const game = req.body;
    const userId = req.userId;;
    const gameId = req.params.id;
    const currentGame = await getGameByFilter({ userId: new mongoose.Types.ObjectId(userId), _id: { $ne: new mongoose.Types.ObjectId(gameId) } });
    if ((currentGame?.gameOver)) {
        return res.sendStatus(405)
    }
    const newGame = await updateGame(gameId, userId, { ...game });
    if (!newGame) return res.sendStatus(404)
    return res.status(200).json(newGame)
})

function exists(arr: number[][], search: number[]): boolean {
    return arr.some(row => JSON.stringify(row) === JSON.stringify(search))
}

function fiveConseq(squareIds: number[][]): boolean {
    for (let idx = 0; idx < squareIds.length; idx++) {
        if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 1, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 2, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 3, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 4, squareIds[idx][1]])) {
            if (!(exists(squareIds, [squareIds[idx][0] - 1, squareIds[idx][1]])) && (!exists(squareIds, [squareIds[idx][0] + 5, squareIds[idx][1]]))) {
                return true
            }
        }
    }
    return false
}

function fiveDown(squareIds: number[][], boardSize: number): boolean {
    const number = boardSize
    for (let idx = 0; idx < squareIds.length; idx++) {
        if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
            if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && !(exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
                return true
            }
        }
    }
    return false
}

function diagLeft(squareIds: number[][], boardSize: number): boolean {
    const number = boardSize - 1
    for (let idx = 0; idx < squareIds.length; idx++) {
        if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
            if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && (!exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
                return true
            }
        }
    }
    return false
}

function diagRight(squareIds: number[][], boardSize: number): boolean {
    const number = boardSize + 1
    for (let idx = 0; idx < squareIds.length; idx++) {
        if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
            if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && (!exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
                return true
            }
        }
    }
    return false
}

function findWinner(playerOneState: number[][], playerTwoState: number[][], boardSize: number) {
    if (playerOneState.length > 3 && playerTwoState.length > 3) {
        if (playerOneState.length + playerTwoState.length === boardSize ** 2) {
            //setWinner(PLAYER.TIE)
            //setGameOver(true)
        } else {
            if (fiveConseq(playerOneState)) {
                //setWinner(PLAYER.PLAYER_ONE)
                // setGameOver(true)
            } else if (fiveConseq(playerTwoState)) {
                //setWinner(PLAYER.PLAYER_TWO)
                //setGameOver(true)
            } else if (fiveDown(playerTwoState, boardSize)) {
                // setWinner(PLAYER.PLAYER_TWO)
                //setGameOver(true)
            } else if (fiveDown(playerOneState, boardSize)) {
                //setWinner(PLAYER.PLAYER_ONE)
                //setGameOver(true)
            } else if (diagLeft(playerTwoState, boardSize)) {
                // setWinner(PLAYER.PLAYER_TWO)
                // setGameOver(true)
            } else if (diagLeft(playerOneState, boardSize)) {
                //setWinner(PLAYER.PLAYER_ONE)
                // setGameOver(true)
            } else if (diagRight(playerTwoState, boardSize)) {
                // setWinner(PLAYER.PLAYER_TWO)
                // setGameOver(true)
            } else if (diagRight(playerOneState, boardSize)) {
                // setWinner(PLAYER.PLAYER_ONE)
                //  setGameOver(true)
            } else {
                // setWinner(undefined)
            }
        }
    }
}





// useEffect(() => {
//     function exists(arr: number[][], search: number[]): boolean {
//         return arr.some(row => JSON.stringify(row) === JSON.stringify(search))
//     }
//     function fiveConseq(squareIds: number[][]): boolean {
//         for (let idx = 0; idx < squareIds.length; idx++) {
//             if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 1, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 2, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 3, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 4, squareIds[idx][1]])) {
//                 if (!(exists(squareIds, [squareIds[idx][0] - 1, squareIds[idx][1]])) && (!exists(squareIds, [squareIds[idx][0] + 5, squareIds[idx][1]]))) {
//                     return true
//                 }
//             }
//         }
//         return false
//     }

//     function fiveDown(squareIds: number[][]): boolean {
//         const number = boardSize
//         for (let idx = 0; idx < squareIds.length; idx++) {
//             if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
//                 if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && !(exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
//                     return true
//                 }
//             }
//         }
//         return false
//     }

//     function diagLeft(squareIds: number[][]): boolean {
//         const number = boardSize - 1
//         for (let idx = 0; idx < squareIds.length; idx++) {
//             if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
//                 if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && (!exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
//                     return true
//                 }
//             }
//         }
//         return false
//     }

//     function diagRight(squareIds: number[][]): boolean {
//         const number = boardSize + 1
//         for (let idx = 0; idx < squareIds.length; idx++) {
//             if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
//                 if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && (!exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
//                     return true
//                 }
//             }
//         }
//         return false
//     }

//     

//     if (playerOneState.length > 3 && playerTwoState.length > 3) {
//         if (playerOneState.length + playerTwoState.length === boardSize ** 2) {
//             setWinner(PLAYER.TIE)
//             setGameOver(true)
//         } else {
//             if (fiveConseq(playerOneState)) {
//                 setWinner(PLAYER.PLAYER_ONE)
//                 setGameOver(true)
//             } else if (fiveConseq(playerTwoState)) {
//                 setWinner(PLAYER.PLAYER_TWO)
//                 setGameOver(true)
//             } else if (fiveDown(playerTwoState)) {
//                 setWinner(PLAYER.PLAYER_TWO)
//                 setGameOver(true)
//             } else if (fiveDown(playerOneState)) {
//                 setWinner(PLAYER.PLAYER_ONE)
//                 setGameOver(true)
//             } else if (diagLeft(playerTwoState)) {
//                 setWinner(PLAYER.PLAYER_TWO)
//                 setGameOver(true)
//             } else if (diagLeft(playerOneState)) {
//                 setWinner(PLAYER.PLAYER_ONE)
//                 setGameOver(true)
//             } else if (diagRight(playerTwoState)) {
//                 setWinner(PLAYER.PLAYER_TWO)
//                 setGameOver(true)
//             } else if (diagRight(playerOneState)) {
//                 setWinner(PLAYER.PLAYER_ONE)
//                 setGameOver(true)
//             } else {
//                 setWinner(undefined)
//             }
//         }
//         console.log(playerOneState)
//         console.log(playerTwoState)
//     }
// }, [playerOneState, playerTwoState])


export default gameHandler;