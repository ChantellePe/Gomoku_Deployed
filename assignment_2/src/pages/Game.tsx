import { useContext, useReducer, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { GameContext, SquareContext, UserContext } from '../context'
import style from './Game.module.css'
import { Square, Button } from '../components'
import { PLAYER_MOVE_ACTION } from '../constants'
import buttonStyle from '../components/Button.module.css'
import { PlayerMoves } from '../types'
import { useLocalStorage } from '../hooks'


function gameReducer(state: number[][], action: PlayerMoves) {
    const { type, player, payload } = action
    switch (type) {
        case PLAYER_MOVE_ACTION.SELECT:
            return [...state, payload]
        default:
            return state
    }
}


export default function Game() {
    //const navigate = useNavigate()
    const { boardSize } = useContext(GameContext)
    const { user } = useContext(UserContext)
    const [id, setId] = useState([])
    const { playerTurn } = useContext(SquareContext)
    const { gameId } = useParams();
    const [games, saveGames] = useLocalStorage<Record<string, number[][]>>(
        'games',
        {}
    )
    const { [`Game-${gameId}`]: selectedSquares = [], ...otherGames } = games
    const [state, dispatch] = useReducer(gameReducer, selectedSquares)



    if (!user) return <Navigate to="/login" replace />
    if (!boardSize) return null

    const idGenerator = (id: number): number[] => {
        let row = 0
        let square = 0
        const index = id + 1
        if (index > boardSize) {
            if (index % boardSize !== 0) {
                row = Math.floor(index / boardSize)
                square = (id % boardSize)
            } else if (index % boardSize === 0) {
                row = (index / boardSize) - 1
                square = boardSize - 1
            }
        } else if (id < boardSize) {
            row = 0
            square = id
        }

        return [row, square]
    }




    return (
        <div className={style.container} id={gameId}>
            <h1 className={style.header}>Current Player: {playerTurn} </h1>
            <div className={style.board}
                style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {[...Array(boardSize * boardSize)].map((_, index) => (
                    <Square key={idGenerator(index).join(",")} id={idGenerator(index)} isOccupied={false} playerTurn={playerTurn} />
                ))}
            </div>

            <div className={style.buttonSection}>
                <Button className={[buttonStyle.button, buttonStyle.reset].join(' ')} onClick={() => { }}>Restart</Button>
                <Button className={[buttonStyle.button, buttonStyle.leave].join(' ')}>Leave</Button>
            </div>
        </div>

    )
}
