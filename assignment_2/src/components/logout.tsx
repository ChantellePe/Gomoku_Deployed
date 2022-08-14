import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './logout.module.css'
import { UserContext } from '../context'



export default function Logout() {
    const navigate = useNavigate()
    const { user, logout } = useContext(UserContext)


    if (user) {
        return (<>
            <button className={style.logout} onClick={() => {
                logout()
                navigate('login')
            }}>Log out</button>
        </>)
    } else {
        return (
            null
        )
    }
}


