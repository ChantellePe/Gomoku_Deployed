import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context'

//import PreviousGameItem from '../components/PreviousGameItem';

export default function GameLog() {
    const { user } = useContext(UserContext)
    const { gameId } = useParams();
    if (!user) return <Navigate to='/login' />
    if (!gameId) return null


    return (
        <div>GameLog</div>
    )
}

