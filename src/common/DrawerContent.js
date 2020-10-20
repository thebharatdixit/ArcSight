import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import { getDimen } from '../dimensions/dimen';
import { useIsFocused } from '@react-navigation/native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Button, Item, Input, CheckBox, ListItem, Body, Drawer } from 'native-base';
import { getData } from '../utils/asyncStore';
import BaseScreen from '../views/MainStack/MainStackViews/BaseScreen';
import { storeData, clearData } from '../utils/asyncStore'
import { connect } from 'react-redux';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { changeAuthState } from '../actions/authAction';
import { Fontisto } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import settingScreen from '../views/MainStack/MainStackViews/Setting'
import { login } from '../actions/loginAction';
// import Payment from '../common/Payment';

// import { NavigationActions, StackActions } from 'react-navigation';
// import { AsyncStorage } from '@react-native-community/async-storage';
import { changeProStatus } from '../actions/navigationAction';

function DrawerScreen(props) {
    const { route, navigation, changeAuthState, proUser, changeProStatus, counter } = props
    console.log('route', route, navigation)
    const [accessToken, setAccessToken] = React.useState('')
    const [userImage, setUserImage] = React.useState('')
    const [isPro, setIsPro] = React.useState('')
    const [showLoader, setShowLoader] = useState('hide');
    const isFocused = navigation.isFocused;



    // const isFocused = useIsFocused();
    // getData('profileImage').then((profileImage) => {
    //     // console.log('token1', listTokens)
    //     setUserImage(profileImage)
    //     console.log('UserImage', profileImage)
    //     if (proUser === false) {
    //     }
    // })
    useEffect(() => {
        console.log("hello")
        if (proUser === false) {
            callLoginApi();
        }
    }, [counter])

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
        //console.log("navigatioon use effect calling..")
        getData('userData').then((data) => {
            const userData = JSON.parse(data);
            const listTokens = userData.token;
            //console.log("listTokens  : ", listTokens)
            setAccessToken(listTokens);
            getData('profileImage').then((profileImage) => {
                // console.log('token1', listTokens)
                setUserImage(profileImage)
                console.log('UserImage', profileImage)
            })
        })
    })

    const callLoginApi = () => {
        getData('saveUsername').then((userName) => {
            getData('savePassword').then((password) => {
                getData('fcmToken').then((fcmToken) => {
                    let data = {
                        "email": userName,
                        "password": password,
                        "login_device": Platform.OS,
                        "notification_token": fcmToken
                    }
                    setShowLoader('')
                    login(data).then((response) => {
                        //console.log("response from login inside drawer ", response.data)
                        setShowLoader('hide')
                        if (response.status) {
                            storeData('saveUsername', userName);
                            storeData('savePassword', password);
                            if (fcmToken)
                            storeData('saveFcmToken', fcmToken);
                            storeData('isLogin', 'true');
                            storeData('userData', JSON.stringify(response.data));
                            storeData('profileImage', response.data.user.profile_image_url);
                            // getBannerUrl();
                            setUserImage(response.data.user.profile_image_url)
                            // navigation.navigate('Main Stack');
                            // Alert.alert('' + response.message, [{
                            //     text: 'OK', onPress: () => {
                            //         setUsername('')
                            //         setPassword('')
                            //     }
                            // }], { cancelable: false });
                            console.log("trying to login")
                            setTimeout(function () {
                                if (response.data.user.pro_user === "yes") {
                                    console.log("inside true pro user ")
                                    // setBannerUrl("");
                                    setIsPro("yes");
                                    storeData("bannerUrl", "");
                                    changeProStatus(true)
                                }
                                else {
                                    console.log("inside false pro user ")

                                    changeProStatus(false)

                                    setIsPro("");
                                }
                                // setUsername('');
                                // setPassword('');
                                //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
                                // changeAuthState(true)

                            }, 300);
                        }
                        else {
                            // Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                            alert("" + response.message);
                        }

                    })
                })
            })
        })

    }


    const logOutApiIntegration = () => {
        setShowLoader('');
        fetch("https://arcsightapp.com/api/v1/logout", {
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
                    setShowLoader('hide');
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
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ paddingLeft: 10, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, width: '100%' }}>
                        <TouchableOpacity>

                            {
                                (userImage === undefined || userImage == null || userImage === '' || userImage === 'https://arcsightapp.com/images/UserImages/') ?
                                    <Image source={require('../assets/icons/2.png')}
                                        style={{ height: getDimen(0.2), width: getDimen(0.2), marginLeft: 20, marginTop: getDimen(-0.05) }} />
                                    :
                                    <Image source={{
                                        uri: `${userImage}`
                                    }}
                                        defaultSource={require('../assets/images/user.png')}
                                        style={{ height: getDimen(0.2), width: getDimen(0.2), marginLeft: 20, marginTop: getDimen(-0.05), borderRadius: getDimen(0.1), }} /> //resizeMode: 'contain'
                            }
                        </TouchableOpacity>
                        <View style={{ width: '50%', alignItems: 'flex-start', justifyContent: 'flex-end', paddingRight: 0, paddingLeft: getDimen(0.02), flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                                <Image source={require('../assets/icons/crossWhite.png')}
                                    style={{ height: 20, width: 20, marginTop: getDimen(0.03) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <DrawerContentScrollView {...route}>
                    <View style={{ marginTop: 0, marginLeft: 30 }}>
                        <DrawerItem
                            label="HOME"
                            labelStyle={{ color: 'white', fontSize: getDimen(0.041) }}
                            onPress={() => navigation.navigate('HOME')}
                        />
                        <DrawerItem
                            label="PROFILE"
                            labelStyle={{ color: 'white', fontSize: getDimen(0.041), }}
                            onPress={() => navigation.navigate('ProfileStack')}
                        />
                        <DrawerItem
                            label="LISTINGS"
                            labelStyle={{ color: 'white', fontSize: getDimen(0.041) }}
                            onPress={() => navigation.navigate('MyColleagueStack')}
                        />
                        <DrawerItem
                            label="CHANGE PASSWORD"
                            labelStyle={{ color: 'white', fontSize: getDimen(0.041) }}
                            onPress={() => navigation.navigate('CHANGE PASSWORD')}
                        />
                        <DrawerItem
                            label="COLLEAGUES + CLIENTS"
                            labelStyle={{ color: 'white', fontSize: getDimen(0.041) }}
                            onPress={() => navigation.navigate('Chat Stack')}
                        />
                        <DrawerItem
                            label="MESSAGES"
                            labelStyle={{ color: 'white', fontSize: getDimen(0.041) }}
                            onPress={() => navigation.navigate('AddListingStack')}
                        />
                        <DrawerItem
                            label="ADD NEW LISTING"
                            labelStyle={{ color: 'white', fontSize: getDimen(0.041) }}
                            onPress={() => navigation.navigate('Property Screen')}
                        />
                        <DrawerItem
                            label="SEARCH LISTING"
                            labelStyle={{ color: 'white', fontSize: getDimen(0.041) }}
                            onPress={() => navigation.navigate('Search')}
                        />
                        {proUser === false && <DrawerItem
                            label="UPGRADE TO PRO"
                            labelStyle={{ color: '#FAAE00', fontSize: getDimen(0.05), fontWeight: 'bold' }}
                            onPress={() => navigation.navigate("UPGRADE TO PRO")}
                        />
                        }

                        <View style={{ height: 1, marginLeft: getDimen(0.03), marginRight: getDimen(0.03), backgroundColor: '#A6862D', }}></View>
                        <DrawerItem
                            icon={({ focused, size, color }) => (
                                // <Fontisto name="player-settings" size={size} style={{ fontSize: getDimen(.09), color: '#FAAE00' }} />
                                <Icon name='settings' size={size} style={{ fontSize: getDimen(.07), color: '#FAAE00' }} />
                            )}
                            label="SETTINGS"
                            labelStyle={{ color: '#FAAE00', fontSize: getDimen(0.05), fontWeight: 'bold', marginLeft: getDimen(-0.04) }}
                            onPress={() => navigation.navigate('SETTINGS')}
                        />
                        <DrawerItem
                            icon={({ focused, color, size }) => (
                                <Icon2 name='logout' size={size} color="white" style={{ fontSize: getDimen(.06), color: '#FAAE00' }} />
                            )}
                            label="LOG OUT"
                            labelStyle={{ color: '#FAAE00', fontSize: getDimen(0.05), fontWeight: 'bold', marginLeft: getDimen(-0.04) }}
                            onPress={() => openTwoButtonAlert()}
                        />
                    </View>
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
                </DrawerContentScrollView>
            </View>

        </View>
    )
}
const mapStateToProps = (state) => ({
    // isLoggedIn: state.auth.isLoggedIn,
    proUser: state.navigation.proUser,
    counter: state.navigation.counter
});
const mapDispatchToProps = {
    changeAuthState, changeProStatus
}
const DrawerContent = connect(mapStateToProps, mapDispatchToProps)(DrawerScreen);
export default DrawerContent;
