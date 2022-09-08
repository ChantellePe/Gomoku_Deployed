import { object, string, number, TypeOf, date, array, z } from "zod"



const getParams = {
    params: object({
        id: string({
            required_error: "Game id is required",
        })
    })
}




export const getGameSchema = object({
    ...getParams
})

export const deleteGamesSchema = object({
    ...getParams
})

export type DeleteGamesInput = TypeOf<typeof deleteGamesSchema>;
export type ReadGameInput = TypeOf<typeof getGameSchema>;