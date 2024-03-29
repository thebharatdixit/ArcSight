import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

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
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob'

import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { getDimen } from '../../../dimensions/dimen';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import { getData, storeData } from '../../../utils/asyncStore';
import { doLogout } from '../../../actions/ProfileAction'
import AsyncStorage from '@react-native-community/async-storage';
// import { fetchProfile } from '../../../actions/ProfileAction';
import { updateProfile } from '../../../service/apiService';
import { WebView } from "react-native-webview";
import { login } from '../../../actions/loginAction';

import { fetchProfile, deleteListing, soldOutRentOut } from '../../../actions/ProfileAction';
import { changeCounter } from '../../../actions/navigationAction'

function Profile({ navigation, route, changeCounter }) {

    const [accessToken, setAccessToken] = React.useState('')
    const [userId, setUserId] = React.useState('')
    const [userProfileData, setUserProfileData] = React.useState([]);
    const [profileListing, setProfileListing] = React.useState([]);
    const [userImage, setUserImage] = React.useState('http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png');
    const [name, setName] = React.useState("");
    const [companyName, setCompanyName] = React.useState("");
    const [showLoader, setShowLoader] = React.useState('');
    const [imgs, setImgs] = React.useState('');
    const [filePath, setFilePath] = React.useState('')
    const [photoData, setPhotoData] = React.useState();
    const [photoPath, setPhotoPath] = React.useState('');
    const [photoName, setPhotoName] = React.useState('');
    const [bannerUrlImage, setBannerUrl] = React.useState('');
    const isFocused = useIsFocused();
    const [length, setLength] = React.useState()
    const [showWebview, setShowWebview] = React.useState('hide');
    const [webviewUrl, setWebviewUrl] = React.useState('');
    const [imageResponse, setImageResponse] = React.useState('');
    const [fileNameA, setFileNameA] = React.useState('');
    const [fileTypeA, setFileTypeA] = React.useState('');
    const [isMap, setIsMap] = React.useState('off');


    const { user_Id } = route.params ? route.params : ""

    const dummyData = [
        // mainSt: '1234 Main St',
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ];
    const [ArrData, setData] = useState(dummyData);

    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };



    React.useEffect(() => {
        getData('bannerUrl').then((bannerUrl) => {
            getData('userData').then((userData) => {

                const userdataMain = JSON.parse(userData);
                console.log('USER reson id in profile screen : ' + JSON.stringify(userdataMain));
                var isProUser = userdataMain.user.pro_user;
                if (isProUser === "no") {
                    setBannerUrl(bannerUrl);
                }
                else {
                    setBannerUrl("");
                }


            })
        })

        console.log('On Profile screen');

        getData('userData').then((data) => {
            const userData = JSON.parse(data);
            const listTokens = userData.token;
            // const userData = 
            console.log('USER id : ' + userData.user.id);
            setAccessToken(listTokens);
            setUserId(userData.user.id)
            console.log('tokenProfilescreen', listTokens)

            if (accessToken) {
                console.log('Prachi123')
                getUserProfileData();
            }

        })
        callLoginApi();

    }, [accessToken, isFocused])

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
                                    setBannerUrl("");
                                    storeData("bannerUrl", "");
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


    const getUserProfileData = () => {

        setShowLoader('');
        let data = {
            "profile": "my",
            "user_id": userId
        }
        let token = accessToken;
        console.log('data :' + JSON.stringify(data) + "token :" + token);
        fetchProfile(token, data).then((response) => {

            setShowLoader('hide');
            if (response.status) {
                setUserProfileData(response.data)
                setProfileListing(response.data.listing.data)
                setLength((response.data && response.data.listing.data) ? response.data.listing.data.length : '')
                setUserProfileData(response.data);
                setFilePath({ uri: response.data.profile.profile_image_url });
                storeData('profileImage', response.data.profile.profile_image_url);
                console.log('filepath ::: ', response.data.profile.profile_image_url)
                setName(response.data.profile.name);
                setCompanyName(response.data.profile.company_name);
                setShowLoader('hide');

            }
            else {
                Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }

        })
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
                getUserProfileData();
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
                getUserProfileData();
            }
            else {
                Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                // setShowLoader('hide');
            }

        })
    }


    chooseFile = async () => {

        ImagePicker.showImagePicker({ noData: true, mediaType: "photo" }, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('image picker picked image path' + JSON.stringify(response));
                setPhotoData(response);
                setPhotoPath(response.path);
                setFilePath({ uri: response.uri })
                setImageResponse(response);
                setFileNameA(response.fileName);
                setFileTypeA(response.type);
                //setPhotoName(photoData.fileName);

                uploadPhoto(response.uri, response.fileName, response.type);


            }

        });
    };


    useEffect(() => {
        getData('mapOnOff').then((mapOnOff) => {
            if (mapOnOff === 'on') {
                setIsMap("on");
            }
            else {
                setIsMap("off");
            }

        })
    }, [isFocused])

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

    const uploadPhoto = (uri, fileName, fileType) => {
        setShowLoader('');

        const formData = new FormData();
        console.log('original path: ' + uri + "token ::" + accessToken + "        filename ::" + fileName + "         filetype ::" + fileType);
        // var fileName = mainImageData.fileName;
        // var filetype = mainImageData.type;
        // return;
        if (fileName) {

        }
        else {
            var filenamess = uri.replace(/^.*[\\\/]/, '');
            console.log("filenamess:: " + filenamess);
            fileName = filenamess;
            filetype = "image/jpeg";
        }
        // formData.append('profile_image',
        //     {
        //         uri: uri,
        //         name: fileName,
        //         type: fileType
        //     });
        const dataToSend = [{ name: 'profile_image', filename: fileName, type: fileType, data: RNFetchBlob.wrap(uri) }]

        console.log('formData : ', JSON.stringify(dataToSend));
        RNFetchBlob.fetch('POST', `https://arcsightapp.com/api/v1/user/upload-profile-image`, {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            'X-localization': 'en',
        }, dataToSend)
            .uploadProgress({ interval: 250 }, (written, total) => {
                console.log('uploaded', written / total)
            })
            // listen to download progress event, every 10%
            .progress({ count: 10 }, (received, total) => {
                console.log('progress', received / total)
            })
            .then((resp) => {
                console.log("response upload:   ", resp.data)
                setShowLoader('hide');

                if (resp.httpStatus === 200) {

                } else {

                }
            }).catch((err) => {
                setShowLoader('hide');

                console.log("ERROR :  ", err)
            })

        // fetch("https://arcsightapp.com/api/v1/user/upload-profile-image", {
        //     method: "post",
        //     headers: {
        //         Accept: "application/json",
        //         'Content-Type': 'multipart/form-data',
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        //     body: formData,
        // }).then(res => res.json())
        //     .then(res => {

        //         console.log('uploadImage : ', res.data);
        //         setShowLoader('hide');
        //         getUserProfileData();
        //         alert(res.message)

        //     })
        //     .catch(err => {
        //         console.error("error uploading images: ", err);
        //     });

    }

    const hideWebview = () => {
        setShowWebview('hide');
    }

    const shoWebview = (url) => {
        setWebviewUrl(url);
        setShowWebview('');
    }
    const onError = (error) => {
        //this.setState({ image: require('../../../assets/icons/2.png') })
        setFilePath(require('../../../assets/icons/2.png'))
    }
    return (
        <MenuProvider>
            <View style={{ flex: 1 }}>

                {/* {console.log("allColleagues :  " + JSON.stringify(userProfile))} */}
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

                    <View style={{ backgroundColor: 'white', height: getDimen(0.46), width: '100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        <TouchableOpacity
                            //    onPress={() => Alert.alert('Show Gallery')}
                            onPress={chooseFile.bind(this)}
                        >


                            {/* {filePath === '' ?
                            <Image
                                style={{ resizeMode: 'cover', alignSelf: 'center', height: getDimen(0.2), width: getDimen(0.2), borderRadius: getDimen(.3), marginTop: getDimen(0.1 / 2) }}
                                source={require('../../../assets/icons/2.png')}
                            /> : <Image
                                source={{ uri: filePath }}
                                // source={require('../../../assets/icons/2.png')}
                                style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0.04), borderRadius: getDimen(0.18) / 2 }}
                            />

                        } */}
                            {console.log("filePath     :       ", filePath)}
                            {
                                <Image
                                    onError={onError}
                                    source={filePath}
                                    // source={require('../../../assets/icons/2.png')}
                                    style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0.04), borderRadius: getDimen(0.18) / 2 }}
                                />
                            }
                            {/* {
                                (filePath) ? <Image
                                    source={{
                                        uri: `${filePath}`,
                                    }}
                                    defaultSource={require('../../../assets/images/user.png')}
                                    style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0.04), borderRadius: getDimen(0.18) / 2 }}
                                /> :
                                    <Image source={require('../../../assets/images/user.png')}
                                        defaultSource={require('../../../assets/images/user.png')}
                                        style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0.04), borderRadius: getDimen(0.18) / 2 }} />
                            } */}
                            <Text style={{ fontWeight: 'bold', fontSize: getDimen(0.049), marginTop: -getDimen(0.055) }}></Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Update Profile')}>
                            <Text style={{ fontWeight: 'bold', fontSize: getDimen(0.049), marginTop: getDimen(0.03) }}>{name}</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'gray', fontSize: getDimen(0.036), marginTop: getDimen(0.005) }}>{companyName}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.04), }}>
                            <View style={{ justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'white', marginRight: getDimen(0.02) }}>
                                {/* {(userProfileData && userProfileData.total_listings && userProfileData.total_listings !== 0) && < Text style={{ fontSize: getDimen(0.04), textAlign: 'left' }}> {userProfileData.total_listings + " Listings"}</Text>} */}
                                {(!userProfileData || !userProfileData.total_listings || userProfileData.total_listings === 0) ? < Text style={{ fontSize: getDimen(0.04), textAlign: 'left' }}> {"0 Listings"}</Text> : < Text style={{ fontSize: getDimen(0.04), textAlign: 'left' }}> {userProfileData.total_listings + " Listings"}</Text>}


                            </View>
                            <View style={{ width: 1, height: '100%', backgroundColor: 'gray', marginLeft: getDimen(0.02) }}></View>
                            <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'white', marginLeft: getDimen(0.03) }}>
                                {/* <Text style={{ fontSize: getDimen(0.04), textAlign: 'right' }}> {userProfileData && userProfileData.total_colleagues && userProfileData.total_colleagues + " Colleagues"}</Text> */}
                                {(!userProfileData || !userProfileData.total_colleagues || userProfileData.total_colleagues === 0) ? < Text style={{ fontSize: getDimen(0.04), textAlign: 'left' }}> {"0 Colleagues"}</Text> : < Text style={{ fontSize: getDimen(0.04), textAlign: 'left' }}> {userProfileData.total_colleagues + " Colleagues"}</Text>}

                            </View>
                        </View>
                        {/* <TouchableOpacity
                        // onPress={() => Alert.alert('Logged Out!!')
                        onPress={() => logOutApiIntegration()}
                        style={{ marginTop: getDimen(0.03) }}
                    >
                        <Text style={{ fontSize: getDimen(0.04), fontWeight: 'bold', color: 'red' }}> LogOut </Text>
                    </TouchableOpacity> */}

                        {/* <TouchableOpacity
                    onPress={() => navigation.navigate('Change Password Screen')}
                    // onPress={() => logOutApiIntegration()}
                    style={{ marginTop: getDimen(0.02) }}
                >
                    <Text style={{ fontSize: getDimen(0.04), fontWeight: 'bold', }}> Change Password </Text>
                </TouchableOpacity> */}

                    </View>
                    {
                        (length === 0 || length === '') ?
                            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'white', alignItems: 'center', marginTop: getDimen(0.3) }}>
                                <Text style={{ textAlign: 'center' }}>No Data Found</Text>
                            </View>
                            :
                            null
                    }
                    <ScrollView style={styles.container}>


                        <SafeAreaView style={{ flex: 1 }}>

                            <FlatList
                                ///// Search List Screen
                                horizontal={false}
                                showsVerticalScrollIndicator={false}
                                style={{ marginTop: 0, }}
                                data={profileListing}
                                renderItem={({ item, separators, index }) => (
                                    <View>
                                        <View style={{ borderRadius: 0, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 20 }}>

                                            {item.is_featured === 'yes' ?
                                                <TouchableOpacity onPress={() => navigation.navigate('Search List Detail', ({ "userId": userId, "listing_id": item.id }))}
                                                    style={{ backgroundColor: '#F2F2F2', flexDirection: 'row', width: '100%', marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                                    <View style={styles.container}>
                                                        <View style={{ flex: 0.1, backgroundColor: '#d2d6d5', justifyContent: 'flex-start', alignItems: 'center', }}>


                                                            <View style={{ flex: 0.2, width: '100%', justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
                                                                {
                                                                    (item.main_image_url === 'https://arcsightapp.com/images/ListingImages/') ?
                                                                        <Image source={require('../../../assets/icons/19.png')}
                                                                            style={{ height: getDimen(0.15), width: getDimen(0.15), resizeMode: 'contain', margin: getDimen(0.3) }}
                                                                        />
                                                                        :
                                                                        <View style={{ height: '100%', width: '100%' }}>
                                                                            <Image source={{
                                                                                uri: `${item.main_image_url}`
                                                                            }}
                                                                                defaultSource={require('../../../assets/icons/19.png')}
                                                                                style={{ height: getDimen(0.70), width: '100%', resizeMode: 'cover', }} />
                                                                        </View>
                                                                }
                                                            </View>
                                                            <View style={{ flex: 0.2, flexDirection: 'row', width: '100%', position: 'absolute' }}>
                                                                <View style={{ backgroundColor: 'transparent', height: getDimen(0.125), width: getDimen(0.7), justifyContent: 'center', alignContent: 'center' }}>
                                                                    <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                                                                        {
                                                                            (item.is_featured === '' && item.is_featured === 'no') ?
                                                                                null
                                                                                :
                                                                                <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>FEATURED PROPERTY</Text>
                                                                        }


                                                                    </View>
                                                                </View>

                                                                <View style={{ flexDirection: 'column', width: getDimen(0.3) }}>
                                                                    {item.video_url ?
                                                                        <TouchableOpacity onPress={() =>
                                                                            // console.log("userId1234:", userId, item.user_id)
                                                                            shoWebview(item.video_url)
                                                                        }
                                                                            style={{ backgroundColor: '#a43d3e', height: getDimen(0.125), width: getDimen(0.3), justifyContent: 'center', alignContent: 'center' }}>
                                                                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>360◦</Text>
                                                                        </TouchableOpacity>
                                                                        :
                                                                        null}
                                                                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35', height: getDimen(0.1), width: getDimen(0.3) }}>
                                                                        <Text style={{ fontSize: getDimen(0.050), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>{(item.is_sold === "no") ? item.listing_type : item.listing_type === "For Sale" ? "Sold Out" : item.listing_type === "For Rent" ? "Rent Out" : ""}</Text>
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
                                                            {userId === item.user_id ?
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
                                                                :
                                                                null

                                                            }


                                                        </View>

                                                        <View style={{ flex: 0.15, marginLeft: getDimen(0.01), marginTop: getDimen(0.02), flexDirection: 'row' }}>
                                                            {isMap === "on" ?

                                                                <TouchableOpacity onPress={() => openMapurl(item.latitude, item.longitude, item.location)} style={{ width: '80%', }}>
                                                                    {/* <Text style={{ fontSize: getDimen(0.035) }}>City,State</Text> */}
                                                                    <Text style={{ fontSize: getDimen(0.045), width: '100%', fontWeight: '500' }}>{item.location ? item.location : ''}</Text>
                                                                </TouchableOpacity>
                                                                :
                                                                <Text style={{ fontSize: getDimen(0.045), width: '80%', fontWeight: '500' }}>{item.location ? item.location : ''}</Text>
                                                            }
                                                            {/* 
                                                            <Text style={{ fontSize: getDimen(0.040), fontWeight: 'bold', textAlign: 'left', marginRight: 10 }}>{item.userinfo.name ? item.userinfo.name : ''}</Text>
                                                            <TouchableOpacity
                                                                // onPress={() => Alert.alert('Real Estate Company')}
                                                                style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', }}
                                                            >
                                                                <Text style={{ fontSize: getDimen(0.038), marginTop: getDimen(0.005), color: 'gray' }}>{item.userinfo.company_name ? item.userinfo.company_name : ''}</Text>
                                                            </TouchableOpacity>

                                                        </View> */}
                                                        </View>

                                                        <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.05) }}>
                                                            <View style={{ flex: 0.25, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%', }}>
                                                                <Text style={{ fontSize: getDimen(0.06) }}>{item.bedrooms ? item.bedrooms : ''}</Text>
                                                                <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                                                            </View>
                                                            <View style={{ flex: 0.22, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                                                <Text style={{ fontSize: getDimen(0.06) }}>{item.bathrooms ? item.bathrooms : ''}</Text>
                                                                <Text style={{ fontSize: getDimen(0.035) }}>Bathrooms</Text>
                                                            </View>
                                                            <View style={{ flex: 0.21, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                                                <Text style={{ fontSize: getDimen(0.06) }}>{item.terrace ? item.terrace : 0}</Text>
                                                                <Text style={{ fontSize: getDimen(0.035) }}>Terrace</Text>
                                                            </View>
                                                            <View style={{ backgroundColor: '#a43d3e', flex: 0.395, height: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                                <Text style={{ color: 'white', fontWeight: '500', fontSize: getDimen(0.045) }}>${(item && item.price_per_sq_feet) ? item.price_per_sq_feet : ""}/feet</Text>
                                                            </View>
                                                        </View>

                                                        {/* <View style={{ flex: 0.27, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.08) }}>
                                                        <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                            <Text style={{ fontSize: getDimen(0.040) }}>{item.home_type ? "• Home Type: " + item.home_type : "• Home Type: "}</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                            <Text style={{ fontSize: getDimen(0.040) }}>{item.listing_type ? "• Listing Type: " + item.listing_type : "• Listing Type: "}</Text>
                                                           
                                                        </View>
                                                    </View>
                                                    <Text style={{ fontSize: getDimen(0.04), marginTop: getDimen(0.02), marginLeft: getDimen(0.050) }}> {"• Aminities Name: " + arrAminitiesName.toString()}</Text>


                                                    <View style={{ flex: 0.27, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.08), marginLeft: getDimen(0.05), marginRight: getDimen(0.02), marginBottom: getDimen(0.05) }}>
                                                        <Text style={{ fontSize: getDimen(0.04), color: '#808080' }}>
                                                            {(searchListDetail && searchListDetail.listing && searchListDetail.listing.description) ? searchListDetail.listing.description : ''}
                                                        </Text>
                                                       
                                                    </View> */}


                                                    </View>
                                                </TouchableOpacity>

                                                :
                                                <View style={{ backgroundColor: '#F2F2F2', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.55), marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                                    <View style={{ flex: 0.6, height: '100%', width: '100%', }}>
                                                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#E6E6E6', }}>
                                                            <TouchableOpacity onPress={() => {
                                                                navigation.navigate('Search List Detail', ({ "user_idSearchDetail": item.user_id, "listing_id": item.id }))
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


                                                        <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'orange' }}>
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
                                                            </TouchableOpacity>
                                                            {userId === item.user_id ?
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
                                                                :
                                                                null
                                                            }
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
                                                            {/* <View style={{ flex: 0.7, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft: getDimen(-0.04) }}>
                                                                <Text style={{ fontSize: getDimen(0.035) }}>{item.city},{item.state}</Text>
                                                            </View> */}
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


                                                        <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0), marginLeft: getDimen(0), marginBottom: getDimen(0.03) }}>

                                                            <View style={{ flex: 0.35, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                                <Image source={require('../../../assets/icons/map.png')}
                                                                    style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                            </View>
                                                            <View style={{ flex: 0.7, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft: getDimen(-0.04) }}>
                                                                <Text style={{ fontSize: getDimen(0.035) }}>{item.sq_feet} Sq Feet</Text>
                                                            </View>
                                                            <View style={{ flex: 0.25, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>

                                                                <TouchableOpacity onPress={() => onShare()}>
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


                                            }

                                        </View>

                                    </View>
                                )}
                                keyExtractor={item => "" + item.id}
                            />
                        </SafeAreaView>
                    </ScrollView>
                    {bannerUrlImage ?
                        <View style={{ height: getDimen(0.2), width: getDimen(1), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'white', marginTop: 0 , borderWidth: 1, borderColor:'black'}}>
                            <View style={{ backgroundColor: 'white', width: '100%', height: '100%', alignItems: 'center', }}>
                                <Image source={{ uri: bannerUrlImage }}
                                    defaultSource={require('../../../assets/icons/2.png')}
                                    style={{ height: '100%', width: '100%', resizeMode: 'cover' }} />

                            </View>
                        </View>
                        :
                        null
                    }

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
            </View >
        </MenuProvider >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        // marginTop: getDimen(0.05),
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
//export default ProfileScreen;
const mapStateToProps = (state) => ({

});
const mapDispatchToProps = {
    changeCounter
}
const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileScreen;
