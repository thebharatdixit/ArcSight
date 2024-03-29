import React, { Component } from 'react';

import {
    View,
    Platform,
    TextInput,
    Text
} from 'react-native';


export default class CustomText extends Component {

    render() {
        return (
            this.props.numberOfLines ?
                <Text
                    numberOfLines={this.props.numberOfLines}
                    style={[{ fontFamily: this.getFont() }, this.props.style]}
                >{this.props.text}</Text> :
                <Text
                    style={[{ fontFamily: this.getFont() }, this.props.style]}
                >{this.props.text}</Text>
        )

    }
    getFont() {
        var font = 'Poppins-Regular'
        switch (this.props.font) {
            case 'regular':
                font = 'Poppins-Regular'
                break
            case 'bold':
                font = 'Poppins-Bold'
                break
            case 'light':
                font = 'Poppins-Light'
                break
            case 'semiBold':
                font = 'Poppins-SemiBold'
                break
            case 'medium':
                font = 'Poppins-Medium'
                break
            default:
                font = 'Poppins-Regular'
                break
        }
        return font;
    }

}