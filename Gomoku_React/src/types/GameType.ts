export type GameType = {
    _id: string
    userId: string
    CurrentPlayer: String
    gameOver: Boolean
    winner?: String
    gameArray: number[][]
    gameArray_PlayerOne: number[][]
    gameArray_PlayerTwo: number[][]
    boardSize: number
    createdAt: String
    updatedAt: String
}