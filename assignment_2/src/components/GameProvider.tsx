import React, { useState } from "react"
import { GameContext } from "../context"
import { PLAYER } from "../constants"
import Moment from 'moment'

type GameProviderProps = {
    children: React.ReactNode
}

export default function GameProvider({ children }: GameProviderProps) {
    const [boardSize, setBoardSize] = useState<number>(0)
    const [gameId, setGameId] = useState<number>(1)
    const date: String = Moment().format('DD/MM/YYYY')
    const [winner, setWinner] = useState<PLAYER | undefined>(undefined)


    return (
        <GameContext.Provider value={{ boardSize, setBoardSize, gameId, setGameId, winner, setWinner, date }}>
            {children}
        </GameContext.Provider>

    )
}
