import * as constants from '../constants';

export const setMatchID = (data) => {
    return { type: constants.SET_MATCHID, data };
};

export const setBoard = (data) => {
    return { type: constants.SET_BOARD, data };
};

export const setLastMove = (data) => {
    return { type: constants.SET_LASTMOVE, data };
};
export const setPlayers = (data) => {
    return { type: constants.SET_PLAYERS, data };
};