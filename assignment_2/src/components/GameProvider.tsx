import React, { useState } from "react"
import { GameContext } from "../context"
//import { Game } from "../types"

type GameProviderProps = {
    children: React.ReactNode
}

export default function GameProvider({ children }: GameProviderProps) {
    const [boardSize, setBoardSize] = useState<number>(0)
    const [gameId, setGameId] = useState<number>(1)


    return (
        <GameContext.Provider value={{ boardSize, setBoardSize, gameId, setGameId }}>
            {children}
        </GameContext.Provider>

    )
}
