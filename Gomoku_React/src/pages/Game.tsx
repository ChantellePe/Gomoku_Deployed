/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useReducer, useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { GameContext, SquareContext, UserContext } from '../context'
import style from './Game.module.css'
import { Square, Button } from '../components'
import { PLAYER, PLAYER_MOVE_ACTION } from '../constants'
import { GameType } from '../types'
import buttonStyle from '../components/Button.module.css'
import { put } from '../utils/http'


type PlayerMove = {
    type: PLAYER_MOVE_ACTION
    payload: number[]
}

function gameReducer(state: number[][] = [], action: PlayerMove) {
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

export default function Game() {
    const navigate = useNavigate()
    const [gameOver, setGameOver] = useState(false)
    const [winner, setWinner] = useState<PLAYER | "">("")
    const [resetButtonClicked, setResetButtonClicked] = useState(false);
    const { boardSize } = useContext(GameContext)
    const { user } = useContext(UserContext)
    const { playerTurn, nextTurn } = useContext(SquareContext)
    const [game, setGame] = useState<GameType>()
    const [playerOneState, dispatch1] = useReducer(gameReducer, [])
    const [playerTwoState, dispatch2] = useReducer(gameReducer, [])
    const { id = "" } = useParams()

    const resetGame = () => {
        setResetButtonClicked(() => resetButtonClicked ? false : true)
        dispatch1({ type: PLAYER_MOVE_ACTION.RESET, payload: [] })
        dispatch2({ type: PLAYER_MOVE_ACTION.RESET, payload: [] })
        nextTurn(PLAYER.PLAYER_ONE)
        setGameOver(false)
        setWinner("")
    }

    const getClassNames = (gameOver: boolean, winner: PLAYER | "") => {
        switch (gameOver) {
            case false:
                return `${style.header}`
            case true && winner === PLAYER.PLAYER_ONE:
                return `${style.header} ${style.winnerBlack}`
            case true && winner === PLAYER.PLAYER_TWO:
                return `${style.header} ${style.winnerWhite}`
            case true && winner === PLAYER.TIE:
                return `${style.header} ${style.winnerTie}`
            default:
                return `${style.header}`
        }
    }

    const gameMove = async () => {
        let results: GameType
        if (playerTurn === PLAYER.PLAYER_ONE && !game?.gameOver) {
            results = await put(`/game/${id}`, {
                userId: user?._id,
                gameOver: false,
                currentPlayer: "Black",
                gameArray: [],
                winner: "",
                gameArray_PlayerOne: playerOneState,
                gameArray_PlayerTwo: playerTwoState,
                boardSize: boardSize
            })
            return setGame(results)
        } else if (playerTurn === PLAYER.PLAYER_TWO && !game?.gameOver) {
            results = await put(`/game/${id}`, {
                userId: user?._id,
                gameOver: false,
                currentPlayer: "White",
                gameArray: [],
                winner: "",
                gameArray_PlayerOne: playerOneState,
                gameArray_PlayerTwo: playerTwoState,
                boardSize: boardSize
            })
            setGame(results)
        }
    }


    useEffect(() => {
        gameMove()
    }, [playerOneState, playerTwoState])



    if (!user) return <Navigate to="/login" replace />
    if (!boardSize) return null
    console.log(playerOneState)
    console.log(playerTwoState)

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
        if (game?.winner === "Black") {
            setGameOver(true)
            setWinner(PLAYER.PLAYER_ONE)
            return 'Black WINS!!!'
        } else if (game?.winner === "White") {
            setGameOver(true)
            setWinner(PLAYER.PLAYER_TWO)
            return 'White WINS!!!'
        } else if (game?.winner === "Tie") {
            setGameOver(true)
            setWinner(PLAYER.TIE)
            return `It's a TIE!!!`
        } else {
            return
        }
    }

    const getBoardStyles = (): string => {
        if (gameOver) {
            return `${style.gameOver} ${style.board}`
        } else if (!gameOver) {
            return `${style.board}`
        }
        return `${style.board}`
    }


    //TO BE MODIFIED
    const leave = () => {
        if (game?.gameOver && game?.gameArray.length > 0) {
            navigate('/games')
        } else {
            resetGame()
            navigate('/')
        }
    }

    return (
        <div className={style.container}>
            <h1 className={getClassNames(gameOver, winner)} >{winner === "" ? `Current Player: ${playerTurn}` : announceWinner()}</h1>
            <div className={getBoardStyles()} id={game?._id}
                style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {[...Array(boardSize * boardSize)].map((_, index) => (
                    <Square resetButtonClicked={resetButtonClicked} key={idGenerator(index).join(",")} id={idGenerator(index)} playerTurn={playerTurn}
                        playerMove={() => {
                            if (playerTurn === PLAYER.PLAYER_ONE) {
                                dispatch1({ type: PLAYER_MOVE_ACTION.SELECT, payload: idGenerator(index) })
                            } else if (playerTurn === PLAYER.PLAYER_TWO) {
                                dispatch2({ type: PLAYER_MOVE_ACTION.SELECT, payload: idGenerator(index) })
                            }
                        }} />
                ))}
            </div>
            <div className={style.buttonSection}>
                <Button className={[buttonStyle.button, buttonStyle.reset].join(' ')} onClick={resetGame}>Restart</Button>
                <Button className={[buttonStyle.button, buttonStyle.leave].join(' ')} onClick={leave}>Leave</Button>
            </div>
        </div>
    )
}
