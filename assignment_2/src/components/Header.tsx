import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Header.module.css'
import Button from './Button'



function Header() {
    return (
        <div className={style.container}>
            <header className={style.header}>
                Gomoku <span className={style.author}>by Chantelle Perreau</span>
            </header>
            <Button>Login</Button>
        </div>
    )
}

export default Header