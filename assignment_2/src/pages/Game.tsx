import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { GameContext, SquareContext, UserContext } from '../context'
import style from './Game.module.css'
import { PLAYER } from '../constants'
import { Square } from '../components'

export default function Game() {

    const { boardSize } = useContext(GameContext)
    const { user } = useContext(UserContext)
    const { playerTurn, nextTurn } = useContext(SquareContext)



    if (!user) return <Navigate to="/login" replace />
    if (!boardSize) return null


    return (
        <div className={style.container}>
            <h1 className={style.header}>Current Player: {playerTurn} </h1>
            <div className={style.board}
                style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {[...Array(boardSize * boardSize)].map((_, index) => (
                    <Square id={index} isOccupied={false} playerTurn={playerTurn} />
                ))}

            </div>
        </div >
    )
}
