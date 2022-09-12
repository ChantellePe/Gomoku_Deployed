import { useContext, useState, useEffect, useCallback } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components'
import buttonStyle from '../components/Button.module.css'
import { UserContext } from '../context'
import type { Game } from '../types'
import style from './Games.module.css'
import { get } from '../utils/http'

export default function Games() {

    const { user, logout } = useContext(UserContext)
    const navigate = useNavigate()
    const [games, setGames] = useState<Game[]>([])

    const fetchGames = useCallback(async () => {
        try {
            const result = await get<Game[]>('/games')
            setGames(result)
        } catch (error) {
            console.log((error as Error).message)
            logout()
            navigate('/')
        }
    }, [logout, navigate])

    // useEffect(() => {
    //     if (!user) return
    //     fetchGames()
    // }, [fetchGames, user])



    if (!user) return <Navigate to='/login' />
    return (
        <div className={style.container}>
            <h1 className={style.header}>
                You have {games.length} {games.length === 1 ? 'game' : 'games'}
            </h1>
            {Object.keys(games).map((_, i) => {
                const noOfGames = games.length
                const gameId = games[i]._id
                const winner = games[i].winner
                const date = games[i].createdAt
                console.log(noOfGames, gameId, winner, date)
                if (games.length === 0) return null
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


