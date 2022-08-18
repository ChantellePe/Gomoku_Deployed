import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { GameContext, UserContext } from '../context'
import style from './Game.module.css'
import { PLAYER } from '../constants'
import { Square } from '../components'

export default function Game() {

    const { boardSize } = useContext(GameContext)
    const { user } = useContext(UserContext)
    const [playerTurn, setPlayerTurn] = useState(PLAYER.PLAYER_ONE)



    const nextTurn = (player: PLAYER) => {
        if (player === undefined) {
            return setPlayerTurn(PLAYER.PLAYER_ONE)
        } else if (player === PLAYER.PLAYER_ONE) {
            return setPlayerTurn(PLAYER.PLAYER_TWO)
        } else if (player === PLAYER.PLAYER_TWO) {
            return setPlayerTurn(PLAYER.PLAYER_ONE)
        }
    }

    const getClassName = (player: PLAYER) => {
        const className = style
        switch (player) {
            case PLAYER.PLAYER_ONE:
                return `${className} ${style.Black}`
            case PLAYER.PLAYER_TWO:
                return `${className} ${style.White}`
            default:
                return className
        }
    }



    if (!user) return <Navigate to="/login" replace />
    if (!boardSize) return null


    return (
        <div className={style.container}>
            <h1 className={style.header}>Current Player: {playerTurn} </h1>
            <div className={style.board} onClick={() => nextTurn(playerTurn)}
                style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {[...Array(boardSize * boardSize)].map((_, index) => (
                    <Square id={index} Player={playerTurn} isOccupied={false} />
                ))}

            </div>
        </div >
    )
}
