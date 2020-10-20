import React, { useEffect } from 'react';
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
    TouchableWithoutFeedback,
    Alert,
    Share
} from 'react-native';
import { login } from '../../../actions/loginAction';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body, Picker } from 'native-base';
import { storeData, getData } from '../../../utils/asyncStore';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { changeCounter } from '../../../actions/navigationAction'


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

const KEYS_TO_FILTERS = ['name', 'company_name'];
function Chat({ route, navigation, changeCounter }) {

    const [checked, setChecked] = React.useState(false);

    const [tokens, setTokens] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedValue, setSelectedValue] = React.useState('');
    const [colleaguesData, setColleaguesData] = React.useState();
    const [allColleagues, setAllColleagues] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [checked1, setChecked1] = React.useState(true);
    const [checked2, setChecked2] = React.useState(false);
    const [showLoader, setShowLoader] = React.useState('');
    const [showAll, setShowAll] = React.useState(true);
    const [showMy, setShowMy] = React.useState(false);
    const [name, setName] = React.useState('All Colleagues');
    const [isFriend, setIsFriend] = React.useState('');
    const [bannerUrlImage, setBannerUrl] = React.useState('');
    const isFocused = useIsFocused();
    const [length, setLength] = React.useState()

    global.listData = [{}];

    const searchUpdated = (term) => {
        setSearchTerm(term);
        setTimeout(() => {
            filterArray(term);
        }, 1000);
    }

    const filterArray = (term) => {
        const fltrdData = allColleagues.filter(createFilter(term, KEYS_TO_FILTERS))
        setFilteredData(fltrdData);
    }
    // global.name = '';
    useEffect(() => {
        tokens ? getDropValue() : getData('userData').then((data) => setTokens(JSON.parse(data).token))
    }, [tokens, isFocused, name])

    React.useEffect(() => {
        getData('bannerUrl').then((bannerUrl) => {
            getData('userData').then((userData) => {

                const userdataMain = JSON.parse(userData);
                console.log('USER reson id in Collegue screen : ' + JSON.stringify(userdataMain) + "bannerUrl:: " + bannerUrl);
                var isProUser = userdataMain.user.pro_user;
                if (isProUser === "no") {
                    setBannerUrl(bannerUrl);
                }
                else {
                    setBannerUrl("");
                }


            })
        })

        console.log('On Collegue screen');
        callLoginApi();


    }, [isFocused])

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




    const getDropValue = () => {
        if (showAll == true) {
            const val = "all"

            getColleaguesList(val);
        } else if (showMy == true) {
            const val = "my"
            getColleaguesList(val)
        }
        return undefined;
    }


    const showHideAll = () => {

        if (showAll == true) {
            setShowAll(false)
            setShowMy(true)
            setName('My Colleagues')
        } else {
            setShowAll(true)
            setShowMy(false)
            setName('All Colleagues')
        }




    }

    const showHideMy = () => {
        if (showMy == true) {
            setShowMy(false)
            setShowAll(true)
            setName('All Colleagues')
        } else {
            setShowMy(true)
            setShowAll(false)
            setName('My Colleagues')
        }



    }



    const getColleaguesList = (value) => {

        setShowLoader('');
        let data = {
            "search_type": value
        }
        fetch("https://arcsightapp.com/api/v1/search-colleagues", {
            method: "post",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${tokens}`,
            },
            body: JSON.stringify(
                data
            ),
        }).then(res => res.json())
            .then(res => {
                //console.error(" res.data: " + JSON.stringify(res.data));

                setAllColleagues(res.data);
                setFilteredData(res.data);
                setLength((res && res.data) ? res.data.length : '')
                console.log('Colleguage Data Lengthhhhh:', length)
                setShowLoader('hide');
            })
            .catch(err => {
                console.error("error Search colleagues : ", err);
            });
        return undefined;
    }

    const addColleagues = (id) => {

        setShowLoader('');

        fetch("https://arcsightapp.com/api/v1/add-colleague", {
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
                    getDropValue()
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

        fetch("https://arcsightapp.com/api/v1/remove-colleague", {
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
                    getDropValue()
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
            //alert("hello I am add Colleague method"+userId)
        } else {
            removeColleagu(userId);
            //alert("hello I am remove Colleague method" + userId)
        }
    }






    return (

        <View style={{ width: '100%', height: '100%', flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
            {/* header start */}
            <View style={{ width: '100%', backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
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

            {/* header close */}

            {/* all colleagues mu colleagues title  start*/}


            <View style={{ backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center', marginTop: getDimen(0.0) }}>
                <View style={{ flexDirection: 'row', width: '100%', }}>
                    <View style={{ backgroundColor: 'white', height: getDimen(0.125), width: getDimen(0.8), justifyContent: 'center', alignContent: 'center' }}>
                        <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                            {/* <TouchableOpacity onPress={() => getColleaguesList()}> */}
                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>{name}</Text>
                            {/* </TouchableOpacity> */}
                        </View>

                    </View>
                </View>

            </View>

            {/* all colleagues mu colleagues title  close*/}

            {/* allcolleagues mycolleagues check start */}

            <View style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', height: getDimen(0.3 / 2), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'center', justifyContent: 'center' }}>

                <View style={{ marginRight: getDimen(0.05), flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => showHideAll()}>

                        {/* {showAll ? (
                            <Image source={require('../../../assets/icons/check.png')}
                                style={{ height: getDimen(0.04), width: getDimen(0.04) }} />
                        ) : <Image source={require('../../../assets/icons/uncheck.png')}
                            style={{ height: getDimen(0.04), width: getDimen(0.04) }} />} */}

                        {showAll ? (
                            <Image source={require('../../../assets/icons/Check.png')}
                                style={{ height: getDimen(0.04), width: getDimen(0.04) }} />
                        ) : <Image source={require('../../../assets/icons/uncheck.png')}
                            style={{ height: getDimen(0.04), width: getDimen(0.04) }} />}

                    </TouchableOpacity>
                    <Text style={{ marginLeft: getDimen(0.05) }}>All Colleagues</Text>

                </View>
                <View style={{ marginRight: getDimen(0.05), flexDirection: 'row', alignItems: 'center' }}>

                    <TouchableOpacity onPress={() => showHideMy()}>

                        {/* {showMy ? (
                            <Image source={require('../../../assets/icons/check.png')}
                                style={{ height: getDimen(0.04), width: getDimen(0.04) }} />
                        ) : <Image source={require('../../../assets/icons/uncheck.png')}
                            style={{ height: getDimen(0.04), width: getDimen(0.04) }} /> } */}

                        {showMy ? (
                            <Image source={require('../../../assets/icons/Check.png')}
                                style={{ height: getDimen(0.04), width: getDimen(0.04) }} />
                        ) : <Image source={require('../../../assets/icons/uncheck.png')}
                            style={{ height: getDimen(0.04), width: getDimen(0.04) }} />}


                    </TouchableOpacity>
                    <Text style={{ marginLeft: getDimen(0.05) }}>My Colleague</Text>

                </View>
            </View>

            {/* allcolleagues mycolleagues check close */}

            {/* search colleague start */}

            <View style={{
                flexDirection: 'row',
                height: getDimen(0.3 / 2), width: '100%', alignItems: 'center', borderColor: '#ebebe0', borderWidth: 1, marginLeft: getDimen(0.05), marginRight: getDimen(0.05), width: '90%',
            }}>

                <TextInput
                    keyboardType="default"

                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    placeholder="Search colleagues..."
                    keyboardType='email-address'
                    style={{ height: getDimen(0.3 / 2), paddingLeft: getDimen(0.02) }}
                    // style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.08) }}
                    onChangeText={(val) => searchUpdated(val)}
                />

                {/* <TouchableOpacity onPress={() => getSearchData()}>
                            <Image source={require('../../../assets/icons/6.png')}
                                style={{ height: getDimen(0.07), width: getDimen(0.07), justifyContent: 'center', marginTop: 6 }} />
                        </TouchableOpacity> */}



                {/* <View style={{ height: 1, width: getDimen(0.95), marginLeft: getDimen(0.08), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.004), }}></View> */}
            </View>

            {/* search colleague close */}


            {/* flatlist view start */}
            <View style={{ width: '100%', height: '100%', flexDirection: 'column', backgroundColor: 'white' }}>

                {
                    (length === 0 || length === '') ?
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'white', alignItems: 'center', marginTop: getDimen(0.3) }}>
                            <Text style={{ textAlign: 'center' }}>No Data Found</Text>
                        </View>
                        :
                        null
                }
                <FlatList
                    ///// Search List Screen
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 0, }}

                    data={filteredData}
                    renderItem={({ item, separators, index }) => (
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Colleague List', ({ "name": item.name, "companyName": item.company_name, "profile_image_url": item.profile_image_url, "isFriend": item.is_friend, "userId": item.id }))} >
                            <View>
                                <View style={{ borderRadius: 0, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10 }}>

                                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.28), marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                        <View style={{
                                            flex: 0.25, height: '100%', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', backgroundColor: 'white', marginTop: getDimen(0.05)
                                        }}>
                                            {
                                                (item.profile_image_url === undefined || item.profile_image_url === null || item.profile_image_url === 'https://arcsightapp.com/images/UserImages/' || item.profile_image_url === '') ?
                                                <Image source={require('../../../assets/icons/2.png')}
                                                style={{ height: getDimen(0.18), width: getDimen(0.18) }} />:
                                                <Image
                                                source={{
                                                    uri: `${item.profile_image_url}`,
                                                }}
                                                defaultSource={require('../../../assets/icons/2.png')}
                                                style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0), borderRadius: 40 }}
                                            /> 
                                                       
                                            }

                                        </View>
                                        <View style={{ flex: 1, height: '100%', }}>
                                            <View style={{ marginLeft: getDimen(0.05), marginTop: getDimen(0.05) }}>
                                                <Text style={{ fontSize: getDimen(0.045), fontWeight: 'bold' }}>{item.name}</Text>
                                                <Text style={{ fontSize: getDimen(0.043), marginTop: getDimen(0.01), color: 'gray' }}
                                                    numberOfLines={2}
                                                >
                                                    {item.company_name}
                                                </Text>

                                            </View>

                                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0), marginLeft: getDimen(0) }}>

                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0), marginLeft: getDimen(0), marginRight: getDimen(0.01), marginBottom: getDimen(0.03) }}>
                                                    <TouchableOpacity onPress={() => addAndRemoveColleague(item.is_friend, item.id)}>
                                                        {(item.is_friend === 'no') ? (
                                                            <Image source={require('../../../assets/icons/dmyCollegue.png')}
                                                                style={{ height: getDimen(0.065), width: getDimen(0.065) }} />
                                                        ) : (<Image source={require('../../../assets/icons/cross.png')}
                                                            style={{ height: getDimen(0.030), width: getDimen(0.030), marginRight: getDimen(0.03) }} />)}
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => navigation.navigate('Chat Layout', ({ "name": item.name, "companyName": item.company_name, "fetch_chat_user_id": item.id, "profile_image_url": item.profile_image_url }))}>
                                                        <Image source={require('../../../assets/icons/25.png')}
                                                            style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>

                                        </View>

                                    </View>
                                </View>
                                <View style={{ height: 1, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'gray' }}></View>

                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => "" + item.id}
                />

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

                <View style={{ marginBottom: getDimen(0.6) }}>

                </View>
            </View>


            {/* search colleague close */}





        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: getDimen(0),
        width: getDimen(1),

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
//export default ChatScreen;

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = {
    changeCounter
}
const ChatScreen = connect(mapStateToProps, mapDispatchToProps)(Chat);
export default ChatScreen;
