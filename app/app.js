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
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { store, persistor } from './store';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  //generamos las capas de redux y persist y pintamos el tablero
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
                fontSize:50,
                margin:15,
                textAlign:"center"
              }}>TIC TAC TOE</Text>
              </View>
            <Board/>
          </SafeAreaView>
        </PersistGate>
      </Provider>
  );
};

export default App;
