import React, { Component } from 'react';
import {

    TextInput,
    StyleSheet,
    ScrollView,
    ImageBackground,
    View,
    Image,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView,
    Alert,
    Platform
} from 'react-native';
import CustomText from '../common/CustomText'

import { storeData, getData } from '../utils/asyncStore';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils/Utility'
import { Container, Button, Picker, Icon, Tab, Tabs, ScrollableTab, Form, Label, Item, Input, Content, Card, CardItem, Header } from 'native-base';
import { SafeAreaView, NavigationActions, StackActions } from 'react-navigation';
import { getDimen } from '../dimensions/dimen';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import Modal from "react-native-modal";
import { login } from '../actions/loginAction';
import { fbSignup } from '../actions/signUpAction';
// import messaging from '@react-native-firebase/messaging';
// import { getFCMToken } from './fcmTokenClass';
// import { firebase } from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            selected2: undefined,
            selected3: undefined,
            user: '',
            isAuthenticating: false,
            password: '',
            isModalVisible: false,
            secutiry: true
        }
    }

    moveToNextScreen = () => {
        this.props.navigation.navigate("SelectionScreen");
    }

    makeLogin() {

    }

    componentDidMount() {
        // startAuthentication()
        SplashScreen.hide();
        // this.registerAppWithFCM();
        // this.requestPermission();
        // this.requestPermissionForNotification();


    }

    sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    async requestPermissionForNotification() {
        try {
            const permission = await requestNotifications(["alert", "badge", "sound"]);
            if (permission.status === "granted") {
                setupNotification();
            }
        } catch (e) {
            console.log(e)
        }
    };


    async setupNotification() {
        try {

            await sleep(5000)
            // TODO no need token for now, Will be used for future releases 
            const enabled = await firebase.messaging().hasPermission();
            await requestNotifications(['alert', 'badge', 'sound']);
            await firebase.messaging().registerForRemoteNotifications();
            const token = await firebase.messaging().getToken();

            firebase.messaging().onMessage(async (remoteMessage) => {

            });
        } catch (e) {
            console.log(e)

        }
    }

    async registerAppWithFCM() {
        await messaging().registerForRemoteNotifications();
    }

    async requestPermission() {
        const granted = await messaging().requestPermission();

        if (granted) {
            //   console.log('User granted messaging permissions!');
            const tokenFcm = await messaging().getToken();
            //    console.log('final fcmtoken is..: ' + tokenFcm);
            getFCMToken().then((token) => {

                //     console.log('final fcmtoken is: ' + token);
                if (token) {
                    storeData('fcmToken', token);
                }



            });
        } else {
            console.log('User declined messaging permissions :(');
        }
    }

    submitLogin() {
        if (!this.state.email) {
            Alert.alert('', 'Please Enter Email Id..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            //this.setState({ error: 'Please Enter Email Id..' })
            return;
        }
        if (this.state.email.trim() === '') {
            Alert.alert('', 'Please Enter Email Id..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            //this.setState({ error: 'Please Enter Email Id..' })
            return;
        }
        if (!this.state.password) {
            Alert.alert('', 'Please Enter Password..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });

            //this.setState({ error: 'Please Enter password..' })
            return;
        }
        if (this.state.password.trim() === '') {
            Alert.alert('', 'Please Enter Password..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });

            //this.setState({ error: 'Please Enter password..' })
            return;
        }
        let data = {
            "username": this.state.email,
            "password": this.state.password,
            "device_type": Platform.OS,
            "device_token": ""
        }

        this.setState({ isAuthenticating: true })
        login(this.props.dispatch, data).then((response) => {
            this.setState({ isAuthenticating: false })
            if (response) {
                //     console.log("Login RESPONSE :: " + JSON.stringify(response))
                if (response.status) {
                    // this.setState({ isAuthenticating: false })
                    //     console.log("QRCODE " + response.travellerLoginData.qrcode_url)
                    storeData('isLogin', 'true');
                    storeData('user', JSON.stringify(response.travellerLoginData));
                    storeData('accessToken', response.travellerLoginData.access_token);
                    storeData('role_id', response.travellerLoginData.role_id);

                    if (response.travellerLoginData.role_id === "3") {
                        this.props.navigation.navigate('AppVendor');
                    }
                    else {
                        storeData('qrCode', response.travellerLoginData.qrcode_url);
                        if (response.airportDetail && response.airportDetail.length > 0) {
                            storeData('selectedAirport', JSON.stringify(response.airportDetail[0]))
                            storeData('selectedTerminalId', response.airportDetail[0].terminal_id)
                            storeData('travel_type_id', response.airportDetail[0].travel_type_id)
                            storeData('selectedType', response.airportDetail[0].travel_type_id);
                            // if(response.travellerLoginData.role_id === "4"){
                            //     this.props.navigation.navigate('AppVendor');
                            // }
                            // else
                            // {
                            this.props.navigation.navigate('App');
                            // }


                        } else {
                            this.props.navigation.navigate('Airport');
                        }
                    }
                    // this.props.navigation.navigate('Home');

                    //this.props.dispatch(restart_feed({ key: 'Home', type: 'home' }))

                    //  response.userLoginData
                } else {
                    // Alert.alert('',response.message,[{text: 'OK', onPress: () => console.log('OK Pressed')}],{cancelable: false});
                    setTimeout(function () {

                        //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
                        Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });

                    }, 1000);

                    // this.setState({ error: response.message })
                }
            } else {
                // this.setState({ isAuthenticating: false })

                Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                this.setState({ error: 'Faliure...' })
            }
        });

        //this.props.dispatch(restart_feed({ key: 'Home', type: 'home' }))
    }

    async makeFbLogin() {
        let result;
        let data;
        try {
            // this.setState({ showLoadingModal: true });
            // LoginManager.setLoginBehavior('NATIVE_ONLY');
            result = await LoginManager.logInWithPermissions(['public_profile']);
        } catch (nativeError) {
            try {
                // LoginManager.setLoginBehavior('WEB_ONLY');
                result = await LoginManager.logInWithPermissions(['public_profile']);
            } catch (webError) {
                // show error message to the user if none of the FB screens
                // did not open
            }
        }
        // handle the case that users clicks cancel button in Login view
        if (result.isCancelled) {
            console.log("Login cancelled");
        } else {
            // Create a graph request asking for user information
            const accessData = await AccessToken.getCurrentAccessToken();
            console.log("Facebook Login Details", JSON.stringify(accessData));
            const response = await fetch(`https://graph.facebook.com/me?access_token=${accessData.accessToken}&fields=id,name,email,picture.type(large)`);
            const userInfo = await response.json();
            console.log("Facebook all Login Details", JSON.stringify(userInfo));
            // this.setState({ userInfo });
            //  console.log("Login success", accessData.userID);
            var strUserInfo = JSON.stringify(userInfo);
            storeData('fbData', strUserInfo);
            this.fbLoginIntegration()
        }

    }

    fbLoginIntegration() {

        getData('fbData').then((fbData) => {
            var LoginData = JSON.parse(fbData);
            var email = "";
            if(!(LoginData.email === null)){
                email = LoginData.email;
            }
            let data = {
                "fb_id": LoginData.id,
                "name": LoginData.name,
                "email": email,
                "type": "facebook",
                "device_type": Platform.OS,
                "device_token": "hdskjdkjheuyuriewhgewuiwyewehjewuiyew",
            }

            fbSignup(this.props.dispatch, data).then((response) => {
                if (response) {
                    console.log("REGISTER RESPONSE fbSignup :: " + JSON.stringify(response))
                    //this.setState({ hotelList: response.hostelList })
                    this.setState({ isLoader: false })
                    if (response.status) {
                        Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                        storeData('isLogin', 'true');
                        storeData('user', JSON.stringify(response.travellerLoginData));
                        storeData('accessToken', response.travellerLoginData.access_token);
                        this.props.navigation.navigate('SelectAirport');
                        // this.props.navigation.goBack();
                        // this.props.dispatch(pop_feed())
                    } else {
                        this.setState({ error: response.message })
                        Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                    }
                } else {
                    this.setState({ error: 'Faliure...' })
                }
            });
        })
    }

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    onValueChange3(value) {
        this.setState({
            selected3: value
        });
    }

    toggleModal = (value) => {

        this.setState({ isModalVisible: !this.state.isModalVisible });

        // this.props.dispatch(this.props.showResetModal(value))
    };

    _callForgotPassword() {
    }



    render() {
        //  console.log("VALUE : " + JSON.stringify(this.props.isLogin));
        return (
            // <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'transparent' }} behavior="padding" enabled>
            <View style={{ flex: 1, backgroundColor: 'transparent' }} >

                {Platform.OS === 'ios' ?
                    <View style={{
                        width: '100%', height: '100%', alignItems: 'center',
                        justifyContent: 'center', flexDirection: 'column',
                        flex: 1, backgroundColor: 'transparent'
                    }}>
                        <Image source={require('../assets/images/login-bg.png')} style={styles.backgroundImageMain} />
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{
                                width: '100%', backgroundColor: 'transparent', position: 'absolute', top: 0
                            }} >


                            <View style={{ width: '100%', height: Dimensions.get('window').height, backgroundColor: 'transparentgray' }}>

                                {/* <Spinner visible={this.state.isAuthenticating} /> */}
                                <Image style={{
                                    width: '60%',
                                    height: '30%',
                                    alignSelf: 'center',
                                    marginTop: '10%',
                                    resizeMode: 'contain', backgroundColor: 'transparent'
                                }} source={require('../assets/images/logo.png')} />
                                <View style={styles.inputs}>

                                    <View style={styles.inputContainer}>
                                        <Image
                                            source={require('../assets/images/user.png')}
                                            style={styles.ImageStyle}
                                        />
                                        <TextInput
                                            style={[styles.input]}
                                            placeholder="Mobile Number / Email ID"
                                            placeholderTextColor="#8A8A8A"
                                            underlineColorAndroid='transparent'
                                            onChangeText={(email) => this.setState({ email })}
                                            value={this.state.email} />
                                    </View>
                                    <View style={styles.inputContainerBottom}>
                                        <Image
                                            source={require('../assets/images/password.png')}
                                            style={styles.ImageStyle}
                                        />
                                        {this.state.secutiry ?
                                            <TextInput
                                                secureTextEntry={true}
                                                style={[styles.input, styles.whiteFont]}
                                                placeholder="***********"
                                                placeholderTextColor="#8A8A8A"
                                                onChangeText={(password) => this.setState({ password })}
                                                value={this.state.password} /> :
                                            <TextInput
                                                secureTextEntry={false}
                                                style={[styles.input, styles.whiteFont]}
                                                placeholder="***********"
                                                placeholderTextColor="#8A8A8A"
                                                onChangeText={(password) => this.setState({ password })}
                                                value={this.state.password} />
                                        }

                                        <TouchableOpacity
                                            style={{ alignSelf: 'center' }}
                                            onPress={() => this.setState({ secutiry: !this.state.secutiry })}>

                                            {this.state.secutiry ?
                                                <Image
                                                    source={require('../assets/images/vision.png')}
                                                    style={{
                                                        padding: 10,
                                                        margin: 5,
                                                        height: 25,
                                                        width: 25,
                                                        resizeMode: 'stretch',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        alignSelf: 'center',
                                                        tintColor: 'gray'
                                                    }}
                                                />
                                                :
                                                <Image
                                                    source={require('../assets/images/vision2.png')}
                                                    style={{
                                                        padding: 10,
                                                        margin: 5,
                                                        height: 25,
                                                        width: 25,
                                                        resizeMode: 'stretch',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        alignSelf: 'center',
                                                        tintColor: 'gray'
                                                    }}
                                                />
                                            }

                                        </TouchableOpacity>

                                        {/* <TouchableOpacity style={styles.forgotContainer}>
                                    <Image
                                        source={require('../assets/images/password.png')}
                                        style={styles.ImageStyle}
                                    />
                                </TouchableOpacity> */}
                                    </View>

                                    <TouchableOpacity
                                        style={styles.forgotContainer}
                                        onPress={() => this.props.navigation.navigate('ForgotPass1')}>
                                        <CustomText font={'light'} text={'Forgot your password?'} style={styles.forgotText} />

                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={styles.signin}
                                        onPress={() => this.submitLogin()}>
                                        <CustomText font={'regular'} text={'Login'} style={styles.signinText} />

                                    </TouchableOpacity>

                                    <View style={styles.signinFbView}>
                                        <TouchableOpacity
                                            style={styles.signinFb}
                                            onPress={() => {
                                                this.makeFbLogin();

                                            }}>

                                            <Image
                                                style={{ height: 50, width: Dimensions.get('window').width * .7, resizeMode: 'contain' }}
                                                source={require('../assets/images/btn-fb.png')}

                                            />

                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.signup}
                                        onPress={() => this.props.navigation.navigate('Register')}>
                                        <CustomText font={'regular'} text={'  Register '} style={{ color: 'black' }} />

                                    </TouchableOpacity>
                                </View>




                            </View>

                            {/* </ImageBackground> */}
                        </ScrollView>
                        <Modal isVisible={this.state.isModalVisible} animationType="slide" transparent={true} onRequestClose={() => { Alert.alert('Modal has been closed.'); }}>
                            <TouchableOpacity onPress={() => this.toggleModal()} style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <View borderRadius={5} style={{ height: hp('25%'), width: wp('80%'), backgroundColor: 'white' }}>
                                            <Form >
                                                <Item
                                                    style={{ marginTop: 15 }}
                                                    stackedLabel>
                                                    <Label style={{ color: 'black' }}>Enter Email</Label>
                                                    <Input
                                                        fontSize={12}
                                                        autoCapitalize='none'
                                                        onChangeText={(text) => this.props.setEmail(text)}
                                                        value={this.props.email}
                                                        placeholderTextColor={'#DFDFDF'}
                                                        placeholder="Tap to Email" />
                                                </Item>

                                            </Form>

                                            <Button
                                                width={wp('80%')}
                                                borderRadius={5}
                                                style={{
                                                    alignSelf: 'center', width: '80%', backgroundColor: '#008FFE', marginBottom: 15, alignItems: 'center', marginTop: 20
                                                    , justifyContent: 'center'

                                                }} onPress={() => {
                                                    this._callForgotPassword();
                                                    // this.props.dispatch(this.props.login())
                                                }}>
                                                <CustomText font={'regular'} text={'Submit'} style={{ color: 'white' }} />

                                            </Button>

                                        </View>
                                    </View>
                                </KeyboardAvoidingView>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    : <View style={{
                        width: '100%', height: '100%', alignItems: 'center',
                        justifyContent: 'center', flexDirection: 'column',
                        flex: 1, backgroundColor: 'transparent'
                    }}>
                        <Image source={require('../assets/images/login-bg.png')} style={{
                            flex: 1,
                            resizeMode: 'contain', // or 'stretch'
                        }} />
                        <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                            <ScrollView style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                                <View style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 50 }}>
                                    <Image style={{
                                        width: Dimensions.get('window').width * .7,
                                        height: Dimensions.get('window').height * .3,
                                        alignSelf: 'center',
                                        resizeMode: 'contain', backgroundColor: 'transparent'
                                    }} source={require('../assets/images/logo.png')} />

                                </View>
                                <View style={styles.inputs}>

                                    <View style={styles.inputContainer}>
                                        <Image
                                            source={require('../assets/images/user.png')}
                                            style={styles.ImageStyle}
                                        />
                                        <TextInput
                                            style={[styles.input]}
                                            placeholder="Mobile Number / Email ID"
                                            placeholderTextColor="#8A8A8A"
                                            underlineColorAndroid='transparent'
                                            onChangeText={(email) => this.setState({ email })}
                                            value={this.state.email} />
                                    </View>
                                    <View style={styles.inputContainerBottom}>
                                        <Image
                                            source={require('../assets/images/password.png')}
                                            style={styles.ImageStyle}
                                        />
                                        {this.state.secutiry ?
                                            <TextInput
                                                secureTextEntry={true}
                                                style={[styles.input, styles.whiteFont]}
                                                placeholder="***********"
                                                placeholderTextColor="#8A8A8A"
                                                onChangeText={(password) => this.setState({ password })}
                                                value={this.state.password} /> :
                                            <TextInput
                                                secureTextEntry={false}
                                                style={[styles.input, styles.whiteFont]}
                                                placeholder="***********"
                                                placeholderTextColor="#8A8A8A"
                                                onChangeText={(password) => this.setState({ password })}
                                                value={this.state.password} />
                                        }


                                        <TouchableOpacity
                                            style={{ alignSelf: 'center' }}
                                            onPress={() => this.setState({ secutiry: !this.state.secutiry })}>
                                            {this.state.secutiry ?
                                                <Image
                                                    source={require('../assets/images/vision.png')}
                                                    style={{
                                                        padding: 10,
                                                        margin: 5,
                                                        height: 25,
                                                        width: 25,
                                                        resizeMode: 'stretch',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        alignSelf: 'center',
                                                        tintColor: 'gray'
                                                    }}
                                                />
                                                :
                                                <Image
                                                    source={require('../assets/images/vision2.png')}
                                                    style={{
                                                        padding: 10,
                                                        margin: 5,
                                                        height: 25,
                                                        width: 25,
                                                        resizeMode: 'stretch',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        alignSelf: 'center',
                                                        tintColor: 'gray'
                                                    }}
                                                />
                                            }

                                        </TouchableOpacity>

                                    </View>

                                    <TouchableOpacity
                                        style={styles.forgotContainer}
                                        onPress={() => this.props.navigation.navigate('ForgotPass1')}>
                                        <CustomText font={'light'} text={'Forgot your password?'} style={styles.forgotText} />

                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={styles.signin}
                                        onPress={() => this.submitLogin()}>
                                        <CustomText font={'regular'} text={'Login'} style={styles.signinText} />

                                    </TouchableOpacity>

                                    <View style={styles.signinFbView}>
                                        <TouchableOpacity
                                            style={styles.signinFb}
                                            onPress={() => {
                                                this.makeFbLogin();

                                            }}>

                                            <Image
                                                style={{ height: 50, width: Dimensions.get('window').width * .7, resizeMode: 'contain' }}
                                                source={require('../assets/images/btn-fb.png')}

                                            />

                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 20
                                        }}
                                        onPress={() => this.props.navigation.navigate('Register')}>
                                        <CustomText font={'regular'} text={'Don\'t have an account?'} style={{ color: 'black' }}> </CustomText>
                                        <CustomText style={styles.orangeFont} font={'semiBold'} text={'Register'} />
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>

                        </View>

                        <Modal isVisible={this.state.isModalVisible} animationType="slide" transparent={true} onRequestClose={() => { Alert.alert('Modal has been closed.'); }}>
                            <TouchableOpacity onPress={() => this.toggleModal()} style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <View borderRadius={5} style={{ height: hp('25%'), width: wp('80%'), backgroundColor: 'white' }}>
                                            <Form >
                                                <Item
                                                    style={{ marginTop: 15 }}
                                                    stackedLabel>
                                                    <Label style={{ color: 'black' }}>Enter Email</Label>
                                                    <Input
                                                        fontSize={12}
                                                        autoCapitalize='none'
                                                        onChangeText={(text) => this.props.setEmail(text)}
                                                        value={this.props.email}
                                                        placeholderTextColor={'#DFDFDF'}
                                                        placeholder="Tap to Email" />
                                                </Item>

                                            </Form>

                                            <Button
                                                width={wp('80%')}
                                                borderRadius={5}
                                                style={{
                                                    alignSelf: 'center', width: '80%', backgroundColor: '#008FFE', marginBottom: 15, alignItems: 'center', marginTop: 20
                                                    , justifyContent: 'center'

                                                }} onPress={() => {
                                                    this._callForgotPassword();
                                                    // this.props.dispatch(this.props.login())
                                                }}>
                                                <CustomText font={'regular'} text={'Submit'} style={{ color: 'white' }} />

                                            </Button>

                                        </View>
                                    </View>
                                </KeyboardAvoidingView>
                            </TouchableOpacity>
                        </Modal>
                    </View>}

            </View >
            // </SafeAreaView>
        );


    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        top: 2,
        width: '100%',
        height: '100%'
    },
    backgroundImageMain: {
        flex: 1,
        resizeMode: 'contain', // or 'stretch'
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
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
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginTop: getDimen(.045),
        marginLeft: getDimen(.085),
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
        // backgroundColor: Colors.white,
        // alignItems: "center", 
        justifyContent: "center",
    },
    itemStyle: {
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        marginRight: getDimen(.085)
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .4,
        backgroundColor: 'transparent'
    },
    headerIconView: {
        width: 150,
        height: 80
    },
    mark: {
        width: '80%',
        height: 80,
        alignSelf: 'center',
        marginTop: 30,

    },
    headerTitleView: {
        flexDirection: 'row',
    },
    appTitle: {
        color: 'rgba(120, 216, 194, 1)',
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 32,
    },
    appTitleExtra: {
        color: 'rgba(240, 145, 136, 1)',
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 32,
    },
    errorText: {
        color: '#FF3366',
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 15,
    },
    inputs: {
        paddingTop: 20,
        paddingBottom: 10,
        flex: .40, backgroundColor: 'transparent'
    },
    signinView: {
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: 'transparent'
    },
    signinFbView: {
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20
    },
    signin: {
        alignSelf: 'center',
        backgroundColor: '#F6512B',
        height: 50,
        width: Dimensions.get('window').width * .7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginTop: 20
    },
    signinFb: {
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#3B599A',
        height: 50,
        width: Dimensions.get('window').width * .7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    signinText: {
        color: '#FFF',

    },
    signinText2: {
        color: '#FFF',
        flex: 0.70,
    },
    signup: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    inputPassword: {
        width: 25,
        height: 25,
    },
    imageContainer: {
        paddingLeft: 20,
        paddingRight: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputUsername: {
        width: 25,
        height: 25,
    },
    inputContainer: {
        borderWidth: 1,
        paddingBottom: 5,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row',
        marginLeft: 25,
        marginRight: 25,
        marginTop: -20
    },
    inputContainerBottom: {
        borderWidth: 1,
        paddingBottom: 5,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row',
        marginLeft: 25,
        marginRight: 25,
    },
    input: {
        height: 50,
        flex: 10,
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: 'black'
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
    greyFont: {
        color: '#D8D8D8'
    },
    whiteFont: {
        color: 'black'
    },
    blueFont: {
        color: '#2B5F9C'
    },
    orangeFont: {
        color: '#F26622',
        marginLeft: 5
    },
    margin: {
        marginTop: 50
    }
});

function mapStateToProps(state) {

    // let authApiCall = state.auth || {};
    // const isError = authApiCall.isError || false;
    // const loginFailure = authApiCall.loginFailure;

    // let returnValue = {
    //     isUnauthenticated: authApiCall.isUnauthenticated,
    //     isLoggedIn: authApiCall.isLoggedIn,
    //     //    isLoading: state.authPages.LoginPage.isLoading,
    //     data: authApiCall.data,
    //     authData: authApiCall.authData,
    //     isError,
    //     loginFailure,
    //     message: "",
    //     showLoader: authApiCall.showLoader
    // };

    // if (isError || returnValue.isUnauthenticated) {
    //     returnValue = { ...returnValue, message: authApiCall.message };
    // }

    // return returnValue;
    return {


    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({

        },
            dispatch
        ),
    };
}
//export default Main;
export default connect(mapStateToProps, mapDispatchToProps)(Main);

