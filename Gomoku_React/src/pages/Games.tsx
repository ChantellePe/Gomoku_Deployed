import { useContext, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components'
import buttonStyle from '../components/Button.module.css'
import { UserContext } from '../context'
import type { Game } from '../types'
import style from './Games.module.css'
import { get } from '../utils/http'

export default function Games() {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [games, setGames] = useState<Game[]>([])

    const fetchGames = async () => {
        const fetchedGames = await get<Game[]>('/games')
        setGames(fetchedGames)
    }

    useEffect(() => {
        fetchGames()
    }, [])


    if (!user) return <Navigate to='/login' />
    return (
        <div className={style.container}>
            <h1 className={style.header}>
                You have {games.length} {games.length === 1 ? 'game' : 'games'}
            </h1>
            {games.map((key, i) => {
                const noOfGames = games.length
                const gameId = games[i]._id
                const winner = games[i].winner
                const date = games[i].createdAt
                if (noOfGames === 0) return null

                return (
                    <div id={gameId} className={`${style.list}`} key={gameId}>
                        <p className={style.title}>
                            {`Game #${i} @ ${date}`}
                        </p>
                        <p>
                            {`Winner: ${winner}`}
                        </p>
                        <Button
                            className={[buttonStyle.viewLog].join(' ')}
                            onClick={() => navigate(`/games/${gameId}`)}>
                            View Game Log
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}


