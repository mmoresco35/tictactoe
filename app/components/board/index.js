import React from 'react';
import {
    Alert,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions
  } from 'react-native';
import Square from '../square'
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch} from 'react-redux';
import {reset, setPlayers, setBoard, setLastMove, finish} from '../../actions'
import * as logic from '../../logic'

const { width, height } = Dimensions.get('window');
function Board () {
  //identificamos el modo del usuario para pintar los estilos acordes
  const isDarkMode = useColorScheme() === 'dark';
  //cargamos el estado de redux en una variable con su hook
  const data = useSelector(state=>state)
  //  generamos los dispatch con su hook
  const dispatch = useDispatch();
  // metodo para poblar la flatlist
  const paintSquare = (item) => 
    (
      //definimos los valores que le pasamos a las casillas  para logica de negocio y pintado
      <Square 
      onClick={()=>onClick(item.index)} 
      finished = {data.finished}
      isDarkMode={isDarkMode}
      style={[{
        backgroundColor: !isDarkMode ? Colors.black : Colors.white},
        styles.square
        ]} 
      textStyle={styles.squareText} 
      value={data.boardState[item.index]} 
      index={item.index} 
      players={data.players}
    />
    )
  //metodo para crear una partida nueva
  const onCreateMatch=()=>{
    //obtenemos aleatorio para ver quien empieza
    var order = Math.round(Math.random()*2)
    //reseteamos los datos de redux
    dispatch(reset())
    // si empieza el jugador humano le pedimos que indique con que marca va a jugar
    order==1?Alert.alert(
      "Seleccione su marca", 
      "La partida se inicia con su jugada, seleccione la marca con la que juega", 
      [
        //juega con X se lo pasamos a redux
        { text: "x", onPress: () => dispatch(setPlayers({user:"X", device:"O"})) },
        //juega con O se lo pasamos a redux
        { text: "O", onPress: () => dispatch(setPlayers({user:"O", device:"X"})) }
      ],
      { cancelable: false })
      // si empieza el dispositivo pone su marca en el centro (inicio clasico)
      :dispatch(setBoard({sign:"O",index:4}))
    }
    //metodo para desacer el ultimo movimiento, si hay datos se borra las casillas marcadas desde la ultima jugada del jugador humano y se elimina los datos para evitar fallos si no (inicio de partida o movimiento ya borrado) se informa al jugador
    const undoLastMove=()=>{
      if(data.lastMove.userSquare!=null){
        dispatch(setBoard({sign:"",index:data.lastMove.userSquare}))
        dispatch(setBoard({sign:"",index:data.lastMove.deviceSquare}))
        dispatch(setLastMove({
          userSquare:null,
          deviceSquare:null
          }))
      }else{
        Alert.alert(
          "movimiento no anulable", 
          "El ultimo movimiento no se puede anular'", 
          [
              { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false })
      }
      
    }
    //metodo para ejecutar el bucle de juego cuando el usuario pulsa una casilla
    const onClick = (index)=>{
      //generamos el movimiento
      const move = {sign:data.players.user,index:index};
      // si la casilla esta vacia ejecutamos el movimiento, si no alertamos al usuario del fallo
      (data.boardState[index]=="")?humanMove(move):Alert.alert(
                                              "Error en puslacion", 
                                              "Ha pulsado una casilla ya usada por '"+data.boardState[index]+"'", 
                                              [
                                                  { text: "OK", onPress: () => console.log("OK Pressed") }
                                              ],
                                              { cancelable: false })
  }

  // metodo del bucke de juego, juega el humano y responde la maquina
  const humanMove= (move)=>{
    // ejecutamos el movimiento del humano
    dispatch(setBoard(move))
      //comprobamos si hay resultado de la partida
      if (logic.getWinner(data.boardState)){
        //si hay ejecutamos el fin de partida
        dispatch(finish())
      }else{
        //lanzamos el movimiento del dispositivo con un delay segun requisitos
        setTimeout(function(){
          //pedimos a logic el movimineto a realizar
          let bestindex = logic.bestMove(data.boardState, data.players )
          //ejecutamos el movimiento
            dispatch(setBoard({sign:data.players.device,index:bestindex}));
            //anotamos los movimientos del turno para poder anularlos 
            dispatch(setLastMove({
              userSquare:move.index,
              deviceSquare:bestindex
              }))
              //comprobamos si hay resultado de la partida
              if (logic.getWinner(data.boardState)){
                //si hay ejecutamos el fin de partida
                dispatch(finish())
              }
            },Math.round(Math.random()*1000));
        } 
    }

    //Pintamos el tablero y los botones de rolback de movimiento y reinicio de partida
    return (
      <View>
      <FlatList
      data={data.boardState}
      numColumns={3}
      renderItem={paintSquare}
      style={[{
        backgroundColor: !isDarkMode ? Colors.white : Colors.black},
        styles.board
        ]}/>
      <View style={styles.row}>
        <TouchableOpacity 
          style={[{
            backgroundColor: !isDarkMode ? Colors.white : Colors.black,
            borderColor: !isDarkMode ? Colors.black : Colors.white},
            styles.button
            ]}
          onPress={()=>onCreateMatch()}
          >
            <Text style={[{
              color: !isDarkMode ? Colors.black : Colors.white},
              styles.buttonText
            ]}>Reiniciar Partida</Text>    
          </TouchableOpacity>
        <TouchableOpacity 
          style={[{
            backgroundColor: !isDarkMode ? Colors.white : Colors.black,
            borderColor: !isDarkMode ? Colors.black : Colors.white},
            styles.button
            ]}
          onPress={()=>undoLastMove()}
          >
            <Text 
            style={[{
              color: !isDarkMode ? Colors.black : Colors.white},
              styles.buttonText
            ]}>Deshacer Movimiento</Text>    
          </TouchableOpacity>
        </View>
      </View>
    );
}
// estilos de la aplicacion
const styles = StyleSheet.create({
  board:{
    flexDirection:"row",
    width:width,
    height:width,
  },  
  square:{
    backgroundColor:Colors.white,
    width: width/3,
    height:width/3,
    borderColor:Colors.black,
    borderWidth:5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  squareText:{
    fontSize:width/6
  },
  row:{
    flexDirection:"row",
    marginTop:25
  },
  button:{
    width: (width/2)-10,
    padding: 10,
    borderWidth:2,
    borderRadius:5,
    margin: 5,
    justifyContent:"center",
  },
  buttonText:{
    textAlign: 'center',
  },
  title:{}
  });

export default Board;