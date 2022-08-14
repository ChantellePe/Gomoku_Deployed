import React from 'react'
import { useParams } from 'react-router-dom'
import PreviousGameItem from '../components/PreviousGameItem';

export default function GameLog() {

    const { gameId } = useParams();
    if (!gameId) return null


    return (
        <div>GameLog</div>
    )
}

