import { createContext } from "react";
import { PLAYER } from '../constants'

type GameContextType = {
    boardSize: number
    setBoardSize: (boardSize: number) => void
    gameId: number
    setGameId: (gameId: number) => void
    date: String
    winner: PLAYER | undefined
    setWinner: (winner: PLAYER | undefined) => void
}

const GameContext = createContext<GameContextType>({} as GameContextType)
export default GameContext