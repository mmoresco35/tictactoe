import * as constants from '../constants';


//accion para guardar los movimientos
export const setBoard = (data) => {
    return { type: constants.SET_BOARD, data };
};
// accion para guardr los datos necesarios para desacer el ultimo ciclo de juego
export const setLastMove = (data) => {
    return { type: constants.SET_LASTMOVE, data };
};
//accon para definir las  marcas de los jugadores
export const setPlayers = (data) => {
    return { type: constants.SET_PLAYERS, data };
};
//accion para resetear los datos e iniciar nueva partida
export const reset = () => {
    return { type: constants.RESET };
};
//accion para controlar si se ha finalizado la partida actual
export const finish = () => {
    return { type: constants.SET_FINISHED };
};

