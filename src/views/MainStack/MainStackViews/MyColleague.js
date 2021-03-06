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
    Share,
    SafeAreaView,
    Linking
} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { useIsFocused } from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { WebView } from "react-native-webview";

// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import { storeData, getData } from '../../../utils/asyncStore';
import { fetchProfile, deleteListing, soldOutRentOut } from '../../../actions/ProfileAction';
import { changeCounter } from '../../../actions/navigationAction'

const onShare = async (webUrl) => {
    if (webUrl) {
        try {
            const result = await Share.share({
                message:
                    webUrl,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    } else {
        Alert.alert('Invalid web url')
    }
    //console.log('hello');
}
function MyColleague({ navigation, changeCounter }) {

    const dummyData = [
        // mainSt: '1234 Main St',
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ];

    const [checked, setChecked] = React.useState(false);
    const [tokens, setTokens] = React.useState('');
    const [showLoader, setShowLoader] = useState('hide');
    const [userProfileData, setUserProfileData] = useState([]);
    const [profileListing, setProfileListing] = useState([]);
    const [showWebview, setShowWebview] = React.useState('hide');
    const [webviewUrl, setWebviewUrl] = React.useState('');
    const [length, setLength] = React.useState();
    const isFocused = useIsFocused();
    const [latitude, setLatitude] = React.useState('');
    const [longnitude, setLongnitude] = React.useState('');
    const [isMap, setIsMap] = React.useState('off');

    useEffect(() => {
        tokens ? getMyListing() : getData('userData').then((data) => setTokens(JSON.parse(data).token))
    }, [tokens, isFocused])

    useEffect(() => {
        getData('mapOnOff').then((mapOnOff) => {
            console.log('mapOnOff:: ' + mapOnOff);
            if (mapOnOff === 'on') {
                setIsMap("on");
            }
            else {
                setIsMap("off");
            }

        })
    }, [isFocused])

    const getMyListing = () => {

        setShowLoader('');
        let data = {
            "profile": "my"
        }
        let token = tokens;
        console.log('data :' + JSON.stringify(data) + "token :" + token);
        fetchProfile(token, data).then((response) => {


            if (response.status) {
                setUserProfileData(response.data)
                setProfileListing(response.data.listing.data)
                console.log('my profile data : ', profileListing)
                setLength(profileListing ? profileListing.length : '')
                // setLatitude(profileListing ? profileListing.latitude : '');
                // setLongnitude(profileListing ? profileListing.longitude : '');
                // setLocationName(profileListing ? profileListing.location : '');
                setShowLoader('hide');

            }
            else {
                //Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                setShowLoader('hide');
            }

        })
    }

    const deleteListingApiIntegration = (listing_id) => {

        setShowLoader('');
        let data = {
            "listing_id": listing_id
        }
        let token = tokens;
        console.log('data :' + JSON.stringify(data) + "token :" + token);
        deleteListing(token, data).then((response) => {

            setShowLoader('hide');
            if (response.status) {
                getMyListing();
            }
            else {
                Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                // setShowLoader('hide');
            }

        })
    }

    const soldOutRentOutApiIntegration = (listing_id) => {

        setShowLoader('');
        let data = {
            "listing_id": listing_id
        }
        let token = tokens;
        console.log('data :' + JSON.stringify(data) + "token :" + token);
        soldOutRentOut(token, data).then((response) => {

            setShowLoader('hide');
            if (response.status) {
                getMyListing();
            }
            else {
                Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                // setShowLoader('hide');
            }

        })
    }

    const hideWebview = () => {
        setShowWebview('hide');
    }

    const shoWebview = (url) => {
        setWebviewUrl(url);
        setShowWebview('');
    }

    const openMapurl = (lati, longi, locationName) => {
        console.log('hnxvncb:: ' + lati + " :: " + longi);
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lati},${longi}`;
        const label = locationName;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });


        Linking.openURL(url);
    }

    return (
        <MenuProvider>
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => {
                        changeCounter(Math.random())
                        navigation.dispatch(DrawerActions.toggleDrawer())

                    }
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

                <View style={{ flex: 0.90, width: '100%', height: '100%', backgroundColor: 'white' }}>
                    {/* {
                    (length === 0 || length === '') ?
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'white', alignItems: 'center', marginTop: getDimen(0.5) }}>
                            <Text style={{ textAlign: 'center' }}>No Data Found</Text>
                        </View>
                        :
                        null
                } */}
                    <ScrollView>

                        <SafeAreaView >

                            <FlatList
                                ///// Search List Screen
                                horizontal={false}
                                showsVerticalScrollIndicator={false}
                                style={{ marginTop: 0, }}
                                data={profileListing}
                                renderItem={({ item, separators, index }) => (
                                    <View style={{ flex: 1 }}>

                                        {item.is_featured === 'yes' ?

                                            <View style={{ flex: 0.1, backgroundColor: 'gray', justifyContent: 'flex-start', alignItems: 'center', marginTop: getDimen(0) }}>

                                                <TouchableOpacity onPress={() => navigation.navigate('My Listing Detail', ({ "user_idSearchDetail": item.user_id, "ProfileImage": item.main_image_url, "listing_id": item.id }))} style={styles.item}>

                                                    {
                                                        (item.main_image_url === undefined || item.main_image_url === null || item.main_image_url === 'https://arcsightapp.com/images/UserImages/' || item.main_image_url === '') ?
                                                            <Image source={require('../../../assets/icons/19.png')}
                                                                style={{ height: getDimen(0.15), width: getDimen(0.15), resizeMode: 'contain', margin: getDimen(0.3) }}
                                                            /> :
                                                            <Image
                                                                source={{
                                                                    uri: `${item.main_image_url}`,
                                                                }}
                                                                defaultSource={require('../../../assets/icons/2.png')}
                                                                style={{ height: getDimen(0.75), width: getDimen(1), backgroundColor: '#DFE4E2' }}
                                                            />


                                                    }
                                                </TouchableOpacity>

                                                <View style={{ flex: 0.2, flexDirection: 'row', width: '100%', position: 'absolute' }}>
                                                    <View style={{ backgroundColor: 'transparent', height: getDimen(0.125), width: getDimen(0.8), justifyContent: 'center', alignContent: 'center' }}>
                                                        <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                                                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>FEATURED PROPERTY</Text>
                                                        </View>
                                                    </View>

                                                    {item.video_url ?
                                                        <TouchableOpacity onPress={() =>
                                                            // console.log("userId1234:", userId, item.user_id)
                                                            shoWebview(item.video_url)
                                                        }
                                                            style={{ backgroundColor: '#a43d3e', height: getDimen(0.125), width: getDimen(0.2), justifyContent: 'center', alignContent: 'center' }}>
                                                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>360◦</Text>
                                                        </TouchableOpacity>
                                                        :
                                                        null
                                                    }

                                                </View>

                                                {/* {item.video_url ?
                                                    <TouchableOpacity onPress={() =>
                                                        // console.log("userId1234:", userId, item.user_id)
                                                        shoWebview(item.video_url)
                                                    }
                                                        style={{ backgroundColor: '#a43d3e', height: getDimen(0.125), width: getDimen(0.2), justifyContent: 'center', alignContent: 'center' }}>
                                                        <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>360◦</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    null
                                                } */}

                                                <View style={{ width: '100%', alignItems: 'flex-end', position: 'absolute', bottom: 0, }}>
                                                    <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e', height: getDimen(0.1), width: getDimen(0.3) }}>
                                                        <Text style={{ fontSize: getDimen(0.045), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>${item.price_per_sq_feet}/feet</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35', height: getDimen(0.1), width: getDimen(0.3) }}>
                                                        <Text style={{ fontSize: getDimen(0.050), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>{(item.is_sold === "no") ? item.listing_type : item.listing_type === "For Sale" ? "Sold Out" : "Rent Out"}</Text>
                                                    </View>
                                                </View>

                                                <TouchableOpacity style={{ width: '100%', alignItems: 'flex-start', position: 'absolute', bottom: 15, left: 5 }}>
                                                    <Menu>
                                                        <MenuTrigger>
                                                            <Image source={require('../../../assets/images/more.png')}
                                                                style={{ height: getDimen(0.045), width: getDimen(0.045), resizeMode: 'contain', margin: 0.025, tintColor: 'white' }}
                                                            />
                                                        </MenuTrigger>


                                                        <MenuOptions>
                                                            <MenuOption onSelect={() => navigation.navigate('Edit Property Screen', ({ "listingData": item }))} text='EDIT' />
                                                            <MenuOption onSelect={() => deleteListingApiIntegration(item.id)} text='DELETE' />
                                                            {/* <MenuOption onSelect={() => alert(`DELETE`)} >
                                                                <Text style={{ color: 'red' }}>Delete</Text>
                                                            </MenuOption> */}
                                                            {item.is_sold === 'no' ? <MenuOption onSelect={() => soldOutRentOutApiIntegration(item.id)} text='MARK AS SOLD' /> : null}
                                                            {/* <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' /> */}
                                                        </MenuOptions>
                                                    </Menu>
                                                </TouchableOpacity>

                                            </View>

                                            :

                                            <View style={{ borderRadius: 0, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 15, }}>
                                                <View style={{ backgroundColor: '#F2F2F2', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.52), marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                                    <View style={{ flex: 0.6, height: '100%', width: '100%', }}>
                                                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#E6E6E6', }}>
                                                            <TouchableOpacity onPress={() => {
                                                                navigation.navigate('My Listing Detail', ({ "user_idSearchDetail": item.user_id, "listing_id": item.id }))
                                                            }
                                                            }>

                                                                {
                                                                    (item.main_image_url) ?
                                                                        <Image source={{
                                                                            uri: `${item.main_image_url}`
                                                                        }}
                                                                            style={{ resizeMode: 'cover', height: getDimen(.43), width: getDimen(.35) }} />

                                                                        :
                                                                        <Image
                                                                            source={require('../../../assets/icons/19.png')}
                                                                            style={{ resizeMode: 'contain', height: getDimen(.09), width: getDimen(.09) }}
                                                                        />
                                                                }
                                                            </TouchableOpacity>

                                                        </View>


                                                        <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'orange' }}>
                                                            <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35' }}>
                                                                {/* <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>FOR SALE</Text> */}
                                                                <Text style={{ fontSize: getDimen(0.035), fontWeight: '600', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>{(item.is_sold === "no") ? item.listing_type : item.listing_type === "For Sale" ? "Sold Out" : "Rent Out"}</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e' }}>
                                                                <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>${item.price_per_sq_feet}/feet</Text>
                                                            </View>
                                                        </View>

                                                    </View>


                                                    <View style={{ flex: 1, height: '100%', }}>
                                                        <View style={{ flex: 0.3, marginLeft: getDimen(0.05), marginRight: getDimen(0.01), marginTop: getDimen(0.015), flexDirection: 'row' }}>
                                                            <TouchableOpacity style={{ marginRight: 5, flex: 0.9 }}
                                                                onPress={() => {
                                                                    navigation.navigate('Search List Detail', ({ "user_idSearchDetail": item.user_id, "listing_id": item.id }))
                                                                }
                                                                }>
                                                                {/* <Text style={{ fontSize: getDimen(0.06) }}>1234 Main St</Text> */}
                                                                <Text
                                                                    numberOfLines={2}
                                                                    style={{ fontSize: getDimen(0.042), fontWeight: '500' }}>{item.location}</Text>

                                                                {/* {isMap === "on" ? <TouchableOpacity style={{ flex: 0.5 }} onPress={() => openMapurl(latitude, longnitude)}>
                                                                    <Text
                                                                        numberOfLines={2}
                                                                        style={{ fontSize: getDimen(0.042), fontWeight: '500' }}>{item.location}</Text>
                                                                </TouchableOpacity>
                                                                    :
                                                                    <View style={{ flex: 0.5 }}>
                                                                        <Text
                                                                            numberOfLines={2}
                                                                            style={{ fontSize: getDimen(0.042), fontWeight: '500' }}>{item.location}</Text>
                                                                    </View>
                                                                } */}
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end', position: 'absolute', left: 5, flex: 0.1 }}>
                                                                <Menu>
                                                                    <MenuTrigger>
                                                                        <Image source={require('../../../assets/images/more.png')}
                                                                            style={{ height: getDimen(0.045), width: getDimen(0.045), resizeMode: 'contain', margin: 0.025, tintColor: 'gray' }}
                                                                        />
                                                                    </MenuTrigger>


                                                                    <MenuOptions>
                                                                        <MenuOption onSelect={() => navigation.navigate('Edit Property Screen', ({ "listingData": item }))} text='EDIT' />
                                                                        <MenuOption onSelect={() => deleteListingApiIntegration(item.id)} text='DELETE' />
                                                                        {/* <MenuOption onSelect={() => alert(`DELETE`)} >
                                                                <Text style={{ color: 'red' }}>Delete</Text>
                                                            </MenuOption> */}
                                                                        {item.is_sold === 'no' ? <MenuOption onSelect={() => soldOutRentOutApiIntegration(item.id)} text='MARK AS SOLD' /> : null}

                                                                        {/* <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' /> */}
                                                                    </MenuOptions>
                                                                </Menu>
                                                            </TouchableOpacity>
                                                        </View>

                                                        <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.03), marginLeft: getDimen(0.04) }}>
                                                            <View style={{ flex: 0.45, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                                <Text style={{ fontSize: getDimen(0.06) }}>{item.bedrooms}</Text>
                                                                <Text style={{ fontSize: getDimen(0.03) }}>Bedrooms</Text>
                                                            </View>
                                                            <View style={{ flex: 0.45, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                                                <Text style={{ fontSize: getDimen(0.06), textAlign: 'center' }}>{item.bathrooms}</Text>
                                                                <Text style={{ fontSize: getDimen(0.03), textAlign: 'center' }}>Bathrooms</Text>
                                                            </View>
                                                            <View style={{ flex: 0.4, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                                                <Text style={{ fontSize: getDimen(0.06) }}>{item.terrace}</Text>
                                                                <Text style={{ fontSize: getDimen(0.03) }}>Terrace</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.03), marginLeft: getDimen(0) }}>

                                                            <View style={{ flex: 0.35, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                                <Image source={require('../../../assets/icons/pin.png')}
                                                                    style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                            </View>

                                                            {isMap === "on" ?

                                                                <TouchableOpacity onPress={() => openMapurl(item.latitude, item.longitude, item.location)} style={{ flex: 0.7, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft: getDimen(-0.04) }}>
                                                                    {/* <Text style={{ fontSize: getDimen(0.035) }}>City,State</Text> */}
                                                                    <Text style={{ fontSize: getDimen(0.035) }}>{item.city},{item.state}</Text>
                                                                </TouchableOpacity>
                                                                // <TouchableOpacity style={{ flex: 0.5 }} onPress={() => openMapurl(latitude, longnitude)}>
                                                                //     <Text
                                                                //         numberOfLines={2}
                                                                //         style={{ fontSize: getDimen(0.042), fontWeight: '500' }}>{item.location}</Text>
                                                                // </TouchableOpacity>
                                                                :
                                                                <View style={{ flex: 0.7, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft: getDimen(-0.04) }}>
                                                                    {/* <Text style={{ fontSize: getDimen(0.035) }}>City,State</Text> */}
                                                                    <Text style={{ fontSize: getDimen(0.035) }}>{item.city},{item.state}</Text>
                                                                </View>
                                                            }

                                                            <View style={{ flex: 0.25, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%', }}>
                                                                {/* <Image source={require('../../../assets/icons/dummyLine.png')}
                                                         style={{ height: getDimen(0.05), width: getDimen(0.05) }} /> */}
                                                                {/* <TouchableOpacity onPress={() => Alert.alert('Compared Feature!')}>
                                                                    <Image source={require('../../../assets/icons/dummyLine.png')}
                                                                        style={{ height: getDimen(0.08), width: getDimen(0.08) }} />
                                                                </TouchableOpacity> */}
                                                            </View>


                                                        </View>


                                                        <View style={{ flex: 0.27, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0), marginLeft: getDimen(0), marginBottom: getDimen(0.03) }}>

                                                            <View style={{ flex: 0.35, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                                <Image source={require('../../../assets/icons/map.png')}
                                                                    style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                            </View>
                                                            <View style={{ flex: 0.7, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft: getDimen(-0.04) }}>
                                                                <Text style={{ fontSize: getDimen(0.035) }}>{item.sq_feet} Sq Feet</Text>
                                                            </View>
                                                            <View style={{ flex: 0.25, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>

                                                                <TouchableOpacity onPress={() => onShare(item.web_share_url)}>
                                                                    {
                                                                        (item && item.web_share_url === !'') ?
                                                                            <Image source={require('../../../assets/icons/20.png')}
                                                                                style={{ height: getDimen(0.07), width: getDimen(0.07) }} />
                                                                            :
                                                                            null
                                                                    }
                                                                    {/* <Image source={require('../../../assets/icons/20.png')}
                                                        style={{ height: getDimen(0.07), width: getDimen(0.07) }} /> */}
                                                                </TouchableOpacity>
                                                            </View>

                                                        </View>

                                                    </View>





                                                </View>
                                                {/* <View style={{ width: '40%', height: getDimen(0.08), flexDirection: 'row', backgroundColor: 'orange' }}>
                                        <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35' }}>
                                            <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>FOR SALE</Text>
                                        </View>
                                        <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e' }}>
                                            <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>$000,00</Text>
                                        </View>
                                    </View> */}

                                            </View>
                                        }



                                    </View>
                                )}
                                keyExtractor={item => item.id}
                            />
                        </SafeAreaView>
                    </ScrollView>
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


                    {showWebview === '' ?
                        <View style={{ width: '100%', height: '100%', flexDirection: 'column', marginTop: getDimen(0.01), backgroundColor: 'transparent', position: 'absolute', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => hideWebview()} style={{ flex: 0.3, backgroundColor: 'white', opacity: 1 }}>
                                <TouchableOpacity onPress={() => hideWebview()} style={{ position: 'absolute', height: 35, width: 35, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', borderRadius: 15, }}>
                                    <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
                                        <Image style={{ width: '80%', height: '80%', borderRadius: 15 }}
                                            source={require('../../../assets/icons/iconClose.png')}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </TouchableOpacity>
                            <View style={{ flex: 0.4, backgroundColor: 'transparent' }}>
                                <WebView
                                    style={{ width: '100%', height: '100%', alignSelf: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
                                    javaScriptEnabled={true}
                                    source={{ uri: webviewUrl }}
                                />
                            </View>
                            <TouchableOpacity onPress={() => hideWebview()} style={{ flex: 0.3, backgroundColor: 'white', opacity: 1 }}></TouchableOpacity>
                        </View>
                        : null
                    }


                </View>
            </View>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: getDimen(0),
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
//export default MyColleagueScreen;
const mapStateToProps = (state) => ({

});
const mapDispatchToProps = {
    changeCounter
}
const MyColleagueScreen = connect(mapStateToProps, mapDispatchToProps)(MyColleague);
export default MyColleagueScreen;
