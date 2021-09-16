import * as constants from '../constants';

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
    }
};
 
export default StateReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.SET_MATCHID:
        return {
            ...state,
            matchId: action.data
        };
    case constants.SET_BOARD:
        console.log ("reducer",action)
        //sign:userMark,index:props.index
        boardState = state.boardState;
        boardState[action.data.index]=action.data.sign
        return {
            ...state,
            boardState:boardState
        };
    case constants.SET_LASTMOVE:
        return {
            ...state,
            lastMove:action.data
        };
    case constants.SET_PLAYERS:
        return {
            ...state,
            players:action.data
        };
    default:
        return state;
    }
};