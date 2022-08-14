import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Header.module.css'
import buttonStyle from './Button.module.css'
import Button from './Button'
import '../index.css'



function Header() {
    return (
        <header>
            <div className={style.container}>
                <span className={style.author}>Chantelle Perreau presents...</span>
                <Link to="/" className={style.title}>
                    Gomoku
                </Link>

                <Link to="login" className={buttonStyle.button}>Login</Link>
            </div>
        </header >
    )
}

export default Header