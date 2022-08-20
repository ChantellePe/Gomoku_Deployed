
import { PLAYER_MOVE_ACTION, PLAYER } from '../constants'

export type PlayerMoves = {
    type: PLAYER_MOVE_ACTION
    player: PLAYER
    payload: number[]
}