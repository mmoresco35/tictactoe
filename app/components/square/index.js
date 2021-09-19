import React from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
//pintado de las casillas
function Square (props) {
    return (
        <TouchableOpacity 
            style = {[{backgroundColor: !props.isDarkMode ? Colors.black : Colors.white},props.style]}
            onPress={()=>!props.finished?props.onClick():null}
        >
            <Text style={[{backgroundColor: !props.isDarkMode ? Colors.white : Colors.black},props.textStyle]}>{props.value}</Text>    
        </TouchableOpacity>
    );
}

export default Square;