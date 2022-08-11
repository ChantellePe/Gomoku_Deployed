import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Header.module.css'



function Header() {
    return (
        <div className={style.container}>
            <header className={style.header}>Gomoku</header>
        </div>
    )
}

export default Header