/* eslint-disable array-callback-return */

import { useContext, useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context'
import buttonStyle from '../components/Button.module.css'
import style from './GameLog.module.css'
import squareStyle from '../components/Square.module.css'
import { Square, Button } from '../components'
import type { Game } from '../types'
import { get } from '../utils/http'

export default function GameLog() {
    const [game, setGame] = useState<Game>()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const { id = '' } = useParams();

    const fetchGame = async (id: string) => {
        const fetchedGame = await get<Game>(`/games/${id}`)
        setGame(fetchedGame)
    }

    useEffect(() => {
        fetchGame(id)
    }, [id])



    const idGenerator = (id: number, boardSize: number): number[] => {
        let row = 0
        let square = 0
        const index = id + 1
        if (index > boardSize) {
            if (index % boardSize !== 0) {
                square = id
                row = Math.floor((id / boardSize))
            } else if (index % boardSize === 0) {
                square = id
                row = (index / boardSize) - 1
            }
        } else if (id < boardSize) {
            square = id
            row = 0
        }
        return [square, row]
    }

    const arraysEqual = (a1: number[], a2: number[]): boolean => {
        return JSON.stringify(a1) === JSON.stringify(a2);
    }

    if (!user) return <Navigate to='/login' />
    if (!id) return null
    if (!game) return null

    const winner = game.winner
    const boardSize = game.boardSize
    const gameArr = game.gameArray

    return (
        <div key="container" className={style.container}>
            <h1 key="winner" className={style.header}>Winner: {winner}</h1>
            <div key="board" className={style.board} id={`Game-${id}`}
                style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {[...Array(boardSize ** 2)].map((e, index) => {

                    const classColor = (sqID: number[]) => gameArr.map((e, i) => {
                        if (arraysEqual(e, sqID)) {
                            if (i === 0 || i % 2 === 0) {
                                return (`${squareStyle.square}  ${squareStyle.Black} ${style.numberWhite}`)
                            } else if (i === 1 || i % 2 === 1) {
                                return ([`${squareStyle.square}  ${squareStyle.White}`])
                            }
                        } else if (!arraysEqual(e, sqID)) {
                            return (`${squareStyle.square} ${style.available}`)
                        }
                    })
                    const getIndex = (sqID: number[]) => gameArr.map((e, i) => {
                        if (arraysEqual(e, sqID)) {
                            return i + 1
                        }
                    })

                    return (
                        <div>
                            <Square id={idGenerator(index, boardSize)} classes={classColor(idGenerator(index, boardSize)).join(' ')}
                                key={idGenerator(index, boardSize).join(" ")} playerMove={() => null}><div className={`${style.numbers}`}>{getIndex(idGenerator(index, boardSize))}</div></Square>
                        </div>
                    )
                })}
            </div>

            <div className={style.buttonSection}>
                <Button className={buttonStyle.button} onClick={() => navigate(`/games`)} > Back </Button>
            </div>
        </div >
    )
}


