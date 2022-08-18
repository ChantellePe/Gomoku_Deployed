import { useState, useContext } from 'react'
import style from './Square.module.css'
import { PLAYER, SQUARE_STATUS } from '../constants'
import { GameContext } from '../context'


type SquareProps = {
    id: number
    isOccupied?: boolean
    Player?: PLAYER | undefined
    className?: string
    //dispatch: React.Dispatch<PlayerTurn>
}

export default function Square(props: SquareProps) {
    const [status, setStatus] = useState(SQUARE_STATUS.AVAILABLE)
    const { Player } = props
    //const { boardSize } = useContext(GameContext)


    const getClassNames = (status: SQUARE_STATUS) => {
        const className = style.square
        switch (status) {
            case SQUARE_STATUS.AVAILABLE:
                return `${className} ${style.available}`
            case SQUARE_STATUS.OCCUPIED:
                return `${className} ${style.occupied}`
            default:
                return className
        }
    }

    const handleClick = () => {
        if (status === SQUARE_STATUS.AVAILABLE) {
            setStatus(SQUARE_STATUS.OCCUPIED)

        }
    }

    return (
        <div className={getClassNames(status)} onClick={handleClick}></div>
    )
}
