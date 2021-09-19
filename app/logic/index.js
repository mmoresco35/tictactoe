import * as constants from '../constants/index';
import{Alert} from 'react-native'
//metodo para comprobar si tenemos ganador tras el movimiento
export const getWinner = (board)=> {
    //comprobamos si hay un empate
    if (!board.some(value => value === "")) {
        console.log ("empate")
        //hay un empate
        Alert.alert(
            "Fin de la partida", 
            "La partida ha terminado en empate, Si desea Jugar de nuevo pulse en reiniciar partida", 
            [
                { text: "OK", onPress: () => console.log () }
            ],
            { cancelable: false })
        return true;
    }
    let winner = null;
    //comprobamos si algun jugador tiene tres casllillas rellenas eb alguna de las posibles convinaciones ganadoras (las traemos de constantes)
    for (let i = 0; i < constants.VICTORY_CONDITIONS.length; ++i) {
      let value = board[constants.VICTORY_CONDITIONS[i][0]];
      if (constants.VICTORY_CONDITIONS[i].every(tile => board[tile] === value && board[tile] !== "")) {
        winner = value;
        break;
      }
    }
    if (winner!=null){
        //si tenemos ganador lo informamos
        Alert.alert(
            "Fin de la partida", 
            "La partida ha terminado con victoria del jugador "+winner+", Si desea Jugar de nuevo pulse en reiniciar partida", 
            [
                { text: "OK", onPress: () => console.log () }
            ],
            { cancelable: false })
        return true;
    }
}
//metodo para calcular el mejor movimiento
export const bestMove = (board, players )=> {
    let move = null;
    //segmerntamos el tablero en filas, columnas y diagonales qeuivalentes a las soluciones posibles
    let conditions = [
        [{value:board[0], index:0},{value:board[1], index:1},{value:board[2], index:2}],
        [{value:board[3], index:3},{value:board[4], index:4},{value:board[5], index:5}],
        [{value:board[6], index:6},{value:board[7], index:7},{value:board[8], index:8}],
        [{value:board[0], index:0},{value:board[3], index:3},{value:board[6], index:6}],
        [{value:board[1], index:1},{value:board[4], index:4},{value:board[7], index:7}],
        [{value:board[2], index:2},{value:board[5], index:5},{value:board[8], index:8}],
        [{value:board[0], index:0},{value:board[4], index:4},{value:board[8], index:8}],
        [{value:board[2], index:2},{value:board[4], index:4},{value:board[6], index:6}]
    ]
    //defensa, comprobamos si el usuario va a ganar y respondemos con la jugada que lo evita
    conditions.forEach(condition => {
        var filled = condition.filter(square=>square.value==players.user)
        if(filled.length>1) {
            let square=condition.filter(square=>square.value!=players.user)[0];
            if (square.value!=players.device){
                move= square.index};
        }
    });
    //comprobamos si podemos ganar , si podemos lo hacemos
    if(move == null){
        conditions.forEach(condition => {
        var filled = condition.filter(square=>square.value==players.device)
        if(filled.length=2) {
            let square=condition.filter(square=>square.value!=players.device)[0];
            if (square.value!=players.user){
                move= square.index};
            }
        });
    }
    // si no se da ningun otro caso generamos una jugada aleatoria (esta jugada tiene mas posibilidades de confundir al usuario que una jugada "logica")
    if(move == null){
        let boards = [
            {value:board[0], index:0},{value:board[1], index:1},{value:board[2], index:2},
            {value:board[3], index:3},{value:board[4], index:4},{value:board[5], index:5},
            {value:board[6], index:6},{value:board[7], index:7},{value:board[8], index:8},
        ]
        let options =boards.filter(square=> square.value=="");
        move= options[Math.floor(Math.random()*options.length)].index
    }
    return move;
    
}