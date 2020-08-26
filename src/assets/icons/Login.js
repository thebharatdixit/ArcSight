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
    ToastAndroid,
    Alert,
    Platform
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';

// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import ImagePicker from 'react-native-image-picker';
//import loginActions from '../../actions/authAction';
//import loginActions from '../../actions/loginActions';
import { login } from '../../../actions/loginAction';
import { storeData, getData } from '../../../utils/asyncStore';


function LoginScreen({ navigation }) {


    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const [checked, setChecked] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [filePath, setFilePath] = React.useState([])
    const [showLoader, setShowLoader] = React.useState('hide');


    chooseFile = () => {
        var options = {
            title: 'Select Image',
            // customButtons: [
            //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            // ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                //  this.setState({
                //     filePath: source
                // });
                setFilePath(source);
            }
        });
    };
    /// Email Validation
    const validate = (text) => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // alert("Email is Not Correct");
            // this.setState({ email: text })
            setUsername(username);
            return false;
        }
        else {
            setUsername(username);
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
    function validation(userName, password) {
        var emailWithoutSpace = emailWithoutSpaceHandle(userName);
        //console.log(''+userName+'=='+password);
        if (!userName) {
            Alert.alert('', 'Please Enter Email ID..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (userName.trim() === '') {
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
        if (!password) {
            Alert.alert('', 'Please Enter Password..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (password.trim() === '') {
            Alert.alert('', 'Please Enter Password..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }

        let data = {
            "email": userName,
            "password": password,
            "login_device": Platform.OS,
            "notification_token": ""
        }

        login(data).then((response) => {
            if (response.status) {
                storeData('isLogin', 'true');
                storeData('userData', JSON.stringify(response.data));
                setUsername('');
                setPassword('');
                navigation.navigate('Main Stack');
                Alert.alert('' + response.message, [{
                    text: 'OK', onPress: () => {
                        setUsername('')
                        setPassword('')
                    }
                }], { cancelable: false });
            }
            else {
                Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }

        })

    }

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <ImageBackground
                source={require('../../../assets/images/bg_1.png')}
                style={{ width: '100%', height: '100%', position: 'absolute' }}>

                <ScrollView style={{ flex: 1, flexDirection: 'column' }}>

                    <View style={{ width: '90%', height: '80%', backgroundColor: 'white', marginLeft: getDimen(0.05), marginTop: getDimen(0.3), borderRadius: getDimen(0.03), shadowColor: 'black' }}>
                        {/* <View style={{ width: '90%', height: getDimen(0.9), backgroundColor: 'white', marginLeft: getDimen(0.05), marginTop: getDimen(0.3), borderRadius: getDimen(0.03), shadowColor: 'black' }}> */}

                        <View style={{ marginTop: getDimen(-0.1), alignItems: 'center' }}>
                            <TouchableOpacity
                            // onPress={() => Alert.alert('Show gallery!!')}
                            // onPress={chooseFile.bind(this)}
                            >
                                <Image source={require('../../../assets/icons/2.png')}
                                    style={{ height: getDimen(0.2), width: getDimen(0.2) }} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            {/* <Image
                                source={require('../../../assets/images/user.png')}
                                style={styles.ImageStyle}
                            /> */}
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#8A8A8A"
                                underlineColorAndroid='transparent'
                                onChangeText={(val) => setUsername(val)}
                                value={username} />
                        </View>

                        <View style={styles.inputContainer}>
                            {/* <Image
                                source={require('../assets/images/password.png')}
                                style={styles.ImageStyle}
                            /> */}
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#8A8A8A"
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(val) => setPassword(val)}
                                value={password} />
                        </View>

                        <View style={{ height: getDimen(0.085), marginTop: getDimen(0.025), alignItems: "center", marginLeft: getDimen(.085), marginRight: getDimen(.025), flexDirection: 'row' }}>
                            <CheckBox
                                onPress={() => setChecked(!checked)}
                                checked={checked} color="#8d8865" />
                            <Text style={{ marginLeft: 20, color: '#8d8865', fontSize: getDimen(0.04) }}>Remember Me</Text>
                        </View>

                        <TouchableOpacity onPress={() => validation(username, password)}>

                            <View style={{ alignItems: 'center', marginTop: getDimen(0.08) }}>

                                <Text style={{
                                    backgroundColor: '#121735', color: 'white', paddingLeft: getDimen(0.2),
                                    paddingRight: getDimen(0.2), paddingBottom: getDimen(0.03), fontSize: getDimen(0.05), fontWeight: 'bold', paddingTop: getDimen(0.03)
                                }}>
                                    LOGIN NOW
                        </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ alignSelf: 'center', marginTop: getDimen(0.06), flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Register Screen')}>
                                <Text style={{ color: '#8d8865', fontSize: getDimen(0.04), paddingRight: getDimen(0.05) }}>
                                    Register
                        </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>
                                navigation.navigate('ForgotPassword Screen')
                            }>
                                <Text style={{ paddingLeft: getDimen(0.04), alignContent: 'space-around', color: 'gray', fontSize: getDimen(0.04) }}>
                                    Forgot Password?
                    </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </ScrollView>

            </ImageBackground>
        </View>

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
    inputContainer: {
        marginTop: 10,
        borderWidth: 1,
        marginLeft: 25,
        marginRight: 25,
        paddingBottom: -5,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row'
    },
    input: {
        height: 50,
        flex: 10,
        paddingLeft: 10,
        fontSize: 14,
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