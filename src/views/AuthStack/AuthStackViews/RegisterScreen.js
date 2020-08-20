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
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import ImagePicker from 'react-native-image-picker';
// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import { registerNewUser } from '../../../actions/signUpAction'
import { storeData, getData } from '../../../utils/asyncStore';

function RegisterScreen({ navigation }) {

    const [checked, setChecked] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [companyName, setCompanyName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [filePath, setFilePath] = React.useState('')
    var IsAlert = ''

    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

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

    const signupApiIntegration = () => {



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

        if (!firstName) {
            Alert.alert('', 'Please Enter First name..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (firstName.trim() === '') {
            Alert.alert('', 'Please Enter First Name..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (!lastName) {
            Alert.alert('', 'Please Enter Last Name..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (lastName.trim() === '') {
            Alert.alert('', 'Please Enter Last Name..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (!companyName) {
            Alert.alert('', 'Please Enter Company Name..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (companyName.trim() === '') {
            Alert.alert('', 'Please Enter Company Name..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
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

        if (checked === true) {
            IsAlert = 'yes'
        } else {
            IsAlert = 'no'
        }
        console.log('Alert@IsAlert:', IsAlert)

        let data = {
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "company_name": companyName,
            "password": password,
            "alerts": IsAlert,
            "register_device": Platform.OS,
            "notification_token": "",
            "profile_image": filePath.uri
        }
        // this.setState({ isAuthenticating: true })
        registerNewUser(data).then((response) => {
            if (response.status) {
                storeData('isLogin', 'true');
                storeData('userData', JSON.stringify(response.data));
                setEmail('')
                setFirstName('')
                setLastName('')
                setCompanyName('')
                setPassword('')
                navigation.navigate('Login Screen');
                Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }
            else {
                Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }

        })
    }

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
                let source = { uri: response.uri };
                console.log("response url  :  " + response.uri);
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                //  this.setState({
                //     filePath: source
                // });
                setFilePath(source);
            }
        });
    };

    
        return <View style={{ width: '100%', height: '100%', backgroundColor: '#F2F2F2' }}>
            <View style={{ width: '100%', backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require('../../../assets/icons/back.png')}
                        style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                </TouchableOpacity>

                <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} />

                    <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                </View>


            </View>
            <ImageBackground
                source={require('../../../assets/images/Splash.png')}
                style={{ flex: 1 }}>

                {/* <View style={{ width: '100%', height: getDimen(0.08), marginTop: getDimen(0.06), paddingLeft: getDimen(0.03) }}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
        >
            <Image source={require('../../../assets/icons/return.png')}
                style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
        </TouchableOpacity>
    </View> */}

                <ScrollView>
                    {/* <View style={{ borderRadius: 0, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: getDimen(0.2) }}> */}
                    <View style={{ width: '90%', height: getDimen(1.4), backgroundColor: 'white', marginLeft: getDimen(0.05), marginTop: getDimen(0.2), borderRadius: 12, shadowColor: 'black' }}>
                        <View style={{ backgroundColor: 'white', width: '100%', height: getDimen(1.22), marginTop: 0, marginRight: 0, borderRadius: 12, }}>
                            <View style={{ marginTop: getDimen(-0.1), alignItems: 'center', }}>
                                <TouchableOpacity
                                    //  onPress = {()=> Alert.alert('Show gallery!!')}
                                    onPress={chooseFile.bind(this)}
                                >

                                    {filePath === '' ?
                                        <Image
                                            style={{ resizeMode: 'cover', alignSelf: 'center', height: getDimen(0.2), width: getDimen(0.2), borderRadius: getDimen(.32) / 2 }}
                                            source={{ uri: "" }}
                                            defaultSource={require('../../../assets/icons/29.png')}
                                        /> :
                                        <Image
                                            style={{ resizeMode: 'cover', alignSelf: 'center', height: getDimen(0.2), width: getDimen(0.2), borderRadius: getDimen(.32) / 2 }}
                                            source={filePath}
                                        />
                                    }


                                </TouchableOpacity>
                            </View>

                            <TextInput
                                keyboardType="default"
                                
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                placeholder="Email"
                                keyboardType='email-address'
                                style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.05) }}
                                onChangeText={(email) => setEmail(email)}
                                value={email}
                            />

                            <View style={{ height: 1, width: getDimen(0.81), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(-0.01) }}></View>
                            <TextInput
                                keyboardType="default"
                                
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                placeholder="First Name"
                                keyboardType='default'
                                // style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.08) }}
                                style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.05) }}
                                onChangeText={(firstName) => setFirstName(firstName)}
                                value={firstName}

                            />

                            <View style={{ height: 1, width: getDimen(0.81), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(-0.01) }}></View>

                            <TextInput
                                keyboardType="default"
                                
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                placeholder="Last Name"
                                keyboardType='default'
                                // style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.08) }}
                                style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.05) }}
                                onChangeText={(lastName) => setLastName(lastName)}
                                value={lastName}

                            />

                            <View style={{ height: 1, width: getDimen(0.81), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(-0.01) }}></View>

                            <TextInput
                                keyboardType="default"
                                
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                placeholder="Real Estate Company"
                                keyboardType='default'
                                // style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.08) }}
                                style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.05) }}
                                onChangeText={(companyName) => setCompanyName(companyName)}
                                value={companyName}

                            />

                            <View style={{ height: 1, width: getDimen(0.81), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(-0.01) }}></View>

                            <TextInput
                                keyboardType="default"
                                
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                placeholder="Password"
                                secureTextEntry={true}
                                // style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.08) }}
                                style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.05) }}
                                onChangeText={(password) => setPassword(password)}
                                value={password}

                            />

                            <View style={{ height: 1, width: getDimen(0.81), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(-0.01) }}></View>
                            <View style={{ alignItems: 'center', marginTop: getDimen(0.05) }}>

                                <View style={{ alignSelf: 'center', marginBottom: getDimen(0.05), flexDirection: 'row', alignItems: 'center', }}>

                                    <CheckBox
                                        onPress={() => setChecked(!checked)
                                        }
                                        checked={checked} color="#8d8865" />
                                    <Text style={{ paddingLeft: getDimen(0.05), color: '#8d8865' }}>
                                        Sign up for ArcSight alerts
                        </Text>

                                </View>
                                <TouchableOpacity onPress={() => signupApiIntegration()}>
                                    <Text style={{ backgroundColor: '#121735', color: 'white', paddingLeft: getDimen(0.2), paddingRight: getDimen(0.2), paddingBottom: getDimen(0.03), fontSize: getDimen(0.05), fontWeight: 'bold', paddingTop: getDimen(0.03) }}>
                                        JOIN NOW
                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </ImageBackground >
        </View>


    

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: '#F2F2F2' }}>
            {Platform.OS === "android" ? androidView : iosView}

            {/* {
                (showLoader === '') ?
                    <View
                        style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%' }}
                    >
                        <ActivityIndicator size="large" color="#2b5f9c" style={{ position: 'absolute', rotation: 180 }} />
                    </View>
                    :
                    null
            } */}
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
export default RegisterScreen;
