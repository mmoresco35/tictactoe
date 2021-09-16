import React ,{useState} from 'react';
import {
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setBoard} from '../../actions'

function Square (props) {
    const data = useSelector(state=>state)
    const dispatch = useDispatch();
    const updateBoard = (move)=> {
    dispatch(setBoard(move))
    }
    const humanMove= (move)=>{
        updateBoard(move)
        updateBoard({sign:props.players.device,index:props.index+1})
    }

    const [value, setValue]=useState("");
    (props.value!=value)?setValue(props.value):null
    const onClick = ()=>{
        const move = {sign:props.players.user,index:props.index};
        (value=="")?humanMove(move):Alert.alert(
                                                "Error en puslacion", 
                                                "Ha pulsado una casilla ya usada por '"+value+"'", 
                                                [
                                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                                ],
                                                { cancelable: false })
    }
    return (
        <TouchableOpacity style = {props.style}
            onPress={()=>onClick()}
        >
            <Text style={props.textStyle}>{value}</Text>    
        </TouchableOpacity>
    );
}

export default Square;