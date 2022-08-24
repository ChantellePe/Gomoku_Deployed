
import { useContext } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context'
import buttonStyle from '../components/Button.module.css'
import style from './GameLog.module.css'
import { Square, Button } from '../components'
import { useLocalStorage } from '../hooks'


export default function GameLog() {
    const [games] = useLocalStorage<Record<string, number[][]>>('Games', {})
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const { id } = useParams();
    if (!user) return <Navigate to='/login' />
    if (!id) return null

    return (
        <div>
            {Object.keys(games).map((key, i, value) => {
                const gameDetails = key.split('-')
                console.log(gameDetails[1])
                console.log(id)
                if (gameDetails[1] === id) {
                    console.log("found game")
                    const winner = gameDetails[2]
                    const boardSize = gameDetails[3]
                    return (
                        <div className={style.container}>
                            <h1 className={style.header}>Winner: {winner}</h1>
                            <div className={style.board} id={`Game-${id}`}
                                style={{ gridTemplateColumns: `repeat(${3}, 1fr)` }}>
                                {[...Array()].map((_, index) => (
                                    <Square id={[index]} playerMove={() => null} />
                                ))}
                            </div>

                            <div className={style.buttonSection}>
                                <Button className={buttonStyle.button} onClick={() => navigate(`/games`)} > Back </Button>
                            </div>
                        </div >
                    )
                }
            })}
        </div>
    )
}

