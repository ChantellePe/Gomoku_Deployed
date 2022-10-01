/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import style from './Home.module.css'
import { GameType } from '../types'
import { GameContext, SquareContext, UserContext } from '../context'
import { PLAYER } from '../constants'
import { deleteMany, post } from '../utils/http'
import { API_HOST } from '../constants'

export default function Home() {
    const navigate = useNavigate()
    const { boardSize, setBoardSize } = useContext(GameContext)
    const { nextTurn } = useContext(SquareContext)
    const { user } = useContext(UserContext)


    const newGame = async () => {
        const game: GameType = await post(`${API_HOST}/api/game`, {
            userId: user?._id,
            gameOver: false,
            currentPlayer: "Black",
            winner: "",
            gameArray: [],
            gameArray_PlayerOne: [],
            gameArray_PlayerTwo: [],
            boardSize: boardSize
        })
        navigate(`game/${game._id}`)
    }

    const delGames = async () => {
        try {
            if (user) {
                await deleteMany(`${API_HOST}/api`)
            }
        } catch (error) {
            console.log((error as Error).message)
        }
    }

    useEffect(() => {
        delGames()
    }, [navigate])

    return (
        <div className={style.boardForm}>
            <form className={style.boardForm} onSubmit={(e) => {
                e.preventDefault()
                if (!user) {
                    return navigate('login')
                } else {
                    nextTurn(PLAYER.PLAYER_ONE)
                    newGame()
                }
            }}>
                <select className={style.dropDown}
                    onChange={(e) => {
                        setBoardSize(Number(e.target.value))

                    }}>
                    <option value={0} hidden>Board Size</option>
                    {(Array.from(Array(20)).map((e, i) => i + 5).map((num) =>
                        <option key={num} value={num}>{num}</option>)
                    )}
                </select>
                <div className={style.gameRules}>
                    <header className={style.rulesTitle}>Game Rules:</header>
                    <p>Players alternate turns placing a stone of their color on an empty intersection. <br></br><br></br> Black plays first.
                        The winner is the first player to form an unbroken chain of five stones horizontally, vertically, or diagonally.
                        <br></br><br></br>Placing so that a line of more than five stones of the same color is created does not result in a win.</p>
                </div>
                <Button
                    className={style.startGameButton}
                    type="submit"
                    disabled={boardSize === 0}>
                    Start Game
                </Button>
            </form>
        </div >
    )
}
