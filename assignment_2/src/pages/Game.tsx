import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { GameContext, UserContext } from '../context'
import style from './Game.module.css'
import { PLAYER } from '../constants'
import { Square } from '../components'

export default function Game() {

    const { boardSize } = useContext(GameContext)
    const { user } = useContext(UserContext)

    const playerTurn = () => {
        return (PLAYER.PLAYER_TWO) ? (PLAYER.PLAYER_ONE) : (PLAYER.PLAYER_TWO)
    }

    if (!user) return <Navigate to="/login" replace />
    if (!boardSize) return null


    return (
        <div className={style.container}>
            <h1 className={style.header}>Current Player: {playerTurn()}</h1>
            <div className={style.board} style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {[...Array(boardSize * boardSize)].map((_, index) => (
                    <Square id={index} />
                ))}

            </div>
        </div >
    )
}
