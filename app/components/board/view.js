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
import {reset, setPlayers, setBoard, setLastMove} from '../../actions'

const { width, height } = Dimensions.get('window');
function Board (props) {
  const isDarkMode = useColorScheme() === 'dark';
    const data = useSelector(state=>state)
    const dispatch = useDispatch();
    
    const paintSquare = (item) => 
    (           
    <Square style={styles.square} textStyle={styles.squareText} value={data.boardState[item.index]} index={item.index} players={data.players}
    />
    )
    const onCreateMatch=()=>{
      var order = Math.round(Math.random()*2)
      console.log (order)
      dispatch(reset())
      order==1?Alert.alert(
        "Seleccione su marca", 
        "La partida se inicia con su jugada, seleccione la marca con la que juega", 
        [
            { text: "x", onPress: () => dispatch(setPlayers({user:"X", device:"O"})) },
            { text: "O", onPress: () => dispatch(setPlayers({user:"O", device:"X"})) }
        ],
        { cancelable: false })
        :dispatch(setBoard({sign:"O",index:4}))
    }
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


    return (
      <View>
      <FlatList
      data={data.boardState}
      numColumns={3}
      renderItem={paintSquare}
      style={{
        backgroundColor: !isDarkMode ? Colors.black : Colors.white,
        flexDirection:"row",
        width:width,
        height:width,
        borderWidth:5,
        borderColor:"black"
      }}/>
      <View>
        <TouchableOpacity style = {{}}
              onPress={()=>onCreateMatch()}
          >
              <Text /*style={props.textStyle}*/>Reiniciar Partida</Text>    
          </TouchableOpacity>
          <TouchableOpacity style = {{}}
              onPress={()=>undoLastMove()}
          >
              <Text /*style={props.textStyle}*/>Deshacer Movimiento</Text>    
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
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
    }
  });

export default Board;