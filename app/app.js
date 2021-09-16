/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from '../node_modules/react';
import type {Node} from 'react';
import Board from './components/board'
import Square from './components/square'
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

import { store, persistor } from './store';
import { Provider , useSelector} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const { width, height } = Dimensions.get('window');
const boardState = ["X","O","","","","","","",""]


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const paintSquare = (item) => 
    (           
    <Square style={styles.square} textStyle={styles.squareText} value={item.item} index={item.index}
    />
    )

      console.log (boardState)
  return (
<Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                   }}>
              <Text style={{
                color: isDarkMode ? Colors.white : Colors.black,
              }}>TIC TAC TOE</Text>
              </View>

            <Board></Board>
              {/*<FlatList
              data={boardState}
              numColumns={3}
              renderItem={paintSquare}
              style={{
                backgroundColor: !isDarkMode ? Colors.black : Colors.white,
                flexDirection:"row",
                width:width,
                height:width,
                borderWidth:5,
                borderColor:"black"
              }}/>*/}
            
          </SafeAreaView>
          </PersistGate>
          </Provider>
  );
};



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

export default App;
