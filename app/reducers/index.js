import * as constants from '../constants';
import uuid from 'react-native-uuid';
//estado inicial
const initialState = {
    matchId:"",
    boardState:["","","","","","","","",""],
    lastMove:{
        userSquare:null,
        deviceSquare:null
    },
    players:{
        user:"X",
        device:"O"
    },
    finished: false
};
//definicion del reduccer
export default StateReducer = (state = initialState, action) => {
    switch (action.type) {
        //guardamos el movimiento en el estado del tablero
        case constants.SET_BOARD:
            boardState = state.boardState;
            boardState[action.data.index]=action.data.sign
            return {
                ...state,
                boardState:boardState
            };
        // guardamos los movimientos de la ultima ronda
        case constants.SET_LASTMOVE:
            return {
                ...state,
                lastMove:action.data
            };
        // guardamos la definicion de marcas de los usuarios
        case constants.SET_PLAYERS:
            return {
                ...state,
                players:action.data
            };
        //guardamos el fin de la partida (para bloquear las casillas)
        case constants.SET_FINISHED:
            return {
                ...state,
                finished:true
            };
        // restauramos el estado incial y generamos uuid para la partida
        case constants.RESET:
                return {
                    matchId:uuid.v4(),
                    boardState:["","","","","","","","",""],
                    lastMove:{
                        userSquare:null,
                        deviceSquare:null
                    },
                    players:{
                        user:"X",
                        device:"O"
                    },
                    finished: false
                };
        default:
            return state;
    }
};