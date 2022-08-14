import React from 'react'
//import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './Header.module.css'
import buttonStyle from './Button.module.css'
import '../index.css'



function Header() {

    const navigate = useNavigate()

    return (
        <header>
            <div className={style.container}>
                <span className={style.author}>Chantelle Perreau presents...</span>
                <Link to="/" className={style.title}>
                    Gomoku
                </Link>
                <button className={buttonStyle.button} onClick={() => navigate('login')}>Login</button>
            </div>
        </header >
    )
}

export default Header