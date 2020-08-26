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
    SafeAreaView
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { getDimen } from '../../../dimensions/dimen';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import { getData } from '../../../utils/asyncStore';
import { doLogout } from '../../../actions/ProfileAction'
import AsyncStorage from '@react-native-community/async-storage';
import { fetchProfile } from '../../../actions/ProfileAction';
import { updateProfile } from '../../../service/apiService';

function ProfileScreen({ navigation, route }) {

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

    }, [accessToken, isFocused])


    const getUserProfileData = () => {

        setShowLoader('');
        let data = {
            "profile": "my",
            "user_id": userId
        }
        let token = accessToken;
        console.log('data :' + JSON.stringify(data) + "token :" + token);
        fetchProfile(token, data).then((response) => {


            if (response.status) {
                setUserProfileData(response.data)
                setProfileListing(response.data.listing.data)
                setUserProfileData(response.data);
                setFilePath(response.data.profile.profile_image_url);
                console.log('filepath : ', filePath)
                setName(response.data.profile.name);
                setCompanyName(response.data.profile.company_name);
                setShowLoader('hide');

            }
            else {
                Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }

        })
    }


    chooseFile = async () => {

        ImagePicker.showImagePicker({ noData: true, mediaType: "photo" }, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {


                setPhotoData(response);
                setPhotoPath(response.path);
                setFilePath(response.uri)
                //setPhotoName(photoData.fileName);

                uploadPhoto();



            }
        });
    };



    const uploadPhoto = () => {
        setShowLoader('');

        const formData = new FormData();

        formData.append('profile_image', filePath);

        //console.log('filePath : ',filePath)


        fetch("http://arc.softwaresolutions.website/api/v1/user/upload-profile-image", {
            method: "post",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        }).then(res => res.json())
            .then(res => {

                console.log('uploadImage : ', res.data);
                setShowLoader('hide');
                alert(res.message)
                // if (res.status == true) {

                // }

                //   Alert.alert(
                //     "Success",
                //     "Bill of Loading Uploaded Successfully!",
                //     [{ text: "OK", onPress: () => that.props.close() }],
                //     { cancelable: false }
                //   );
            })
            .catch(err => {
                console.error("error uploading images: ", err);
            });



    }

    return (

        <View style={{ flex: 1 }}>

            {/* {console.log("allColleagues :  " + JSON.stringify(userProfile))} */}
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

                        {
                            (filePath && (filePath.includes('.jpg') || filePath.includes('.png'))) ? <Image
                                source={{
                                    uri: `${filePath}`,
                                }}
                                style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0.04), borderRadius: getDimen(0.18) / 2 }}
                            /> :
                                <Image source={require('../../../assets/icons/2.png')}
                                    style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0.04), borderRadius: getDimen(0.18) / 2 }} />
                        }



                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Update Profile')}>

                        <Text style={{ fontWeight: 'bold', fontSize: getDimen(0.049), marginTop: getDimen(0.03) }}>{name}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'gray', fontSize: getDimen(0.036), marginTop: getDimen(0.005) }}>{companyName}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.04), }}>
                        <View style={{ justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'white', marginRight: getDimen(0.02) }}>
                            <Text style={{ fontSize: getDimen(0.04), textAlign: 'left' }}> {userProfileData ? userProfileData.total_listings + " Listings" : "Listing"}</Text>
                        </View>
                        <View style={{ width: 1, height: '100%', backgroundColor: 'gray', marginLeft: getDimen(0.02) }}></View>
                        <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'white', marginLeft: getDimen(0.03) }}>
                            <Text style={{ fontSize: getDimen(0.04), textAlign: 'right' }}> {userProfileData ? userProfileData.total_colleagues + " Colleagues" : "Colleagues"}</Text>
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
                                        {item.is_featured ?
                                            <TouchableOpacity onPress={() => navigation.navigate('Search List Detail', ({ "userId": userId, "listing_id": item.id }))}
                                            style={{ backgroundColor: '#F2F2F2', flexDirection: 'row', width: '100%', marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                                <View style={styles.container}>
                                                    <View style={{ flex: 0.1, backgroundColor: '#d2d6d5', justifyContent: 'flex-start', alignItems: 'center', }}>
                                                        <View style={{ flex: 0.2, flexDirection: 'row', width: '100%', }}>
                                                            <View style={{ backgroundColor: '#d2d6d5', height: getDimen(0.125), width: getDimen(0.8), justifyContent: 'center', alignContent: 'center' }}>
                                                                <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                                                                    {
                                                                        (item.is_featured === '' && item.is_featured === 'no') ?
                                                                            null
                                                                            :
                                                                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>FEATURED PROPERTY</Text>
                                                                    }


                                                                </View>
                                                            </View>
                                                            <View style={{ backgroundColor: '#a43d3e', height: getDimen(0.125), width: getDimen(0.2), justifyContent: 'center', alignContent: 'center' }}>
                                                                <TouchableOpacity>
                                                                    <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>360◦</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>

                                                        <View style={{ flex: 0.2, width: '100%', justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
                                                            {
                                                                (item.main_image_url === 'http://arc.softwaresolutions.website/images/ListingImages/') ?
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

                                                    </View>
                                                    
                                                    <View style={{ flex: 0.15, marginLeft: getDimen(0.01), marginTop: getDimen(0.02), flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: getDimen(0.045), width: '80%', fontWeight: '500' }}>{item.location ? item.location : ''}</Text>
                                                        {/* <View style={{ flexDirection: 'column', marginLeft: getDimen(0.015), justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '45%', alignSelf: 'center' }}>
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
                                                            <Text style={{ color: 'white', fontWeight: '500', fontSize: getDimen(0.045) }}>&0,000,000</Text>
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
                                                <View style={{ flex: 0.6, height: '100%' }}>

                                                    <View style={{ flex: 0.9, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#E6E6E6' }}>
                                                        {/* <Image
                                                    source={{ uri: item.profile_image_url }}
                                                    // source={require('../../../assets/icons/2.png')}
                                                    style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0.04), borderRadius: getDimen(0.18) / 2 }}
                                                /> */}
                                                        <TouchableOpacity onPress={() => navigation.navigate('Search List Detail', ({ "userId": userId }))}>


                                                            <Image
                                                                // source={{
                                                                //     uri: `${item.profile_image_url}`,
                                                                // }}
                                                                source={require('../../../assets/icons/2.png')}
                                                                style={{ height: getDimen(0.4), width: getDimen(0.4), marginTop: getDimen(0), }}
                                                            />
                                                        </TouchableOpacity>

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
                                                        <TouchableOpacity onPress={() => navigation.navigate('Search List Detail', ({ "userId": userId }))}>
                                                            <Text style={{ fontSize: getDimen(0.04) }}>{item.location}</Text>
                                                        </TouchableOpacity>
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


                                        }

                                    </View>

                                </View>
                            )}
                            keyExtractor={item => "" + item.id}
                        />
                    </SafeAreaView>
                </ScrollView>
                {bannerUrlImage ?
                    <View style={{ height: getDimen(0.2), width: getDimen(1), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'white', marginTop: 0 }}>
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
            </View>
        </View >
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
export default ProfileScreen;
