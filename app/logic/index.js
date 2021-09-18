import * as constants from '../constants/index';



export const getWinner = (board)=> {
    if (!board.some(value => value === "")) {
      return DRAW;
    }
    console.log (constants);
    let winner = null;
    for (let i = 0; i < constants.VICTORY_CONDITIONS.length; ++i) {
      let value = board[constants.VICTORY_CONDITIONS[i][0]];

      if (constants.VICTORY_CONDITIONS[i].every(tile => board[tile] === value && board[tile] !== "")) {
        winner = value;
        break;
      }
    }

    return winner;
}

export const bestMove = (board, players )=> {
    //segmerntamos el tablero en filas columnas y diagonales qeuivalentes a las soluciones posibles
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

    //defensa, comprobamso si el usuario va a ganar y respondemos
    conditions.forEach(condition => {
        if(condition.filter(square=>square.value==players.user).length=2) {
            let square=condition.filter(square=>square.value!=players.user)[0];
            if (square.value!=players.device)return square.index;
        }
    });

    //ataque vemos si podemos ganar
    conditions.forEach(condition => {
        if(condition.filter(square=>square.value==players.device).length=2) {
            let square=condition.filter(square=>square.value!=players.device)[0];
            if (square.value!=players.user)return square.index;
        }
    });

    // si no retornamos una casilla aleatoria
    let boards = [
        {value:board[0], index:0},{value:board[1], index:1},{value:board[2], index:2},
        {value:board[3], index:3},{value:board[4], index:4},{value:board[5], index:5},
        {value:board[6], index:6},{value:board[7], index:7},{value:board[8], index:8},
    ]
    let options =boards.filter(square=> square.value=="");
    return options[Math.floor(Math.random()*options.length)].index
    
}