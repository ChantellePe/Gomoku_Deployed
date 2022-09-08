
import { object, string, number, TypeOf, date, array, z } from "zod"


//saveGames({ ...games, [`Game-${Object.keys(games).length + 1}-${winner}-${Number(boardSize)}-${date}`]: finalArray })
const players = {
    PlayerOne: "Black",
    PlayerTwo: "White",
} as const;

const winners = {
    PlayerOne: "Black",
    PlayerTwo: "White",
    Tie: "Tie"
} as const;

const Players = z.nativeEnum(players)

const payload = {
    body: object({
        id: string({
            required_error: "Game id is required",
        }),
        gameOver: z.boolean(),
        gameArray_PlayerOne: array(z.array(number())),
        gameArray_PlayerTwo: array(z.array(number())),
        gameArray_Combined: array(z.array(number())),
        player: z.nativeEnum(players),
        winner: z.nativeEnum(winners).optional(),
        boardSize: number({
            required_error: "Board size is required",
        }),
        date: string({
            required_error: "Date is required",
        })
    })
}


const updateParams = {
    params: object({
        id: string({
            required_error: "Game id is required",
        }),
    }),
}

export const createGameSchema = object({
    ...payload
})
export const updateGameSchema = object({
    ...payload,
    ...updateParams
})

export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type UpdateGameInput = TypeOf<typeof updateGameSchema>;