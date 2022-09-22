import { PLAYER_MOVE_ACTION } from '../constants'

export type PlayerMoveType = {
    type: PLAYER_MOVE_ACTION
    payload: number[]
}