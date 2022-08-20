import { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { GameContext, SquareContext, UserContext } from '../context'
import style from './Game.module.css'
import { Square, Button } from '../components'
import { PLAYER } from '../constants'
import buttonStyle from '../components/Button.module.css'




export default function Game() {
    const navigate = useNavigate()
    const { boardSize, setBoardSize } = useContext(GameContext)
    const { user } = useContext(UserContext)
    const { playerTurn, nextTurn } = useContext(SquareContext)
    const [gameId, setGameID] = useState(0)




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

            <div className={style.buttonSection}>
                <Button className={[buttonStyle.button, buttonStyle.reset].join(' ')} onClick={() => { }}>Restart</Button>
                <Button className={[buttonStyle.button, buttonStyle.leave].join(' ')}>Leave</Button>
            </div>
        </div>

    )
}
