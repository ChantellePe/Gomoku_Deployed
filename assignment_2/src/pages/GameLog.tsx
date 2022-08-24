
import { useContext } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context'
import buttonStyle from '../components/Button.module.css'
import style from './GameLog.module.css'

//import PreviousGameItem from '../components/PreviousGameItem';

// type gameLogProps = {
//     id?: number

// }

export default function GameLog() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const { id } = useParams();
    if (!user) return <Navigate to='/login' />
    if (!id) return null





    return (
        <div className={style.container}>
            {/* <img className={style.poster} src={poster} alt={title} /> */}
            {/* <div className={style.title}>{title}</div> */}

            <button className={buttonStyle.button} onClick={() => navigate(`/games`)}>
                Back
            </button>
        </div>
    )
}


