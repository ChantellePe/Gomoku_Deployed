export enum SQUARE_STATUS {
    AVAILABLE = 'AVAILABLE',
    OCCUPIED = 'OCCUPIED'
}

export enum PLAYER {
    PLAYER_ONE = 'Black',
    PLAYER_TWO = 'White',
    TIE = "Game is a draw"

}

export enum PLAYER_MOVE_ACTION {
    SELECT = 'SELECT',
    RESET = 'RESET'
}

export const API_HOST = process.env.REACT_APP_API_HOST || ''