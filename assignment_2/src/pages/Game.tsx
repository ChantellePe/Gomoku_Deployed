import { useContext, useReducer, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { GameContext, SquareContext, UserContext } from '../context'
import style from './Game.module.css'
import { Square, Button } from '../components'
import { PLAYER, PLAYER_MOVE_ACTION } from '../constants'
import buttonStyle from '../components/Button.module.css'
//import { PlayerMoveType } from '../types'
import { useLocalStorage } from '../hooks'


type gameProps = {
    gameId?: number
}

type PlayerMove = {
    type: PLAYER_MOVE_ACTION
    payload: number[]
}

function gameReducer(state: number[][], action: PlayerMove) {
    const { type, payload } = action
    switch (type) {
        case PLAYER_MOVE_ACTION.SELECT:
            return [...state, payload]
        case PLAYER_MOVE_ACTION.RESET:
            return []
        default:
            return state
    }
}

export default function Game(props: gameProps) {
    //const navigate = useNavigate()
    const [winner, setWinner] = useState<PLAYER | 'tie' | undefined>(undefined)
    const { boardSize, gameId } = useContext(GameContext)
    const { user } = useContext(UserContext)
    const { playerTurn } = useContext(SquareContext)
    const [games, saveGames] = useLocalStorage<Record<string, number[][]>>('games', {})
    const { [`Game-${gameId}`]: selectedSquares = [], ...otherGames } = games
    const [playerOneState, dispatch1] = useReducer(gameReducer, [])
    const [playerTwoState, dispatch2] = useReducer(gameReducer, [])


    if (!user) return <Navigate to="/login" replace />
    if (!boardSize) return null

    const idGenerator = (id: number): number[] => {
        let row = 0
        let square = 0
        const index = id + 1
        if (index > boardSize) {
            if (index % boardSize !== 0) {
                row = Math.floor(index / boardSize)
                square = (id % boardSize)
            } else if (index % boardSize === 0) {
                row = (index / boardSize) - 1
                square = boardSize - 1
            }
        } else if (id < boardSize) {
            row = 0
            square = id
        }
        return [row, square]
    }

    function declareWinner(): boolean {
        if (playerOneState.length + playerTwoState.length === boardSize ** 2) {
            setWinner('tie')
            return true
        } else {
            if (fiveConseq(playerOneState)) {
                setWinner(PLAYER.PLAYER_ONE)
                return true
            } else if (fiveConseq(playerTwoState)) {
                setWinner(PLAYER.PLAYER_TWO)
                return true
            } else if (fiveDown(playerTwoState)) {
                setWinner(PLAYER.PLAYER_TWO)
                return true
            } else if (fiveDown(playerOneState)) {
                setWinner(PLAYER.PLAYER_ONE)
                return true
            } else if (diagLeft(playerTwoState)) {
                setWinner(PLAYER.PLAYER_TWO)
                return true
            } else if (diagLeft(playerOneState)) {
                setWinner(PLAYER.PLAYER_ONE)
                return true
            } else if (diagRight(playerTwoState)) {
                setWinner(PLAYER.PLAYER_TWO)
                return true
            } else if (diagRight(playerOneState)) {
                setWinner(PLAYER.PLAYER_ONE)
                return true
            } else {
                return false
            }
        }
    }

    const announceWinner = () => {
        if (winner === PLAYER.PLAYER_ONE) {
            return 'Black WINS!!!'
        } else if (winner === PLAYER.PLAYER_TWO) {
            return 'White WINS!!!'
        } else if (winner === 'tie') {
            return `It's a TIE!!!`
        } else {
            return winner
        }
    }

    function exists(arr: number[][], search: number[]): boolean {
        return arr.some(row => JSON.stringify(row) === JSON.stringify(search))
    }

    function fiveConseq(squareIds: number[][]): boolean {
        for (let idx = 0; idx < squareIds.length; idx++) {
            if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 1, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 2, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 3, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 4, squareIds[idx][1]])) {
                if (exists(squareIds, [squareIds[idx][0] - 1, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 5, squareIds[idx][1]])) {
                    return true
                }
            }
        }
        return false
    }

    function fiveDown(squareIds: number[][]): boolean {
        const number = boardSize
        for (let idx = 0; idx < squareIds.length; idx++) {
            if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
                if (exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1]) && exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5])) {
                    return true
                }
            }
        }
        return false
    }

    function diagLeft(squareIds: number[][]): boolean {
        const number = boardSize - 1
        for (let idx = 0; idx < squareIds.length; idx++) {
            if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
                if (exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1]) && exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5])) {
                    return true
                }
            }
        }
        return false
    }

    function diagRight(squareIds: number[][]): boolean {
        const number = boardSize + 1
        for (let idx = 0; idx < squareIds.length; idx++) {
            if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
                if (exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1]) && exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5])) {
                    return true
                }
            }
        }
        return false
    }


    return (
        <div className={style.container}>
            <h1 className={style.header}>{!declareWinner ? `Current Player: ${playerTurn}` : announceWinner()}</h1>
            <div className={style.board} id={`Game-${gameId}`} onClick={() => {
                declareWinner()
            }} style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {[...Array(boardSize * boardSize)].map((_, index) => (
                    <Square key={idGenerator(index).join(",")} id={idGenerator(index)} isOccupied={false} playerTurn={playerTurn}
                        playerMove={() => {
                            if (playerTurn === PLAYER.PLAYER_ONE) {
                                dispatch1({ type: PLAYER_MOVE_ACTION.SELECT, payload: idGenerator(index) })
                            } else if (playerTurn === PLAYER.PLAYER_TWO) {
                                dispatch2({ type: PLAYER_MOVE_ACTION.SELECT, payload: idGenerator(index) })
                            }
                        }
                        } />

                ))}
            </div>

            <div className={style.buttonSection}>
                <Button className={[buttonStyle.button, buttonStyle.reset].join(' ')}>Restart</Button>
                <Button className={[buttonStyle.button, buttonStyle.leave].join(' ')}>Leave</Button>
            </div>
        </div>

    )
}
