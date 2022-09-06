import { object, string, number, TypeOf, date, array, z } from "zod"


const winners = {
    PlayerOne: "Black",
    PlayerTwo: "White",
    Tie: "It's a Tie"
}

const Winners = z.nativeEnum(winners)


const getParams = {
    params: object({
        gameId: string({
            required_error: "Game id is required",
        }),
        winner: z.nativeEnum(winners),
        boardSize: number({
            required_error: "Board size is required",
        }),
        date: date({
            required_error: "Date is required",
        }),
        gameArray: array(z.array(number()))
    }),
}

export const getGameSchema = object({
    ...getParams
})

export type ReadGameInput = TypeOf<typeof getGameSchema>;
export type WinnerEnum = z.infer<typeof Winners>