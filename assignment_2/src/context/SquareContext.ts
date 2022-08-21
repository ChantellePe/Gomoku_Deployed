import { createContext } from "react";
import { PLAYER } from '../constants'

type SquareContextType = {
    playerTurn: PLAYER
    nextTurn: (player: PLAYER) => void
}

const SquareContext = createContext<SquareContextType>({} as SquareContextType)
export default SquareContext