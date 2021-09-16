import React ,{useState} from 'react';
import {
    SafeAreaView,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions
  } from 'react-native';
import Square from '../square'
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { useSelector} from 'react-redux';
const { width, height } = Dimensions.get('window');
const boardState = ["X","O","","","","","","",""]
function Board (props) {
  const isDarkMode = useColorScheme() === 'dark';
    const data = useSelector(state=>state)
    console.log(data)
    const paintSquare = (item) => 
    (           
    <Square style={styles.square} textStyle={styles.squareText} value={data.boardState[item.index]} index={item.index} players={data.players}
    />
    )
    return (
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