import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Header.module.css'
import buttonStyle from './Button.module.css'
import '../index.css'
import { useContext } from 'react'
import { GameContext, UserContext } from '../context'



function Header() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const { boardSize } = useContext(GameContext)
    const location = useLocation()

    const getboardSize = () => {
        return boardSize ? '/game' : '/'
    }


    const getActions = () => {
        if (user) {
            if (location.pathname === '/games' || location.pathname.includes('/gamelog/')) {
                return (<>
                    <button className={buttonStyle.button} onClick={() => navigate(getboardSize())}>Play Again</button>
                </>)
            } else {
                return (<>
                    <button className={buttonStyle.button} onClick={() => navigate('games')}>Previous Games</button>
                </>)
            }
        } else {
            return location.pathname !== '/login' ? (
                <button className={buttonStyle.button} onClick={() => navigate('login')}>Log In</button>
            ) : <button className={buttonStyle.button} onClick={() => navigate('signup')}>Sign Up</button>
        }
    }

    const welcomeMessage = () => {
        return (user) ? (<span data-testid="name" className={style.welcome}>Hi {user.username}! Welcome to...</span>) : (<span data-testid="no name" className={style.welcome}> Welcome to...</span>)
    }


    return (
        <header>
            <div className={style.container}>
                {welcomeMessage()}
                <Link to="/" className={style.title}>
                    Gomoku
                </Link>
                {getActions()}
            </div>
        </header >
    )
}

export default Header