
import { object, string, number, TypeOf, date, array, z } from "zod"


//saveGames({ ...games, [`Game-${Object.keys(games).length + 1}-${winner}-${Number(boardSize)}-${date}`]: finalArray })
const players = {
    PlayerOne: "Black",
    PlayerTwo: "White",
} as const;

const Players = z.nativeEnum(players)

const payload = {
    body: object({
        gameId: string({
            required_error: "Game id is required",
        }),
        squareId: z.array(number()),
        player: z.nativeEnum(players),
        winner: string().optional(),
        boardSize: number({
            required_error: "Board size is required",
        }),
        date: date({
            required_error: "Date is required",
        })
    })
}

const updateDeleteParams = {
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
    ...updateDeleteParams
})

export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type UpdateGameInput = TypeOf<typeof updateGameSchema>;
export type PlayerEnum = z.infer<typeof Players>