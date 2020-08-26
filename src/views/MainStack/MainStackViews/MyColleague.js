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
    Share
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import { storeData, getData } from '../../../utils/asyncStore';
import { fetchProfile } from '../../../actions/ProfileAction';

const onShare = async () => {

    try {
        const result = await Share.share({
            message:
                'React Native | A framework for building native apps using React',
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
    //console.log('hello');
}
function MyColleagueScreen({ navigation }) {

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
    const [length, setLength] = React.useState()

    useEffect(() => {
        tokens ? getMyListing() : getData('userData').then((data) => setTokens(JSON.parse(data).token))
    }, [tokens])


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
                setShowLoader('hide');


            }
            else {
                //Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                setShowLoader('hide');
            }

        })
    }


    return (
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

            <View style={{ flex: 0.90, width: '100%', height: '100%', backgroundColor: 'white' }}>
                {
                    (length === 0 || length === '') ?
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'white', alignItems: 'center', marginTop: getDimen(0.5) }}>
                            <Text style={{ textAlign: 'center' }}>No Data Found</Text>
                        </View>
                        :
                        null
                }
                {/* <View style={{ flex: 0.1, backgroundColor: '#d2d6d5', justifyContent: 'flex-start', alignItems: 'center', marginTop: getDimen(0.0) }}>
                    <View style={{ flex: 0.2, flexDirection: 'row', width: '100%', }}>
                        <View style={{ backgroundColor: '#d2d6d5', height: getDimen(0.125), width: getDimen(0.8), justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                                <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>FEATURED PROPERTY</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#a43d3e', height: getDimen(0.125), width: getDimen(0.2), justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>360◦</Text>
                        </View>
                    </View>

                    <Image source={require('../../../assets/icons/19.png')}
                        style={{ height: getDimen(0.15), width: getDimen(0.15), resizeMode: 'contain', margin: getDimen(0.3) }}
                    />

                    <View style={{ width: '100%', alignItems: 'flex-end', position: 'absolute', bottom: 0, }}>
                        <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e', height: getDimen(0.1), width: getDimen(0.3) }}>
                            <Text style={{ fontSize: getDimen(0.045), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>$0,000,000</Text>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35', height: getDimen(0.1), width: getDimen(0.3) }}>
                            <Text style={{ fontSize: getDimen(0.045), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>FOR SALE</Text>
                        </View>
                    </View>

                </View> */}

                <FlatList
                    ///// Search List Screen
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 0, }}
                    data={profileListing}
                    renderItem={({ item, separators, index }) => (
                        <View>


                            {item.is_featured === 'yes' ? <View style={{ backgroundColor: 'white', alignItems: 'center', }}>

                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-start', top: 0 }}>

                                    <View style={{ width: getDimen(0.8), justifyContent: 'center', alignContent: 'center' }}>


                                        <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>FEATURED PROPERTY</Text>
                                        </View>

                                    </View>

                                    <View style={{ backgroundColor: '#a43d3e', height: getDimen(0.125), width: getDimen(0.2), justifyContent: 'center', alignContent: 'center' }}>
                                        <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>360◦</Text>
                                    </View>

                                </View>



                                {
                                    (item.main_image_url && (item.main_image_url.includes('.jpg') || item.main_image_url.includes('.png'))) ? <Image
                                        source={{
                                            uri: `${item.main_image_url}`,
                                        }}
                                        defaultSource={require('../../../assets/icons/2.png')}
                                        style={{ height: getDimen(1), width: getDimen(1) }}
                                    /> :
                                        <Image source={require('../../../assets/icons/2.png')}
                                            style={{ height: getDimen(1), width: getDimen(0.18) }} />
                                }



                                <View style={{ width: '100%', alignItems: 'flex-end', position: 'absolute', bottom: 0, }}>
                                    <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e', height: getDimen(0.1), width: getDimen(0.3) }}>
                                        <Text style={{ fontSize: getDimen(0.045), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>${item.price_per_sq_feet}/feet</Text>
                                    </View>
                                    <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35', height: getDimen(0.1), width: getDimen(0.3) }}>
                                        <Text style={{ fontSize: getDimen(0.050), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>{item.listing_type}</Text>
                                    </View>
                                </View>

                            </View> :
                                <View style={{ backgroundColor: '#F2F2F2', height: getDimen(0.6), width: '100%', justifyContent: 'center', alignContent: 'center', marginTop: getDimen(0.05) }}>
                                    <View style={{ flexDirection: 'row', width: '100%', height: getDimen(.55), marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                        {
                                            (item.main_image_url && (item.main_image_url.includes('.jpg') || item.main_image_url.includes('.png'))) ? <Image
                                                source={{
                                                    uri: `${item.main_image_url}`,
                                                }}
                                                defaultSource={require('../../../assets/icons/2.png')}
                                                style={{ height: getDimen(0.52), width: getDimen(0.4), }}
                                            /> :
                                                <Image source={require('../../../assets/icons/2.png')}
                                                    style={{ height: getDimen(0.6), width: getDimen(0.4) }} />
                                        }



                                        <View style={{ flex: 1, height: '100%', }}>
                                            <View style={{ flex: 0.15, marginLeft: getDimen(0.05), marginTop: getDimen(0.05) }}>
                                                <Text style={{ fontSize: getDimen(0.04) }}>{item.location}</Text>
                                            </View>

                                            <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.05) }}>
                                                <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <Text style={{ fontSize: getDimen(0.06) }}>{item.bedrooms}</Text>
                                                    <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                                                </View>
                                                <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                                    <Text style={{ fontSize: getDimen(0.06) }}>{item.bathrooms}</Text>
                                                    <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                                                </View>
                                                <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                                    <Text style={{ fontSize: getDimen(0.06) }}>{item.terrace}</Text>
                                                    <Text style={{ fontSize: getDimen(0.035) }}>Terrace</Text>
                                                </View>
                                            </View>

                                            <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.05), marginLeft: getDimen(0) }}>

                                                <View style={{ flex: 0.35, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <Image source={require('../../../assets/icons/pin.png')}
                                                        style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                </View>
                                                <View style={{ flex: 0.6, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft: getDimen(-0.01) }}>
                                                    <Text style={{ fontSize: getDimen(0.035) }}>{item.city},{item.state}</Text>
                                                </View>
                                                <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    {/* <Image source={require('../../../assets/icons/dummyLine.png')}
                                                         style={{ height: getDimen(0.05), width: getDimen(0.05) }} /> */}
                                                    <TouchableOpacity onPress={() => Alert.alert('Clicked!')}>
                                                        <Image source={require('../../../assets/icons/dummyLine.png')}
                                                            style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>

                                            <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0), marginLeft: getDimen(0) }}>

                                                <View style={{ flex: 0.35, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <Image source={require('../../../assets/icons/map.png')}
                                                        style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                </View>
                                                <View style={{ flex: 0.6, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft: getDimen(-0.01) }}>
                                                    <Text style={{ fontSize: getDimen(0.035) }}>{item.sq_feet} Sq Feet</Text>
                                                </View>
                                                <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    {/* <Image source={require('../../../assets/icons/20.png')}
                                                         style={{ height: getDimen(0.05), width: getDimen(0.05) }} /> */}
                                                    <TouchableOpacity onPress={() => onShare()}>
                                                        <Image source={require('../../../assets/icons/20.png')}
                                                            style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>

                                        </View>





                                    </View>
                                    <View style={{ width: '40%', height: getDimen(0.08), flexDirection: 'row', backgroundColor: 'orange' }}>
                                        <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35' }}>
                                            <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>FOR SALE</Text>
                                        </View>
                                        <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e' }}>
                                            <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>$000,00</Text>
                                        </View>
                                    </View>

                                </View>
                            }



                        </View>
                    )}
                    keyExtractor={item => item.id}
                />

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
        </View>
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
export default MyColleagueScreen;
