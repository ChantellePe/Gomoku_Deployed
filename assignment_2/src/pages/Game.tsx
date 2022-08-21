import { useContext, useReducer, useState, useEffect } from 'react'
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
    const [gameOver, setGameOver] = useState(false)
    const [resetButtonClicked, setResetButtonClicked] = useState(false);
    const { boardSize, gameId } = useContext(GameContext)
    const { user } = useContext(UserContext)
    const { playerTurn, nextTurn } = useContext(SquareContext)
    const [games, saveGames] = useLocalStorage<Record<string, number[][]>>('games', {})
    const { [`Game-${gameId}`]: selectedSquares = [], ...otherGames } = games
    const [playerOneState, dispatch1] = useReducer(gameReducer, [])
    const [playerTwoState, dispatch2] = useReducer(gameReducer, [])




    useEffect(() => {
        function exists(arr: number[][], search: number[]): boolean {
            return arr.some(row => JSON.stringify(row) === JSON.stringify(search))
        }

        function fiveConseq(squareIds: number[][]): boolean {
            for (let idx = 0; idx < squareIds.length; idx++) {
                if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 1, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 2, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 3, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 4, squareIds[idx][1]])) {
                    if (!(exists(squareIds, [squareIds[idx][0] - 1, squareIds[idx][1]])) && (!exists(squareIds, [squareIds[idx][0] + 5, squareIds[idx][1]]))) {
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
                    if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && !(exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
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
                    if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && (!exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
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
                    if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && (!exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
                        return true
                    }
                }
            }
            return false
        }

        console.log(playerOneState)
        console.log(playerTwoState)

        if (playerOneState.length + playerTwoState.length === boardSize ** 2) {
            setWinner('tie')
            setGameOver(true)
        } else {
            if (fiveConseq(playerOneState)) {
                setWinner(PLAYER.PLAYER_ONE)
                setGameOver(true)
            } else if (fiveConseq(playerTwoState)) {
                setWinner(PLAYER.PLAYER_TWO)
                setGameOver(true)
            } else if (fiveDown(playerTwoState)) {
                setWinner(PLAYER.PLAYER_TWO)
                setGameOver(true)
            } else if (fiveDown(playerOneState)) {
                setWinner(PLAYER.PLAYER_ONE)
                setGameOver(true)
            } else if (diagLeft(playerTwoState)) {
                setWinner(PLAYER.PLAYER_TWO)
                setGameOver(true)
            } else if (diagLeft(playerOneState)) {
                setWinner(PLAYER.PLAYER_ONE)
                setGameOver(true)
            } else if (diagRight(playerTwoState)) {
                setWinner(PLAYER.PLAYER_TWO)
                setGameOver(true)
            } else if (diagRight(playerOneState)) {
                setWinner(PLAYER.PLAYER_ONE)
                setGameOver(true)
            } else {
                setWinner(undefined)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerOneState, playerTwoState])



    if (!user) return <Navigate to="/login" replace />
    if (!boardSize) return null

    const resetGame = () => {
        setResetButtonClicked(() => resetButtonClicked ? false : true)
        dispatch1({ type: PLAYER_MOVE_ACTION.RESET, payload: [] })
        dispatch2({ type: PLAYER_MOVE_ACTION.RESET, payload: [] })
        setGameOver(false)
        setWinner(undefined)
        nextTurn(PLAYER.PLAYER_ONE)
        console.log(`ResetButton: ${resetButtonClicked}`)
    }


    const idGenerator = (id: number): number[] => {
        let row = 0
        let square = 0
        const index = id + 1
        if (index > boardSize) {
            if (index % boardSize !== 0) {
                square = id
                row = Math.floor((id / boardSize))
            } else if (index % boardSize === 0) {
                row = (index / boardSize) - 1
                square = id
            }
        } else if (id < boardSize) {
            row = 0
            square = id
        }
        return [square, row]
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

    const getBoardStyles = (): string => {
        if (gameOver) {
            return `${style.gameOver} ${style.board}`
        } else {
            return `${style.board}`
        }
    }


    return (
        <div className={style.container}>
            <h1 className={style.header}>{winner === undefined ? `Current Player: ${playerTurn}` : announceWinner()}</h1>
            <div className={getBoardStyles()} id={`Game-${gameId}`}
                style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {[...Array(boardSize * boardSize)].map((_, index) => (
                    <Square resetButtonClicked={resetButtonClicked} key={idGenerator(index).join(",")} id={idGenerator(index)} playerTurn={playerTurn}
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
                <Button className={[buttonStyle.button, buttonStyle.reset].join(' ')} onClick={() => {

                    resetGame()
                }
                }>Restart</Button>
                <Button className={[buttonStyle.button, buttonStyle.leave].join(' ')}>Leave</Button>
            </div>
        </div>

    )
}
