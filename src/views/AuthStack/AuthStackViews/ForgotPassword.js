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
import { forgotPassword } from '../../../actions/forgotPasswordAction'

function ForgotPasswordScreen({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [showLoader, setShowLoader] = React.useState('hide');
    /// Email Validation
    const validate = (text) => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // alert("Email is Not Correct");
            // this.setState({ email: text })
            setEmail(text);
            return false;
        }
        else {
            setEmail(text);
            // alert("Email is Correct");
            return true
        }
    }

    const emailWithoutSpaceHandle = (value) => {

        console.log('whitespace: ' + value + ':');
        var withOutSpaceVal = value.replace(/\s/g, '');
        console.log('withoutspace: ' + withOutSpaceVal + ':');
        return withOutSpaceVal;
    }



    const forgotPasswordApiCall = () => {

        var emailWithoutSpace = emailWithoutSpaceHandle(email);

        if (!email) {
            Alert.alert('', 'Please Enter Email ID..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (email.trim() === '') {
            Alert.alert('', 'Please Enter Email ID..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }

        if (validate(emailWithoutSpace)) {
            // console.log('email is correct.');
        }
        else {
            Alert.alert('', 'Email Id is Not Correct', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }

        // let data = {
        //     "email": email
        // }

        // forgotPassword(data).then((response) => {
        //     if (response.status) {
        //         Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
        //         setEmail('')
        //     }
        //     else {
        //         Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
        //     }

        // })
        setShowLoader('')
        fetch("http://arc.softwaresolutions.website/api/v1/forgot-password", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                email: email,
            })
        }).then(res => res.json())
            .then(res => {
                setShowLoader('hide')
                console.log('Reset Password', res.message, email);
                if (res.status) {
                    console.log('Reset Password', res.message);
                    Alert.alert('', res.message, [{ text: 'OK', onPress: () => setEmail('') }], { cancelable: false })
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

        <View style={{ width: '100%', height: '100%', backgroundColor: '#F2F2F2' }}>
            <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require('../../../assets/icons/back.png')}
                        style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                </TouchableOpacity>

                <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    {/* <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} /> */}

                    <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                </View>


            </View>
            <ImageBackground
                source={require('../../../assets/images/Splash.png')}
                style={{ flex: 1, resizeMode: 'contain', }}>

                <View style={{ flex: 0.70, borderRadius: 0, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: getDimen(0.2), backgroundColor: 'white', borderRadius: 12 }}>

                    {/* <Text style={styles.textStyle2}>Please enter your registered email ID</Text> */}
                    <View style={styles.inputContainer}>

                        <TextInput
                            style={[styles.input]}
                            placeholder="Enter your email"
                            placeholderTextColor="#8A8A8A"
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => setEmail(email)}
                            value={email} />
                    </View>
                    <View style={{ height: 1, width: getDimen(0.81), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(-0.002) }}></View>
                    <TouchableOpacity
                        style={styles.submit}
                        onPress={() => forgotPasswordApiCall()}
                    >
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: '#FFF', fontSize: getDimen(.055), textAlign: 'center', alignSelf: 'center', fontWeight: 'bold' }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground >
            {
                (showLoader === '') ?
                    <View
                        style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%' }}
                    >
                        <ActivityIndicator size="large" color="#2b5f9c" style={{ position: 'absolute', rotation: 180 }} />
                    </View>
                    :
                    null
            }
        </View>
    )
}

let styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        marginTop: getDimen(.1),
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
        marginTop: getDimen(0.2),
        flexDirection: 'row'
    },
});
export default ForgotPasswordScreen;