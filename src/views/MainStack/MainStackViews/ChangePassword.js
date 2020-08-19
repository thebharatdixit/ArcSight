import * as React from 'react';

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
    Alert,
    Platform
} from 'react-native';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { getDimen } from '../../../dimensions/dimen';
import { getData } from '../../../utils/asyncStore';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';



function ChangePasswordScreen({ navigation }) {

    const [oldPass, setOldPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [accessToken, setAccessToken] = React.useState('')

    getData('userData').then((data) => {
        const userData = JSON.parse(data);
        const listTokens = userData.token;
        setAccessToken(listTokens);
        // console.log('token1', listTokens)
    })

    const changePasswordApiCall = () => {
        
        if (!oldPass) {
            Alert.alert('', 'Please Enter Current Password..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (oldPass.trim() === '') {
            Alert.alert('', 'Please Enter Current Password..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }

        if (!newPass) {
            Alert.alert('', 'Please Enter New Password..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (newPass.trim() === '') {
            Alert.alert('', 'Please Enter New Password..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }

        fetch("http://arc.softwaresolutions.website/api/v1/user/change-password", {
            method: "POST",
            headers: {
                Accept: 'application/json',
               'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`

            },
            body: JSON.stringify({
                current_password: oldPass,
                new_password: newPass
            })
        }).then(res => res.json())
            .then(res => {
                console.log('Change Password', res.message, oldPass, newPass);
                if (res.status) {
                    Alert.alert('', res.message, [{ text: 'OK', onPress: () => 
                    {setOldPass(''),
                    setNewPass('')}
                    }], { cancelable: false })
                } else {
                    console.log('No Reset Password', res.message);
                    Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }
            })
            .catch(err => {
                console.error("error: ", err);
            });

    }

    return (

        <View style={{flex: 1}}>
            <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                }>
                    <Image source={require('../../../assets/icons/3.png')}
                        style={{ height: 25, width: 25 }} />
                </TouchableOpacity>

                <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} />

                    <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                </View>
            </View>
        
        <View style={{flex:0.90, width: '100%', height: '100%', backgroundColor: '#F2F2F2' }}>
           
            <ImageBackground
                source={require('../../../assets/images/Splash.png')}
                style={{ flex: 1, resizeMode: 'contain', }}>

                <View style={{ width: '100%', height: getDimen(0.08), marginTop: getDimen(0), paddingLeft: getDimen(0.03), }}>
                    {/* <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={require('../../../assets/icons/return.png')}
                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                    </TouchableOpacity> */}
                </View>

                <View style={{ flex: 0.85, borderRadius: 0, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: getDimen(0.1), backgroundColor: 'white', borderRadius: 12 }}>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input]}
                            placeholder="Current Password"
                            placeholderTextColor="#8A8A8A"
                            underlineColorAndroid='transparent'
                            onChangeText={(oldPass) => setOldPass(oldPass)}
                            value={oldPass} />
                    </View>
                    <View style={{ height: 1, width: getDimen(0.81), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(-0.002) }}></View>
                    
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input]}
                            placeholder="New Password "
                            placeholderTextColor="#8A8A8A"
                            underlineColorAndroid='transparent'
                            onChangeText={(newPass) => setNewPass(newPass)}
                            value={newPass} />
                    </View>
                    <View style={{ height: 1, width: getDimen(0.81), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(-0.002) }}></View>
                    <Text style={{color:'gray', marginTop:getDimen(0.02), marginLeft: getDimen(0.04), fontSize:getDimen(0.035)}}>6-8 Letters, 1 Capital, 1 Special Character</Text>
                    <TouchableOpacity
                        style={styles.submit}
                        onPress={() => changePasswordApiCall()}
                    >
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: '#FFF', fontSize: getDimen(.055), textAlign: 'center', alignSelf: 'center', fontWeight: 'bold' }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground >
        </View>
     </View>
    )
}

let styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        marginTop: getDimen(.03),
        paddingBottom: 5,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row',
        marginLeft: getDimen(.065),
        marginRight: 25,
    },
    textStyle1: {
        color: 'black',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginTop: getDimen(.045),
        marginLeft: getDimen(.065),
        fontSize: getDimen(.08)
    },
    textStyle2: {
        color: 'black',
        alignSelf: 'flex-start',
        marginTop: getDimen(.01),
        marginLeft: getDimen(.065),
        marginRight: getDimen(.065),
        fontSize: getDimen(.045)
    },
    input: {
        height: 50,
        flex: 10,
        paddingLeft: 10,
        fontSize: 17,
        color: 'black'
    },
    submit: {
        alignSelf: 'center',
        backgroundColor: '#121735',
        height: 50,
        width: Dimensions.get('window').width * 0.65,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        marginTop: getDimen(0.21),
        flexDirection: 'row'
    },
});
export default ChangePasswordScreen;