
import { useContext } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context'
import buttonStyle from '../components/Button.module.css'
import style from './GameLog.module.css'
import squareStyle from '../components/Square.module.css'
import { Square, Button } from '../components'
import { useLocalStorage } from '../hooks'



export default function GameLog() {
    const [games] = useLocalStorage<Record<string, number[][]>>('Games', {})
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const { id } = useParams();


    const getboardSize = (): number | null => {
        Object.keys(games).map((key, i, value) => {
            const gameDetails = key.split('-')
            if (gameDetails[1] === id) {
                return parseInt(gameDetails[3])
            }
            return null
        })
        return null
    }

    const idGenerator = (id: number): number[] => {
        let row = 0
        let square = 0
        const index = id + 1
        const boardSize = getboardSize();
        if (boardSize) {
            if (index > boardSize) {
                if (index % boardSize) {
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
        return []
    }



    if (!user) return <Navigate to='/login' />
    if (!id) return null

    return (
        <div>
            {Object.keys(games).map((key, i, value) => {
                const gameDetails = key.split('-')
                if (gameDetails[1] === id) {
                    console.log("found game")
                    const winner = gameDetails[2]
                    const boardSize = parseInt(gameDetails[3])
                    return (
                        <div className={style.container}>
                            <h1 className={style.header}>Winner: {winner}</h1>
                            <div className={style.board} id={`Game-${id}`}
                                style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                                {[...Array(boardSize ** 2)].map((e, index) => {
                                    for (let i = 0; i < games[key].length; i++) {


                                    }
                                    return (
                                        <div>
                                            <Square className={squareStyle.square} key={idGenerator(index).join(",")} id={idGenerator(index)} playerMove={() => null} />
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

            })}
        </div>
    )
}

