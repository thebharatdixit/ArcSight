import React, { useEffect, useState } from 'react';


import {
    View, Text, TouchableOpacity, StyleSheet,
    ScrollView,
    ImageBackground,
    Image,
    StatusBar,
    ActivityIndicator,
    Modal,
    Dimensions,
    TextInput,
    ToastAndroid,
    FlatList,
    Alert,
    Share
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { WebView } from "react-native-webview";
import { getDimen } from '../../../dimensions/dimen';


function ThreeSixtyView({ route, navigation }) {


    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <WebView
                style={{  width: '85%', height: getDimen(0.45), alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}
                javaScriptEnabled={true}
                source={{ uri: 'https://www.youtube.com/embed/vhtTlrkz550?rel=0&autoplay=0&showinfo=0&controls=0' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: getDimen(0.02),
        width: getDimen(1)
    },
});

export default ThreeSixtyView;