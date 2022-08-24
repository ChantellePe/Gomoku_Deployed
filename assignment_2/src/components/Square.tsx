import { useState, useContext, useEffect, memo } from 'react'
import style from './Square.module.css'
import { PLAYER, SQUARE_STATUS } from '../constants'
import { SquareContext } from '../context'



type SquareProps = {
    id: number[]
    playerTurn?: PLAYER
    playerMove: () => void
    resetButtonClicked?: boolean
    isOccupied?: boolean
}

export default memo(function Square(props: SquareProps) {

    const { playerMove, resetButtonClicked, isOccupied = false } = props
    const [status, setStatus] = useState(!isOccupied ? SQUARE_STATUS.AVAILABLE : SQUARE_STATUS.OCCUPIED)
    const [classList, setClassList] = useState([`${style.square} ${style.available}`])
    const { playerTurn, nextTurn } = useContext(SquareContext)

    useEffect(() => {
        setStatus(SQUARE_STATUS.AVAILABLE)
        setClassList([`${style.square} ${style.available}`])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetButtonClicked])



    const handleClick = () => {
        const className = style.square
        if ((status === SQUARE_STATUS.AVAILABLE) && (playerTurn === PLAYER.PLAYER_ONE)) {
            playerMove()
            setStatus(SQUARE_STATUS.OCCUPIED)
            setClassList([`${className} ${style.occupied} ${style.Black}`].filter((arr) => arr !== `${style.available}`))
            nextTurn(PLAYER.PLAYER_TWO)
        } else if ((status === SQUARE_STATUS.AVAILABLE) && (playerTurn === PLAYER.PLAYER_TWO)) {
            playerMove()
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
})