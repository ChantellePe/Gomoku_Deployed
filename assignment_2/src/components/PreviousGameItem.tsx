import React from 'react'
import { useNavigate } from 'react-router-dom'

type PreviousGameItemProps = {
    id: number
    date: Date
    winner: string
}

export default function PreviousGameItem(props: PreviousGameItemProps) {

    const { id } = props
    const navigate = useNavigate()

    return (
        <div>PreviousGameItem

            <button onClick={() => navigate(`gamelog/${id}`)}>
                View Game Log
            </button>
        </div >
    )
}
