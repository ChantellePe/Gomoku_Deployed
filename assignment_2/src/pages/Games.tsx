import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { GameContext, UserContext } from '../context'
import { useLocalStorage } from '../hooks'
import style from './Games.module.css'


export default function Games() {
    const { user } = useContext(UserContext)
    const { gameId } = useContext(GameContext)
    const navigate = useNavigate()
    const [games] = useLocalStorage<Record<string, number[][]>>('Games', {})

    if (!user) return <Navigate to='/login' />
    return (
        <div className={style.container}>
            <h1 className={style.header}>
                You have {Object.keys(games).length} games
            </h1>
            {Object.keys(games).map((key) => {
                const squares = games[key].length
                if (squares === 0) return null
                return (
                    <div className={style.list} key={key}>
                        <p className={style.title}>
                            {`Game-${gameId}`} @ //placeholder
                        </p>
                        <p>
                            {squares} {squares > 1 ? 'seats' : 'seat'} se
                        </p>
                        <button
                            className={style.button}
                            onClick={() => navigate(`/session/${gameId}`)}
                        >
                            View/Edit
                        </button>
                    </div>
                )
            })}
        </div>
    )
}


