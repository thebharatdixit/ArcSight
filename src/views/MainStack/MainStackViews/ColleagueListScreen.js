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
    FlatList,
    Alert,
    Share
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { storeData, getData } from '../../../utils/asyncStore';
import { fetchProfile } from '../../../actions/ProfileAction';

// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';

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

function ColleaguageListScreen({ route, navigation }) {

    const [tokens, setTokens] = React.useState('');
    const [showLoader, setShowLoader] = React.useState('hide');
    const [userProfileData, setUserProfileData] = React.useState([]);
    const [profileListing, setProfileListing] = React.useState([]);



    //const { colleagues } = route.params 
    const { name } = route.params ? route.params : ""
    const { companyName } = route.params ? route.params : ""
    const { profile_image_url } = route.params ? route.params : ""
    const { isFriend } = route.params ? route.params : ""
    const { userId } = route.params ? route.params : ""



    const dummyData = [
        // mainSt: '1234 Main St',
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ];

    useEffect(() => {
        tokens ? getColleagueProfileData() : getData('userData').then((data) => setTokens(JSON.parse(data).token))
    }, [tokens])


    global.id = '';

    getData('userData').then((data) => {
        const userData = JSON.parse(data);
        const listTokens = userData.token;
        id = userData.user.id;
        setTokens(listTokens);

    })





    const addColleagues = (id) => {

        setShowLoader('');

        fetch("http://arc.softwaresolutions.website/api/v1/add-colleague", {
            method: "post",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${tokens}`,
            },
            body: JSON.stringify(
                { "user_id": id }
            ),
        }).then(res => res.json())
            .then(res => {

                // console.log("status : ", res.status)
                if (res.status === true) {
                    alert(res.message);

                    setShowLoader('hide');
                } else {
                    alert(res.message);
                    setShowLoader('hide');
                }

            })
            .catch(err => {
                console.error("error add colleague : ", err);
                setShowLoader('hide');
            });
    }


    const removeColleagu = (id) => {
        setShowLoader('');

        fetch("http://arc.softwaresolutions.website/api/v1/remove-colleague", {
            method: "post",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${tokens}`,
            },
            body: JSON.stringify(
                { "user_id": id }
            ),
        }).then(res => res.json())
            .then(res => {

                if (res.status === true) {
                    alert(res.message);

                    setShowLoader('hide');
                } else {
                    alert(res.message);
                    setShowLoader('hide');
                }

            })
            .catch(err => {
                console.error("error uploading images: ", err);
            });
    }


    const addAndRemoveColleague = (isFriend, userId) => {
        //alert("add and remove")

        if (isFriend === "no") {
            addColleagues(userId);
            // alert("hello I am add Colleague method"+userId)
        } else {
            removeColleagu(userId);
            //alert("hello I am remove Colleague method" + userId)
        }
    }


    const getColleagueProfileData = () => {

        setShowLoader('');
        let data = {
            "profile": "other",
            "user_id": userId
        }
        let token = tokens;
        console.log('data :' + JSON.stringify(data) + "token :" + token);
        fetchProfile(token, data).then((response) => {


            if (response.status) {
                setUserProfileData(response.data)
                setProfileListing(response.data.listing.data)
                console.log('colleagues profile : ', profileListing)

                setShowLoader('hide');


            }
            else {
                Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }

        })
    }


    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>

            <View style={{ width: '100%', backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
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

            <View style={{ backgroundColor: 'white', height: getDimen(0.55), width: '100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                <TouchableOpacity onPress={() => Alert.alert('Show Gallery')}>

                    <Image source={{
                        uri: `${profile_image_url}`,
                    }}
                        style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0.1), borderRadius: 40 }}
                    />
                    {/* <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0.06) }}
                    /> */}
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: getDimen(0.049), marginTop: getDimen(0.03) }}>{name}</Text>
                <Text style={{ color: 'gray', fontSize: getDimen(0.036), marginTop: getDimen(0.005) }}>{companyName}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.02), }}>
                    <View style={{ justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'white', marginRight: getDimen(0.02) }}>
                        <Text style={{ fontSize: getDimen(0.04), textAlign: 'left' }}>00 Listings</Text>
                    </View>
                    <View style={{ width: 1, height: '100%', backgroundColor: 'gray', marginLeft: getDimen(0.02) }}></View>
                    <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'white', marginLeft: getDimen(0.03) }}>
                        <Text style={{ fontSize: getDimen(0.04), textAlign: 'right' }}>00 Colleagues</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.01), }}>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'white', marginRight: getDimen(0.05) }}>
                        <TouchableOpacity onPress={() => addAndRemoveColleague(isFriend, userId)}>

                            {(isFriend === 'no') ? (
                                <Image source={require('../../../assets/icons/dmyCollegue.png')}
                                    style={{ height: getDimen(0.080), width: getDimen(0.080) }} />
                            ) : (<Image source={require('../../../assets/icons/cross.png')}
                                style={{ height: getDimen(0.038), width: getDimen(0.038), marginRight: getDimen(0.03) }} />)}
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 1, height: '100%', marginLeft: getDimen(0.02) }}></View>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'white', marginLeft: getDimen(0) }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Chat Layout')}>
                            <Image source={require('../../../assets/icons/dymChat.png')}
                                style={{ height: getDimen(0.080), width: getDimen(0.080) }} />
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

            <ScrollView style={styles.container}>
                <View style={{ flex: 0.1, backgroundColor: '#d2d6d5', justifyContent: 'flex-start', alignItems: 'center', marginTop: getDimen(0.05) }}>
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

                </View>

                <FlatList
                    ///// Search List Screen
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 0, }}
                    data={profileListing}
                    renderItem={({ item, separators, index }) => (
                        <View>
                            <View style={{ borderRadius: 0, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10 }}>

                                <View style={{ backgroundColor: '#F2F2F2', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.55), marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                    <View style={{ flex: 0.6, height: '100%' }}>
                                        <View style={{ flex: 0.9, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#E6E6E6' }}>
                                            {/* <Image
                                                source={require('../../../assets/icons/19.png')}
                                                style={{ resizeMode: 'contain', height: getDimen(.09), width: getDimen(.09) }}
                                            /> */}

                                            <Image source={{
                                                uri: `${item.main_image_url}`,
                                            }}
                                                style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0), }}
                                            />
                                        </View>

                                        <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'orange' }}>
                                            <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35' }}>
                                                <Text style={{ fontSize: getDimen(0.04), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>{item.listing_type}</Text>
                                            </View>
                                            <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e' }}>
                                                <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>$000,00</Text>
                                            </View>
                                        </View>

                                    </View>
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
                            </View>

                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: getDimen(0.02),
        width: getDimen(1)
    },
});

export default ColleaguageListScreen;