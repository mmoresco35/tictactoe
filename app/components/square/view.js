import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export default class Square extends Component {
    constructor(props) {
        super(props);
    }
    onClick = ()=>{
        console.log (this.props.index)
    }

    render() {
        return (
            <TouchableOpacity style = {this.props.style}
            onPress={this.onClick}
            >
                <Text style={this.props.textStyle}>{this.props.value}</Text>    
            </TouchableOpacity>
        );
    }
}