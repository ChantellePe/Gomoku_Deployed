import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components'
import buttonStyle from '../components/Button.module.css'
import { UserContext } from '../context'
import { useLocalStorage } from '../hooks'
import style from './Games.module.css'
import Moment from 'moment'
//import { PLAYER } from '../constants'


// type gamesProps = {
//     gameWinner: PLAYER
//     gameId: number
// }

export default function Games() {
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
                const id = key.split('-')[1]
                const winner = key.split('-')[2]



                if (noOfGames === 0) return null
                return (
                    <div className={style.list} key={key}>
                        <p className={style.title}>
                            {`Game #${id} @${date}`}

                        </p>



                        <p>
                            {`Winner: ${winner}`}
                        </p>
                        <Button
                            className={[buttonStyle.button, buttonStyle.viewLog].join(' ')}
                            onClick={() => navigate(`/gamelog/${id}`)}>
                            View Game Log
                        </Button>

                    </div>

                )
            })}
        </div>
    )
}


