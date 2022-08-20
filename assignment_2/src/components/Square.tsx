import { useState, useContext } from 'react'
import style from './Square.module.css'
import { PLAYER, SQUARE_STATUS } from '../constants'
import { SquareContext } from '../context'


type SquareProps = {
    id: number
    isOccupied?: boolean
    playerTurn: PLAYER
    //dispatch: React.Dispatch<PlayerTurn>
}

export default function Square(props: SquareProps) {
    const [status, setStatus] = useState(SQUARE_STATUS.AVAILABLE)


    const [classList, setClassList] = useState([`${style.square} ${style.available}`])
    const { playerTurn, nextTurn } = useContext(SquareContext)

    const handleClick = () => {
        const className = style.square
        if ((status === SQUARE_STATUS.AVAILABLE) && (playerTurn === PLAYER.PLAYER_ONE)) {
            setStatus(SQUARE_STATUS.OCCUPIED)
            setClassList([`${className} ${style.occupied} ${style.Black}`].filter((arr) => arr !== `${style.available}`))
            nextTurn(PLAYER.PLAYER_TWO)
        } else if ((status === SQUARE_STATUS.AVAILABLE) && (playerTurn === PLAYER.PLAYER_TWO)) {
            setStatus(SQUARE_STATUS.OCCUPIED)
            setClassList([`${className} ${style.occupied} ${style.White}`].filter((arr) => arr !== `${style.available}`))
            nextTurn(PLAYER.PLAYER_ONE)
        } else {
            return setStatus(SQUARE_STATUS.AVAILABLE)
        }
    }


    return (
        <div className={classList.join(" ")} onClick={handleClick}></div>
    )
}
