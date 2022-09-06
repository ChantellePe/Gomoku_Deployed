import { object, string, number, TypeOf, date } from "zod"



const getParams = {
    params: object({
        gameId: string({
            required_error: "Game id is required",
        }),
        winner: string(),
        boardSize: number({
            required_error: "Board size is required",
        }),
        date: date({
            required_error: "Date is required",
        })
    }),
}

const updateDeleteParams = {
    params: object({
        id: string({
            required_error: "Game id is required",
        }),
    }),
}

export const getGameSchema = object({
    ...getParams
})
export const deleteGameSchema = object({
    ...updateDeleteParams
})

export type DeleteGamesInput = TypeOf<typeof deleteGameSchema>;
export type ReadGamesInput = TypeOf<typeof getGameSchema>;