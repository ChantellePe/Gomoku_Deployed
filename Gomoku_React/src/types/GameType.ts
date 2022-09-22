export type GameType = {
    _id: string
    userId: string
    currentPlayer: string
    gameOver: Boolean
    winner: string
    gameArray: number[][]
    gameArray_PlayerOne: number[][]
    gameArray_PlayerTwo: number[][]
    boardSize: number
    createdAt: string
    updatedAt: string
}