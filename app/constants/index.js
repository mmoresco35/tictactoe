export const title = "TIC TAC TOE"
//actions
export const SET_MATCHID = 'SET_MATCHID'
export const SET_BOARD = 'SET_BOARD'
export const SET_LASTMOVE = 'SET_LASTMOVE'
export const SET_PLAYERS = 'SET_PLAYERS'
export const RESET = 'RESET'

export const VICTORY_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
