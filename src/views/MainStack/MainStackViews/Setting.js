import React,{useState, useEffect} from 'react';
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
    FlatList,
    Alert,
    Share,
    SafeAreaView, 
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { getDimen } from '../../../dimensions/dimen';
import { storeData, getData } from '../../../utils/asyncStore';
import email from 'react-native-email'
import {changeAuthState} from '../../../actions/authAction'

function SettingScreen({ navigation, changeAuthState}){
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [accessToken, setAccessToken] = React.useState('')
    const [listing, setListing] = React.useState('')
    
    const pushButton = () => {
        setChecked1(true)
        setChecked2(false)
        setChecked3(false)
        setListing('push')
    }

    const emailButton = () => {
        setChecked1(false)
        setChecked2(true)
        setChecked3(false)
        setListing('email')
    }

    const textButton = () => {
        setChecked1(false)
        setChecked2(false)
        setChecked3(true)
        setListing('text')
    }

     handleEmail = () => {
        const to = ['prachi.pandey@klientotech.com',] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            // cc: ['bharat.dixit@klientotech.com',], // string or array of email addresses
            // bcc: 'abc@gmail.com', // string or array of email addresses
            subject: 'ArcSight Support',
            // body: 'Some body right here'
        }).catch(console.error)
    }
    
    const openTwoButtonAlert = () => {
        Alert.alert(
            'Alert!', 'Are you sure want to logout',
            [
                { text: 'Yes', onPress: () => logOutApiIntegration() },
                { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
    }
    React.useEffect(() => {
        getData('userData').then((data) => {
            const userData = JSON.parse(data);
            const listTokens = userData.token;
            setAccessToken(listTokens);
            // console.log('token1', listTokens)
            setUserImage(userData.user.profile_image_url)
            console.log('UserImage', userData.user.profile_image_url)
        })
    }, [])

    const logOutApiIntegration = () => {

        fetch("http://arc.softwaresolutions.website/api/v1/logout", {
            method: "get",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: ''
        }).then(res => res.json())
            .then(res => {
                console.log('TokenResponse', res, accessToken)
                if (res.status) {
                    console.log('logged out123456', res.message);
                    // AsyncStorage.clear();
                    navigation.dispatch(DrawerActions.toggleDrawer());
                    storeData('isLogin', 'false');
                    storeData('userData', '');
                    // clearData()
                    changeAuthState(false)
                    // navigation.navigate("Login Screen");

                    //Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false })
                } else {
                    console.log('No logged Out');
                    Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }
            })
            .catch(err => {
                console.error("error: ", err);
            });
    }

    return(
    <View style={{ flex: 1 }}>
        <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() =>
                navigation.dispatch(DrawerActions.toggleDrawer())
            }>
                <Image source={require('../../../assets/icons/3.png')}
                    style={{ height: 25, width: 25 }} />
            </TouchableOpacity>

            <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                {/* <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} /> */}

                <Image source={require('../../../assets/images/logo.png')}
                    style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
            </View>
        </View>
        <View style={{ backgroundColor: 'blue', flex: 0.90 }}>
            
            <ScrollView style={styles.container}
                keyboardShouldPersistTaps='always'
            >
                    <Text style={{marginTop: getDimen(0.05), marginLeft: getDimen(0.03), fontSize: getDimen(0.045), color: 'gray' }}> Notifications</Text>
                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.20) - 10, marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'center', }}>
                  
                    <TouchableOpacity
                            onPress={() => pushButton()}
                    >
                            <View style={{ backgroundColor: 'white', flexDirection: 'row', height: '100%',marginTop: 0, marginRight: 0, borderRadius: 0, alignItems: 'center', justifyContent: 'center', marginLeft: getDimen(0.04) }}>

                            {checked1 ? (
                                <Image source={require('../../../assets/icons/check.png')}
                                    style={{ height: getDimen(0.06), width: getDimen(0.06), }} />
                            ) : <Image source={require('../../../assets/icons/uncheck.png')}
                                style={{ height: getDimen(0.06), width: getDimen(0.06), }} />}

                            <Text style={{ fontSize: getDimen(0.04), marginLeft: getDimen(0.03), textAlign: 'center', textAlignVertical: 'center' }}>Push</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginLeft: getDimen(-0.006) }}
                        onPress={() =>
                            emailButton()
                        }
                    >
                        <View style={{ backgroundColor: 'white', flexDirection: 'row', height: '100%', marginTop: 0, marginRight: 0, borderRadius: 0, alignItems: 'center', justifyContent: 'center', marginLeft: getDimen(0.1) }}>
                            {
                                checked2 ? (
                                    <Image source={require('../../../assets/icons/check.png')}
                                        style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                ) :
                                    <Image source={require('../../../assets/icons/uncheck.png')}
                                        style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                            }

                            <Text style={{ fontSize: getDimen(0.04), marginLeft: getDimen(0.03) }}>Email</Text>
                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginLeft: getDimen(-0.006) }}
                        onPress={() =>
                            textButton()
                        }>
                        <View style={{ backgroundColor: 'white', flexDirection: 'row', height: '100%', marginTop: 0, marginRight: 0, borderRadius: 0, alignItems: 'center', justifyContent: 'center', marginLeft: getDimen(0.1) }}>
                            {
                                checked3 ? (
                                    <Image source={require('../../../assets/icons/check.png')}
                                        style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                ) :
                                    <Image source={require('../../../assets/icons/uncheck.png')}
                                        style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                            }

                            <Text style={{ fontSize: getDimen(0.04), marginLeft: getDimen(0.03) }}>Text</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                    <Text style={{ fontSize: getDimen(0.045), marginLeft: getDimen(0.04), textAlign: 'justify', color: 'gray', marginTop: getDimen(0.1) }}>About</Text>

                    <View style={{ height: getDimen(0.3), width: getDimen(0.92), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#F2F2F2',marginTop: getDimen(0.02)}}>
                      
                        {/* <View style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), backgroundColor: '#7F7F93', textAlign: 'center', justifyContent:'center', marginTop: getDimen(0.05), color: 'gray', borderBottomWidth: 0, width: getDimen(0.92), height: '30%'  }}>
                            <TouchableOpacity
                             onPress={()=> Alert.alert('Terms of Use')}
                            >
                                <Text style={{ fontSize: getDimen(0.05), marginLeft: getDimen(0.02), color: 'white', textAlign: 'left', marginTop: getDimen(0), borderBottomWidth: 0 }}>Terms of Use</Text>
                            </TouchableOpacity>
                        </View> */}

                        <View style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), backgroundColor: 'transparent', textAlign: 'center', justifyContent: 'center', marginTop: getDimen(-0.0), borderBottomWidth: 0, width: getDimen(0.92), height: '50%' }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Privacy Policy Screen')}
                            >
                            <Text style={{ fontSize: getDimen(0.05), marginLeft: getDimen(0.02), color: 'gray', textAlign: 'left', marginTop: getDimen(0), borderBottomWidth: 0 }}>Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>              
                        <View style={{ height: 1, width: getDimen(0.9), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0) }}></View>
                        
                        <View style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), backgroundColor: 'transparent', textAlign: 'center', justifyContent: 'center', marginTop: getDimen(0.0), borderBottomWidth: 0, width: getDimen(0.92), height: '50%' }}>
                           <TouchableOpacity
                                onPress={() => handleEmail()}
                            >
                            <Text style={{ fontSize: getDimen(0.05), marginLeft: getDimen(0.02), textAlign: 'left', marginTop: getDimen(0), color: 'gray', borderBottomWidth: 0 , }}>Get Help</Text>
                            </TouchableOpacity>
                        </View> 
                        {/* <View style={{ height: 1, width: getDimen(0.9), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.02) }}></View> */}
                        
                    </View>
                    <TouchableOpacity
                        style={{ marginLeft: getDimen(-0.006) }}
                    // onPress={() =>

                    // }
                    >
                        <View style={{ backgroundColor: 'white', flexDirection: 'row', height: '100%', marginTop: 0, marginRight: 0, borderRadius: 0, alignItems: 'center', justifyContent: 'flex-start', marginLeft: getDimen(0.05), marginBottom: getDimen(-0.5) }}>
                            <TouchableOpacity
                                onPress={() => openTwoButtonAlert()}
                            >
                                <Image source={require('../../../assets/icons/logout.png')}
                                    style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: getDimen(0.05), fontWeight: 'bold', marginLeft: getDimen(0.03), color: '#f1ac35' }}>Log Out</Text>

                        </View>


                    </TouchableOpacity>
                
            </ScrollView>
            
        </View>

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: 0,
        width: getDimen(1)
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
        alignSelf: 'center',
        color: '#8d8865'
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
const mapStateToProps = (state) => ({
    // isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = {
    changeAuthState
}
const SettingScreens = connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
export default SettingScreens;