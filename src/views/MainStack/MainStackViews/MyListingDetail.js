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
    Share,
    Alert,
    Linking
} from 'react-native';
import { WebView } from "react-native-webview";
import { MenuProvider } from 'react-native-popup-menu';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { getDimen } from '../../../dimensions/dimen';
import Slideshow from 'react-native-image-slider-show';
import { getData } from '../../../utils/asyncStore';
import { fetchProfile, deleteListing, soldOutRentOut } from '../../../actions/ProfileAction';


function MyListingDetail({ navigation, route }) {

    const { user_idSearchDetail } = route.params ? route.params : ""
    const { ProfileImage } = route.params ? route.params : ""
    const { listing_id } = route.params ? route.params : ""
    const [accessToken, setAccessToken] = React.useState('')
    const [searchListDetail, setSearchListDetail] = React.useState([])
    const [userImage, setUserImage] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [companyName, setCompanyName] = React.useState('')
    const [userIdd, setUserId] = React.useState('')
    const [IsFeatured, setIsFeatured] = React.useState('')
    const [primaryImage, setPrimaryImage] = React.useState('')
    const [isSold, setIsSold] = React.useState('')
    const [loginUserId, setLoginUserId] = React.useState('')
    const [showLoader, setShowLoader] = React.useState('');
    const [arrAminitiesName, setArrAminitiesName] = React.useState([]);
    const [showWebview, setShowWebview] = React.useState('hide');
    const [webviewUrl, setWebviewUrl] = React.useState('');
    const [videoUrl, setVideoUrl] = React.useState('');

    const [position, setPosition] = React.useState('');
    const [intervalTime, setIntervalTime] = React.useState('');
    const [dataofimages, setdataofimages] = React.useState([]);
    const [latitude, setLatitude] = React.useState('');
    const [longnitude, setLongnitude] = React.useState('');
    const [locationName, setLocationName] = React.useState('');
    const [isMap, setIsMap] = React.useState('off');

    const { userId } = route.params ? route.params : ""

    React.useEffect(() => {
        getData('mapOnOff').then((mapOnOff) => {
            if (mapOnOff === 'on') {
                setIsMap("on");
            }
            else {
                setIsMap("off");
            }

        })
        getData('userData').then((data) => {
            const userData = JSON.parse(data);
            const listTokens = userData.token;
            console.log('USER id : ' + userData.user.id);
            setLoginUserId(userData.user.id)
            setAccessToken(listTokens);
            setPrimaryImage(ProfileImage)
            console.log('ProfileImage:', ProfileImage)
            console.log('Search Detail Screen Token', listTokens)

            if (accessToken) {
                console.log('Prachi1234')
                searchListingDetailApiIntegration();
            }
        })

    }, [accessToken])



    const searchListingDetailApiIntegration = () => {
        fetch("http://arc.softwaresolutions.website/api/v1/listing/detail", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "listing_id": listing_id
            })
        }).then(res => res.json())
            .then(res => {
                setShowLoader('hide')
                if (res.status) {

                    console.log('Search Listing Details', res.data);
                    setSearchListDetail(res.data)
                    setUserId(res.data.listing.user_id)
                    setUserName(res.data.listing.userinfo.name)
                    setCompanyName(res.data.listing.userinfo.company_name)
                    setUserImage(res.data.listing.userinfo.profile_image_url)
                    setLatitude(res.data.listing.latitude);
                    setLongnitude(res.data.listing.longitude);
                    setLocationName(res.data.listing.location);
                    setIsFeatured(res.data.listing.is_featured)
                    setPrimaryImage(res.data.listing.main_image_url)
                    setIsSold(res.data.listing.is_sold);
                    console.log('Primary Image', primaryImage);
                    makeAminitiesArray(res.data.listing.listing_ammenities);
                    setVideoUrl(res.data.listing.video_url)
                    var multiImages = res.data.listing.listing_images;
                    var useArray = [];
                    for (let i = 0; i < multiImages.length; i++) {
                        let item = multiImages[i];
                        let imageItem = {
                            url: item.image_url,
                            // name: response.fileName,
                            // type: response.type
                        }
                        useArray.push(imageItem);

                    }
                    setdataofimages(useArray);
                    // console.log('listing/detail', searchListDetail);
                    // Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false })
                } else {
                    console.log('Search Listing Details Error', res.message);
                    // Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }
            })
            .catch(err => {
                console.error("error: ", err);
            });
    }

    const makeAminitiesArray = (data) => {
        console.log('aminities..: ' + JSON.stringify(data));
        var arrAminities = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            arrAminities.push(item.amenity.name);

        }
        console.log("arrAminitiesName : " + JSON.stringify(arrAminities));
        setArrAminitiesName(arrAminities);

    }

    const hideWebview = () => {
        setShowWebview('hide');
    }

    const shoWebview = (url) => {
        setWebviewUrl(url);
        setShowWebview('');
    }

    const openMapurl = (lati, longi, placeName) => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lati},${longi}`;
        const label = locationName;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });


        Linking.openURL(url);
    }

    const deleteListingApiIntegration = (listing_id) => {

        setShowLoader('');
        let data = {
            "listing_id": listing_id
        }
        let token = accessToken;
        console.log('data :' + JSON.stringify(data) + "token :" + token);
        deleteListing(token, data).then((response) => {

            setShowLoader('hide');
            if (response.status) {
                navigation.goBack();
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
        let token = accessToken;
        console.log('data :' + JSON.stringify(data) + "token :" + token);
        soldOutRentOut(token, data).then((response) => {

            setShowLoader('hide');
            if (response.status) {
                navigation.goBack();
            }
            else {
                Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                // setShowLoader('hide');
            }

        })
    }


    return (
        <MenuProvider>
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() =>
                        navigation.goBack()
                    }>
                        <Image source={require('../../../assets/icons/back.png')}
                            style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>

                    <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                        {/* <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} /> */}

                        <Image source={require('../../../assets/images/logo.png')}
                            style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                    </View>
                </View>
                {/* </View> */}
                <View style={{ flex: 0.90, width: '100%', height: '100%', backgroundColor: 'white' }}>
                    <ScrollView style={styles.container}>
                        <View style={{ flex: 0.1, backgroundColor: '#d2d6d5', justifyContent: 'flex-start', alignItems: 'center', }}>


                            <View style={{ flex: 0.2, width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                {
                                    (primaryImage === 'http://arc.softwaresolutions.website/images/ListingImages/' || !dataofimages || !(dataofimages.length > 0)) ?
                                        <Image source={require('../../../assets/icons/19.png')}
                                            style={{ height: getDimen(0.15), width: getDimen(0.15), resizeMode: 'contain', margin: getDimen(0.3) }}
                                        />
                                        :
                                        <View style={{ height: getDimen(0.70), width: '100%' }}>
                                            <Slideshow style={{ height: getDimen(1), width: '100%' }}
                                                dataSource={dataofimages && dataofimages.length > 0 ? dataofimages : []}
                                            // position={this.state.position}
                                            // onPositionChanged={position => this.setState({ position })}
                                            />
                                        </View>
                                }
                            </View>


                        </View>

                        <View style={{ flex: 0.2, flexDirection: 'row', width: '100%', position: 'absolute' }}>
                            <View style={{ backgroundColor: 'transparent', height: getDimen(0.125), width: getDimen(0.7), justifyContent: 'center', alignContent: 'center' }}>
                                <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                                    {
                                        (IsFeatured === '' && IsFeatured === 'no') ?
                                            null
                                            :
                                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>FEATURED PROPERTY</Text>
                                    }


                                </View>
                            </View>
                            {/* {videoUrl ? */}
                            <View style={{ flexDirection: 'column', width: getDimen(0.3) }}>
                                {videoUrl ?
                                    <TouchableOpacity onPress={() =>
                                        // console.log("userId1234:", userId, item.user_id)
                                        shoWebview(videoUrl)
                                    }
                                        style={{ backgroundColor: '#a43d3e', height: getDimen(0.125), width: getDimen(0.3), justifyContent: 'center', alignContent: 'center' }}>
                                        <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>360◦</Text>
                                    </TouchableOpacity>
                                    :
                                    null}
                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35', height: getDimen(0.1), width: getDimen(0.3) }}>
                                    <Text style={{ fontSize: getDimen(0.050), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>{(isSold && isSold === "no") ? searchListDetail && searchListDetail.listing && searchListDetail.listing.listing_type : searchListDetail && searchListDetail.listing && searchListDetail.listing.listing_type === "For Sale" ? "Sold Out" : searchListDetail && searchListDetail.listing && searchListDetail.listing.listing_type === "For Rent" ? "Rent Out" : ""}</Text>
                                </View>
                            </View>
                            {/* :
                                <View style={{ flexDirection: 'column', width: getDimen(0.2) }}>
                                    <TouchableOpacity onPress={() =>
                                        // console.log("userId1234:", userId, item.user_id)
                                        shoWebview(videoUrl)
                                    }
                                        style={{ backgroundColor: '#a43d3e', height: getDimen(0.125), width: getDimen(0.2), justifyContent: 'center', alignContent: 'center' }}>
                                        <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>360◦</Text>
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35', height: getDimen(0.1), width: getDimen(0.2) }}>
                                        <Text style={{ fontSize: getDimen(0.050), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>{(isSold && isSold === "no") ? searchListDetail && searchListDetail.listing && searchListDetail.listing.listing_type : searchListDetail && searchListDetail.listing && searchListDetail.listing.listing_type === "For Sale" ? "Sold Out" : "Rent Out"}</Text>
                                    </View>
                                </View>
                            } */}

                        </View>

                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: getDimen(-0.12), marginRight: getDimen(0.1) }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Colleague List', ({ "name": userName, "companyName": companyName, "profile_image_url": userImage, "isFriend": '', "userId": userIdd }))}
                            >
                                {
                                    (userImage === 'http://arc.softwaresolutions.website/images/UserImages/') ?
                                        <Image source={require('../../../assets/icons/2.png')}
                                            style={{ height: getDimen(0.4 / 2), width: getDimen(0.4 / 2) }} />
                                        :
                                        <Image source={{
                                            uri: `${userImage}`
                                        }}
                                            style={{ height: getDimen(0.4 / 2), width: getDimen(0.4 / 2), borderRadius: getDimen(0.1) }} />
                                }

                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '100%', alignItems: 'flex-start', position: 'absolute', left: 5, marginTop: 10 }}>
                                <Menu>
                                    <MenuTrigger>
                                        <Image source={require('../../../assets/images/more.png')}
                                            style={{ height: getDimen(0.045), width: getDimen(0.045), resizeMode: 'contain', margin: 0.025, tintColor: 'white' }}
                                        />
                                    </MenuTrigger>


                                    <MenuOptions>
                                        <MenuOption onSelect={() => navigation.navigate('Edit Property Screen', ({ "listingData": searchListDetail.listing }))} text='EDIT' />
                                        <MenuOption onSelect={() => deleteListingApiIntegration(searchListDetail.listing.id)} text='DELETE' />
                                        {/* <MenuOption onSelect={() => alert(`DELETE`)} >
                                                                <Text style={{ color: 'red' }}>Delete</Text>
                                                            </MenuOption> */}
                                        {searchListDetail && searchListDetail.listing && searchListDetail.listing.is_sold === 'no' ? <MenuOption onSelect={() => soldOutRentOutApiIntegration(searchListDetail.listing.id)} text='MARK AS SOLD' /> : null}
                                        {/* <MenuOption onSelect={() => alert(`MARK AS SOLD`)} text='MARK AS SOLD' /> */}
                                        {/* <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' /> */}
                                    </MenuOptions>
                                </Menu>
                            </TouchableOpacity>

                        </View>


                        {/* <ScrollView style={styles.container}> */}
                        <View style={{ flex: 0.15, marginLeft: getDimen(0.05), marginTop: getDimen(0.05), flexDirection: 'row' }}>
                            {/* <Text style={{ fontSize: getDimen(0.06) }}>1234 Main St</Text> */}
                            {isMap === "on" ? <TouchableOpacity style={{ flex: 0.5 }} onPress={() => openMapurl(latitude, longnitude)}>
                                <Text style={{ fontSize: getDimen(0.045), fontWeight: '500' }}>{(searchListDetail && searchListDetail.listing && searchListDetail.listing.location) ? searchListDetail.listing.location : ''}</Text>
                            </TouchableOpacity>
                                :
                                <View style={{ flex: 0.5 }}>
                                    <Text style={{ fontSize: getDimen(0.045), fontWeight: '500' }}>{(searchListDetail && searchListDetail.listing && searchListDetail.listing.location) ? searchListDetail.listing.location : ''}</Text>
                                </View>
                            }
                            <View style={{ flex: 0.5, flexDirection: 'column', marginLeft: getDimen(0.015), justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '45%', alignSelf: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        (loginUserId === userIdd) ?
                                            navigation.navigate('Profile Screen', ({ "profile": "my", "userId": userIdd }))
                                            :
                                            navigation.navigate('Colleague List', ({ "name": userName, "companyName": companyName, "profile_image_url": userImage, "isFriend": '', "userId": userIdd }))

                                    }
                                    }

                                >
                                    {/* <Text style={{ fontSize: getDimen(0.040), fontWeight: 'bold', textAlign: 'left' }}>Broker Name Here</Text> */}
                                    <Text style={{ fontSize: getDimen(0.040), fontWeight: 'bold', textAlign: 'left', marginRight: 10 }}>{(searchListDetail && searchListDetail.listing && searchListDetail.listing.userinfo.name) ? searchListDetail.listing.userinfo.name : ''}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    // onPress={() => Alert.alert('Real Estate Company')}
                                    style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', }}
                                >
                                    {/* <Text style={{ fontSize: getDimen(0.038), marginTop: getDimen(0.005), color: 'gray' }}>Real Estate Company</Text> */}
                                    <Text style={{ fontSize: getDimen(0.038), marginTop: getDimen(0.005), color: 'gray' }}>{(searchListDetail && searchListDetail.listing && searchListDetail.listing.userinfo.company_name) ? searchListDetail.listing.userinfo.company_name : ''}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.05) }}>
                            <View style={{ flex: 0.25, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%', }}>
                                <Text style={{ fontSize: getDimen(0.06) }}>{(searchListDetail && searchListDetail.listing && searchListDetail.listing.bedrooms) ? searchListDetail.listing.bedrooms : ''}</Text>
                                <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                            </View>
                            <View style={{ flex: 0.22, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                <Text style={{ fontSize: getDimen(0.06) }}>{(searchListDetail && searchListDetail.listing && searchListDetail.listing.bathrooms) ? searchListDetail.listing.bathrooms : ''}</Text>
                                <Text style={{ fontSize: getDimen(0.035) }}>Bathrooms</Text>
                            </View>
                            <View style={{ flex: 0.21, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                <Text style={{ fontSize: getDimen(0.06) }}>{(searchListDetail && searchListDetail.listing && searchListDetail.listing.terrace) ? searchListDetail.listing.terrace : 0}</Text>
                                <Text style={{ fontSize: getDimen(0.035) }}>Terrace</Text>
                            </View>
                            <View style={{ backgroundColor: '#a43d3e', flex: 0.395, height: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: '500', fontSize: getDimen(0.045) }}>${(searchListDetail && searchListDetail.listing && searchListDetail.listing.price_per_sq_feet) ? searchListDetail.listing.price_per_sq_feet : ""}/feet</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.27, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.08) }}>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Text style={{ fontSize: getDimen(0.040) }}>{(searchListDetail && searchListDetail.listing && searchListDetail.listing.home_type) ? "• Home Type: " + searchListDetail.listing.home_type : "• Home Type: "}</Text>
                                {/* <Text style={{ fontSize: getDimen(0.045), marginTop: 10 }}>• Detail to Go Here</Text> */}
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Text style={{ fontSize: getDimen(0.040) }}>{(searchListDetail && searchListDetail.listing && searchListDetail.listing.listing_type) ? "• Listing Type: " + searchListDetail.listing.home_type : "• Listing Type: "}</Text>
                                {/* <Text style={{ fontSize: getDimen(0.045), marginTop: 10 }}>• Detail to Go Here</Text>
                            <Text style={{ fontSize: getDimen(0.045), marginTop: 10 }}>• Detail to Go Here</Text> */}
                            </View>
                        </View>
                        <Text style={{ fontSize: getDimen(0.04), marginTop: getDimen(0.02), marginLeft: getDimen(0.050) }}> {"• Aminities Name: " + arrAminitiesName.toString()}</Text>


                        <View style={{ flex: 0.27, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.08), marginLeft: getDimen(0.05), marginRight: getDimen(0.02), marginBottom: getDimen(0.05) }}>
                            <Text style={{ fontSize: getDimen(0.04), color: '#808080' }}>
                                {(searchListDetail && searchListDetail.listing && searchListDetail.listing.description) ? searchListDetail.listing.description : ''}
                            </Text>
                            {/* <Text style={{ fontSize: getDimen(0.04), color: '#808080' }}>
                            This is the descriptive paragraph on the lsiting that the broker has uploaded.
                    </Text> */}
                        </View>


                    </ScrollView>
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
            </View >
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: 0,
        width: getDimen(1)
    },

});

export default MyListingDetail;
