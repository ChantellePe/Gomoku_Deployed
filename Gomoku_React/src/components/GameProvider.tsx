import React, { useState } from "react"
import { GameContext } from "../context"

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
