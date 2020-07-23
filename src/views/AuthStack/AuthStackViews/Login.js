import React, { useEffect } from 'react';

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
    ToastAndroid
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';

// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
function LoginScreen({ navigation }) {



    const [checked, setChecked] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    return (

        <ImageBackground
            source={require('../../../assets/images/bg_1.png')}
            style={{ width: '100%', height: '100%', position: 'absolute' }}>

            <ScrollView style={{ flex: 1, flexDirection: 'column' }}>

                {/* <View style={{ width:'100%',height:60, backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <Image source={require('../../../assets/icons/3.png')}
                    style={{ height: 25, width: 25 }} />

                <Image source={require('../../../assets/images/logo.png')}
                    style={{ height: 55, width: 55 }} />
            </View> */}


                <View style={{ width: '90%', height: getDimen(0.9), backgroundColor: 'white', marginLeft: getDimen(0.05), marginTop: getDimen(0.3), borderRadius: getDimen(0.03), shadowColor: 'black' }}>

                    <View style={{ marginTop: getDimen(-0.1), alignItems: 'center' }}>

                        <Image source={require('../../../assets/icons/2.png')}
                            style={{ height: getDimen(0.2), width: getDimen(0.2) }} />

                    </View>

                    <TextInput
                        keyboardType="default"
                        underlineColorAndroid="#8d8865"
                        placeholderTextColor="#d2d6d5"
                        autoCapitalize="none"
                        placeholder="Email"
                        keyboardType='email-address'
                        style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.05) }}
                    />

                    <TextInput
                        keyboardType="default"
                        underlineColorAndroid="#8d8865"
                        placeholderTextColor="#d2d6d5"
                        autoCapitalize="none"
                        placeholder="Password"
                        secureTextEntry={true}
                        style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.05) }}


                    />

                    <View style={{ marginTop: getDimen(0.08), flexDirection: 'row',alignItems:'center',paddingLeft:getDimen(0.09) }}>

                        <CheckBox color={'#8d8865'}
                            style={{ width: 18, height: 18 }} />

                        <Text style={{ paddingLeft: 12, color: '#8d8865', fontSize: getDimen(0.04) }}>
                            Remember Me
                        </Text>





                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Base Screen')}>

                        <View style={{ alignItems: 'center', marginTop: getDimen(0.02) }}>

                            <Text style={{ backgroundColor: '#121735', color: 'white', paddingLeft: getDimen(0.2), paddingRight: getDimen(0.2), paddingBottom: getDimen(0.03), fontSize: getDimen(0.05), fontWeight: 'bold', paddingTop: getDimen(0.03) }}>
                                LOGIN NOW
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ alignSelf: 'center', marginTop: getDimen(0.06), flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Register Screen')}>
                            <Text style={{ color: '#8d8865', fontSize: getDimen(0.04),paddingRight:getDimen(0.05) }}>
                                Register
                            </Text>
                        </TouchableOpacity>

                        <Text style={{ paddingLeft: getDimen(0.04), alignContent: 'space-around', color: '#d2d6d5', fontSize: getDimen(0.04) }}>
                            Forgot Password?
                        </Text>



                    </View>






                </View>
            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        top: 2,
        width: '100%',
        height: '100%'
    },
    input: {
        height: 50,
        flex: 10,
        paddingLeft: 10,
        fontSize: getDimen(0.045),
        // fontFamily: 'Poppins-Regular',
        color: 'black'
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    inputContainerBottom: {
        borderWidth: 1,
        paddingBottom: 5,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row',
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        marginRight: getDimen(.085)
    },
    forgotContainer: {
        paddingTop: 10,
        paddingRight: 20,
    },
    forgotText: {
        fontSize: 13,
        alignSelf: 'flex-end',
        color: '#F26622',
    },
    textStyle1: {
        color: 'black',
        alignSelf: 'flex-start',
        marginTop: getDimen(.2),
        marginLeft: getDimen(.085),
        fontSize: getDimen(.045)
    },
    textStyle2: {
        color: '#0088DD',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: getDimen(.1),
        // marginLeft: getDimen(.085),
        fontSize: getDimen(.08)
    },
    textStyle3: {
        color: 'black',
        alignSelf: 'flex-start',
        fontStyle: 'italic',
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        fontSize: getDimen(.045)
    },
    body: {
        backgroundColor: 'white',
        // alignItems: "center", 
        // justifyContent: "center",
    },
    itemStyle: {
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        marginRight: getDimen(.085)
    },
});
// const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default LoginScreen;
