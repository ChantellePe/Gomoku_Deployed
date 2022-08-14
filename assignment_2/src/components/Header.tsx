import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './Header.module.css'
import buttonStyle from './Button.module.css'
import '../index.css'
import { UserContext } from '../context'


function Header() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    const getActions = () => {
        if (user) {
            return (<>
                <button className={buttonStyle.button} onClick={() => navigate('games')}>Previous Games</button>
            </>)
        } else {
            return (
                <button className={buttonStyle.button} onClick={() => navigate('login')}>Log In</button>
            )
        }
    }

    return (
        <header>
            <div className={style.container}>
                <span className={style.author}>Chantelle Perreau presents...</span>
                <Link to="/" className={style.title}>
                    Gomoku
                </Link>
                {getActions()}
            </div>
        </header >
    )
}

export default Header