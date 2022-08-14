import { useState } from 'react'
import { Button } from '../components'
import style from './Home.module.css'

export default function Home() {
    const [boardSize, setBoardSize] = useState(0)


    return (
        <div className={style.boardForm}>

            <form className={style.boardForm} onSubmit={(e) => {
                e.preventDefault()
            }}>
                <select className={style.dropDown}
                    onChange={(e) => {
                        setBoardSize(Number(e.target.value))
                        console.log(e.target.value)

                    }}>
                    <option value={0} hidden>Board Size</option>
                    {(Array.from(Array(20)).map((e, i) => i + 5).map((num) =>
                        <option value={num}>{num}</option>)
                    )}
                </select>
                <Button
                    className={style.startGameButton}
                    type="submit"
                    disabled={boardSize === 0}>
                    Start Game
                </Button>
            </form>
        </div >
    )
}
