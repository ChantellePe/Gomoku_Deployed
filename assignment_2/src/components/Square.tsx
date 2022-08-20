import { useState, useContext, useEffect } from 'react'
import style from './Square.module.css'
import { PLAYER, SQUARE_STATUS } from '../constants'
import { SquareContext } from '../context'


type SquareProps = {
    id: number
    isOccupied?: boolean
    playerTurn: PLAYER | undefined
    //dispatch: React.Dispatch<PlayerTurn>
}

export default function Square(props: SquareProps) {
    const [status, setStatus] = useState(SQUARE_STATUS.AVAILABLE)
    //const { Player } = props

    const [classList, setClassList] = useState([`${style.square} ${style.available}`])
    const { playerTurn, nextTurn } = useContext(SquareContext)

    //const { boardSize } = useContext(GameContext)


    const getClassNames = (status: SQUARE_STATUS) => {
        const className = style.square
        switch (status) {
            case SQUARE_STATUS.AVAILABLE:
                return [...classList, (`${className} ${style.available}`)]
            case SQUARE_STATUS.OCCUPIED:
                return [...classList, (`${className} ${style.occupied}`)].filter((arr) => arr !== `${className} ${style.available}`)
            default:
                return classList
        }
    }



    const handleClick = () => {
        const className = style.square
        if ((status === SQUARE_STATUS.AVAILABLE) && (playerTurn === PLAYER.PLAYER_ONE)) {
            setStatus(SQUARE_STATUS.OCCUPIED)
            setClassList([`${className} ${style.occupied} ${style.Black}`].filter((arr) => arr !== `${style.available}`))
            nextTurn(PLAYER.PLAYER_TWO)

        } else if ((status === SQUARE_STATUS.AVAILABLE) && (playerTurn === PLAYER.PLAYER_TWO)) {
            setStatus(SQUARE_STATUS.OCCUPIED)
            console.log("dsukhsjfhkjdsfh")
            setClassList([`${className} ${style.occupied} ${style.White}`].filter((arr) => arr !== `${style.available}`))
            console.log(classList)
            nextTurn(PLAYER.PLAYER_ONE)
        } else {
            return setStatus(SQUARE_STATUS.AVAILABLE)
        }
    }


    return (
        <div className={classList.join(" ")} onClick={handleClick}></div>
    )
}
