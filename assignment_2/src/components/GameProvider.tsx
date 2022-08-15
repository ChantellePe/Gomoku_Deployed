import React, { useState } from "react"
import { GameContext } from "../context"
//import { Game } from "../types"

type GameProviderProps = {
    children: React.ReactNode
}

export default function GameProvider({ children }: GameProviderProps) {
    const [boardSize, setBoardSize] = useState<number>(0)


    return (
        <GameContext.Provider value={{ boardSize, setBoardSize }}>
            {children}
        </GameContext.Provider>

    )
}
