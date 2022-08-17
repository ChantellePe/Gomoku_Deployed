import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { GameContext, UserContext } from '../context'
import style from './Game.module.css'

export default function Game() {

    const { boardSize } = useContext(GameContext)
    const { user } = useContext(UserContext)

    if (!user) return <Navigate to="/login" replace />

    return (
        <div className={style.container}>Hello the board is {boardSize}</div>
    )
}
