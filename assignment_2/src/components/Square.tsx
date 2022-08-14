import { useState } from 'react'
import style from './Square.module.css'
import { SQUARE_STATUS } from '../constants'

type SquareProps = {
    id: number
    rowId: number
    playerId: number
}

export default function Square(props: SquareProps) {
    const { id, rowId, playerId } = props
    const [status, setStatus] = useState(SQUARE_STATUS.AVAILABLE)

    const getClassNames = () => {
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
        <div className={style.square} onClick={handleClick}></div>
    )
}
