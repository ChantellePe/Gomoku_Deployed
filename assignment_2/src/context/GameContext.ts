import { createContext } from "react";
//import { Game } from '../types'

type GameContextType = {
    boardSize: number
    setBoardSize: (boardSize: number) => void
}

const GameContext = createContext<GameContextType>({} as GameContextType)
export default GameContext