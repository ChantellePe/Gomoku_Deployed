import { useContext, useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components'
import buttonStyle from '../components/Button.module.css'
import { GameContext, UserContext } from '../context'
import { useLocalStorage } from '../hooks'
import style from './Games.module.css'
import Moment from 'moment'
import { PLAYER } from '../constants'


// type gamesProps = {
//     gameWinner: PLAYER
//     gameId: number
// }

export default function Games() {
    const { id } = useParams()
    //const { gameId } = useContext(GameContext)
    //const [gameWinner, setGameWinner] = useState<PLAYER>()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [games] = useLocalStorage<Record<string, number[][]>>('Games', {})
    const date = Moment().format('DD/MM/YYYY')




    if (!user) return <Navigate to='/login' />
    return (
        <div className={style.container}>

            <h1 className={style.header}>
                You have {Object.keys(games).length} {Object.keys(games).length === 1 ? 'game' : 'games'}
            </h1>
            {Object.keys(games).map((key, i, value) => {
                const noOfGames = games[key].length
                const gameId = key.split('-')[1].split(":")[0]
                const winner = key.split(':')[1]



                if (noOfGames === 0) return null
                return (
                    <div className={style.list} key={key}>
                        <p className={style.title}>
                            {`Game #${gameId} @${date}`}

                        </p>



                        <p>
                            {`Winner: ${winner}`}
                        </p>
                        <Button
                            className={[buttonStyle.button, buttonStyle.viewLog].join(' ')}
                            onClick={() => navigate(`/gamelog/${Number(gameId)})}`)}>
                            View Game Log
                        </Button>

                    </div>

                )
            })}
        </div>
    )
}


