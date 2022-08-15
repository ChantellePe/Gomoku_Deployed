import { useContext } from 'react'
import { GameContext } from '../context'
import style from './Game.module.css'

export default function Game() {

    const { boardSize } = useContext(GameContext)
    console.log({ boardSize });

    return (
        <div className={style.container}>Hello the board is {boardSize}</div>
    )
}
