/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from '../node_modules/react';
import type {Node} from 'react';
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const { width, height } = Dimensions.get('window');
const boardState = ["X","O","","","","","","",""]
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const renderSquares =(value)=>{
    <Square style={styles.square}/*value={value} key={index}*//>
  }
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const paintSquare = (item) => 
    (           
    <Square style={styles.square} textStyle={styles.squareText} value={item.item} index={item.index}
    />
  )
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={{
            color: isDarkMode ? Colors.white : Colors.black,
          }}>
            TIC TAC TOE
          </Text>

      </View>

      <FlatList
        data={boardState}
        numColumns={3}
        renderItem={paintSquare}
          style={{
            backgroundColor: !isDarkMode ? Colors.black : Colors.white,
            flexDirection:"row",
            width:width,
            height:width,
          }}/>
    </SafeAreaView>
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
