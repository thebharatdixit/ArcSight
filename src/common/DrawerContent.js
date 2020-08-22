import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { getDimen } from '../dimensions/dimen';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body, Drawer } from 'native-base';
import { getData } from '../utils/asyncStore';
import BaseScreen from '../views/MainStack/MainStackViews/BaseScreen';
import { storeData,clearData } from '../utils/asyncStore'
import { connect } from 'react-redux';
import { changeAuthState } from '../actions/authAction';
import { NavigationActions, StackActions } from 'react-navigation';
import { AsyncStorage } from '@react-native-community/async-storage';

function DrawerScreen({ route, navigation, changeAuthState }) {
    console.log('route', route, navigation)
    const [accessToken, setAccessToken] = React.useState('')
    const [userImage, setUserImage] = React.useState('')

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

    getData('userData').then((data) => {
        const userData = JSON.parse(data);
        const listTokens = userData.token;
        setAccessToken(listTokens);
        // console.log('token1', listTokens)
        setUserImage(userData.user.profile_image_url)
        console.log('UserImage', userData.user.profile_image_url)
    })

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
                    clearData()
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
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                            <Image source={require('../assets/icons/crossWhite.png')}
                                style={{ height: 20, width: 20, marginTop: getDimen(0.03) }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {
                                (userImage === 'http://arc.softwaresolutions.website/images/UserImages/') ?
                                    <Image source={require('../assets/icons/2.png')}
                                        style={{ height: getDimen(0.2), width: getDimen(0.2), marginLeft: 20, marginTop: getDimen(-0.05) }} />
                                    :
                                    <Image source={{
                                        uri: `${userImage}`
                                    }}
                                        style={{ height: getDimen(0.2), width: getDimen(0.2), marginLeft: 20, marginTop: getDimen(-0.05), borderRadius: getDimen(0.1) }} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <DrawerContentScrollView {...route}>
                    <View style={{ marginTop: 0, marginLeft: 30 }}>
                        <DrawerItem
                            label="HOME"
                            labelStyle={{ color: 'white', fontSize: getDimen(0.041) }}
                            onPress={() => navigation.navigate('HomeStack')}
                        />
                        <DrawerItem
                            label="PROFILE"
                            labelStyle={{ color: 'white', fontSize: getDimen(0.041), }}
                            onPress={() => navigation.navigate('ProfileStack')}
                        />
                        <DrawerItem
                            label="LISTINGS"
                            labelStyle={{ color: 'white', fontSize: getDimen(0.041) }}
                            onPress={() => navigation.navigate('MyColleague Screen')}
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
                        <DrawerItem
                            label="UPGRADE TO PRO"
                            labelStyle={{ color: '#FAAE00', fontSize: getDimen(0.05), fontWeight: 'bold' }}
                        // onPress={() => alert('')}
                        />
                        <View style={{ height: 1, marginLeft: getDimen(0.03), marginRight: getDimen(0.03), backgroundColor: '#A6862D', }}></View>
                        <DrawerItem
                            icon={({ focused, size, color }) => (
                                <Icon name='ios-settings' size={size} style={{ fontSize: getDimen(.09), color: '#FAAE00' }} />
                            )}
                            label="SETTINGS"
                            labelStyle={{ color: '#FAAE00', fontSize: getDimen(0.05), fontWeight: 'bold', marginLeft: getDimen(-0.04) }}
                        // onPress={() => alert('')}
                        />
                        <DrawerItem
                            icon={({ focused, color, size }) => (
                                <Icon name='ios-log-out' size={size} color="white" style={{ fontSize: getDimen(.09), color: '#FAAE00' }} />
                            )}
                            label="LOG OUT"
                            labelStyle={{ color: '#FAAE00', fontSize: getDimen(0.05), fontWeight: 'bold', marginLeft: getDimen(-0.04) }}
                            onPress={() => openTwoButtonAlert()}
                        />
                    </View>
                </DrawerContentScrollView>
            </View>

        </View>
    )
}
const mapStateToProps = (state) => ({
    // isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = {
    changeAuthState
}
const DrawerContent = connect(mapStateToProps, mapDispatchToProps)(DrawerScreen);
export default DrawerContent;
