/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect, useCallback } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components'
import buttonStyle from '../components/Button.module.css'
import { UserContext } from '../context'
import type { GameType } from '../types'
import style from './Games.module.css'
import { get, deleteMany, del } from '../utils/http'


const dateFormat = (date: string) => {
    const day = date.split("-")[2]
    const month = date.split("-")[1]
    const year = date.split("-")[0]

    return day + "/" + month + "/" + year
}

export default function Games() {

    const { user, logout } = useContext(UserContext)
    const navigate = useNavigate()
    const [games, setGames] = useState<GameType[][]>([[]])
    const [deleteGame, setDeleteGame] = useState(false)

    const fetchGames = useCallback(async () => {
        try {
            const result = await get<GameType[][]>('/games')
            setGames(result)
        } catch (error) {
            console.log((error as Error).message)
            logout()
            navigate('/')
        }
    }, [logout, navigate])



    const delGames = async () => {
        try {
            if (user) {
                await deleteMany("/")
            }
        } catch (error) {
            console.log((error as Error).message)
        }
    }


    // const deleteGameById = async () => {
    //     try {
    //         if (user) {
    //             await del(`games/${gameId}`)
    //         }
    //     } catch (error) {
    //         console.log((error as Error).message)
    //     }
    // }

    useEffect(() => {
        delGames()
    }, [navigate])

    const deleteHandler = async (gameId: string) => {
        await del(`games/${gameId}`)
        setDeleteGame(deleteGame ? false : true)
        window.location.reload();
    }



    useEffect(() => {
        if (!user) {
            console.log("There is no user")
            return
        } else {
            fetchGames()
        }
    }, [fetchGames, user])

    if (!user) return <Navigate to="/login" replace />

    const gameDetails = Object.values(games) || {}
    const gameDetails2 = Object.values(gameDetails)
    const gameDetails3 = Object.values(gameDetails2)

    const numOfGames = (games) ? gameDetails3[0].length : ""
    console.log(gameDetails3)

    return (
        <div className={style.container}>
            <h1 className={style.header}>
                You have {numOfGames} {numOfGames === 1 ? 'game' : 'games'}
            </h1>
            {gameDetails3[0].map((key, i) => {
                if (numOfGames === 0) return null
                const gameId = gameDetails3[0][i]?._id
                const createdAt = gameDetails3[0][i]?.createdAt
                const winner = gameDetails3[0][i]?.winner
                const date = createdAt.split("T")[0]

                return (
                    <div id={gameId} className={`${style.list}`} key={gameId}>
                        <p className={style.title}>
                            {`Game #${i + 1} @ ${dateFormat(date)}`}
                        </p>
                        <p>
                            {`Winner: ${winner}`}
                        </p>
                        <Button
                            className={[buttonStyle.viewLog].join(' ')}
                            onClick={() => navigate(`/games/${gameId}`)}
                        >
                            View Game Log
                        </Button>
                        <img
                            src={require("../utils/DeleteButtonImg.png")} alt='Delete'
                            className={[buttonStyle.deleteIcon].join(" ")}
                            onClick={() => deleteHandler(gameId)}
                        />


                    </div>
                )
            })
            }
        </div>
    )
}

