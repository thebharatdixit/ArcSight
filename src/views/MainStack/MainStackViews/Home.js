import * as React from 'react';

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
    SafeAreaView,
    Share,
    ToastAndroid,
    Alert,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Input, CheckBox, ListItem, Body } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import ProfileScreen from '../MainStackViews/ProfileScreen';
import MyColleagueScreen from '../MainStackViews/MyColleague';
import { getData } from '../../../utils/asyncStore';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];


// const Item = ({ title, route }) => (
//     <View style={{ flex: 1 }}>
//         <View style={{ width: '100%', height: getDimen(0.2), flexDirection: 'row', alignItems: 'center', paddingLeft: getDimen(0.02),paddingRight: getDimen(0.03) ,backgroundColor: 'white' }}>
//             {
//                 (title.userinfo.profile_image_url === 'http://arc.softwaresolutions.website/images/UserImages/' || '') ?
//                     <Image source={require('../../../assets/icons/2.png')}
//                         style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
//                     :
//                     <Image source={{
//                         uri: `${title.userinfo.profile_image_url}`
//                     }}
//                         style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2), borderRadius: getDimen(0.1) }} />
//             } 

//             <View style={{flexDirection: 'row', width: '100%', backgroundColor:'white' , marginLeft: getDimen(0.02),}}>
//                 {/* <TouchableOpacity onPress={() => Alert.alert('name')}> */}

//                 <View style={{ backgroundColor:'white', flexDirection:'column',width:'40%'}}>
//                     <TouchableOpacity onPress={() => console.log(title)}>

//                         <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
//                             {(title && title.userinfo) ? title.userinfo.name : ''}
//                         </Text>
//                         <Text style={{ fontSize: getDimen(0.035), paddingRight: getDimen(0.02), alignContent: 'space-between' , marginTop: getDimen(0.01)}}>
//                             Listed 2 Days Ago
//                         </Text>
//                     </TouchableOpacity>
//                     </View>

//                 <View style={{ backgroundColor:'white', width:'35%', alignContent:'flex-end', alignItems:'flex-end'}}>

//                     <Text style={{ color: 'gray', paddingRight: 7 }}>
//                         {(title && title.userinfo) ? title.userinfo.company_name : ''}
//                     </Text>
//                 </View>
//                 <View style={{ backgroundColor:'white', width:'10%', paddingLeft: getDimen(0)}}>
//                     <TouchableOpacity onPress={() => onShare()}>
//                         <Image source={require('../../../assets/icons/20.png')}
//                             style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => navigateToChatLayout(title)}>
//                         <Image source={require('../../../assets/icons/25.png')}
//                             style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
//                     </TouchableOpacity>

//                 </View>

//             </View>
//         </View>

//         <View style={styles.item}>

//             {
//                 (title.main_image_url === 'http://arc.softwaresolutions.website/images/UserImages/' || '') ?
//                     <Image source={require('../../../assets/icons/19.png')}
//                         style={{ height: '100%', width: '100%' }} />
//                     :
//                     <Image source={{
//                         uri: `${title.main_image_url}`
//                     }}
//                         style={{ height: '100%', width: '100%' }} />
//             } 


//             {/* <View style={{ width: '100%', alignItems: 'flex-end', flexDirection: 'column', backgroundColor: 'orange' }}>

//                 <View style={{  justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e' }}>
//                     <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>$00000</Text>
//                 </View>
//                 <View style={{  justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35' }}>
//                     <Text style={{ fontSize: getDimen(0.035), fontWeight: '600', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>For Sale</Text>
//                 </View>
//             </View> */}
//             <View style={{ width: '100%', alignItems: 'flex-end', position: 'absolute', bottom: 0, }}>
//                 <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e', height: getDimen(0.1), width: getDimen(0.3), }}>
//                     <Text style={{
//                        textAlign: 'center', color: 'white',
//                         textAlignVertical: 'center', fontWeight:'700', fontSize:getDimen(0.04)
//                     }}>
//                         $0,000,000
//                 </Text>
//                 </View>

//                 <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35', height: getDimen(0.1), width: getDimen(0.3), }}>
//                     <Text style={{
//                        backgroundColor: '#f1ac35', textAlign: 'center', color: 'white',
//                         textAlignVertical: 'center', fontWeight: '700', fontSize: getDimen(0.05)
//                     }}>
//                         {(title) ? title.listing_type : ''}
//                     </Text>
//                 </View>


//             </View>
//         </View>
//     </View>
// );




function MainScreen({ navigation }) {
    const [accessToken, setAccessToken] = React.useState('')
    const [homeList, setHomeList] = React.useState([])
    const [webUrl, setWerUrl] = React.useState('')

    React.useEffect(() => {
        console.log('Search screen');
        getData('userData').then((data) => {
            const userData = JSON.parse(data);
            const listTokens = userData.token;
            setAccessToken(listTokens);
            console.log('Search Screen Token', listTokens)

            if (accessToken) {
                console.log('Prachi123')
                homeListingApiIntegration();
            }
        })
    }, [accessToken])
    const onShare = async () => {
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
    const homeListingApiIntegration = () => {
        fetch("http://arc.softwaresolutions.website/api/v1/search/listing", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "listing": "all",
            })
        }).then(res => res.json())
            .then(res => {
                if (res.status) {
                    console.log('Home Listing Data', JSON.stringify(res.data));
                    setHomeList(res.data)
                    setWerUrl(homeList && homeList.data && homeList.data.web_share_url)
                    console.log('homeList', homeList.data)
                    console.log('WebUrl', webUrl)
                    // Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false })
                } else {
                    console.log('Home Listing Error', res.message);
                    Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }
            })
            .catch(err => {
                console.error("error: ", err);
            });
    }


    const renderItem = ({ item }) => (
        <Item title={item} />
    );

    return (

        <View style={{ flex: 1 }} >
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
            <View style={{ flex: 0.90 }}>
                <View style={{ height: getDimen(0.12), width: getDimen(1), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'white', marginTop: 0 }}>
                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.14), marginTop: getDimen(0), marginRight: 10, alignItems: 'center', }}>
                        <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>TOP LISTINGS</Text>
                        </View>
                    </View>
                </View>

                <ScrollView>

                    <SafeAreaView >
                        <FlatList
                            data={homeList.data}
                            renderItem={({ renderItem, index, item }) => (
                                <View style={{ flex: 1 }}>
                                    <View style={{ width: '100%', height: getDimen(0.2), flexDirection: 'row', alignItems: 'center', paddingLeft: getDimen(0.02), paddingRight: getDimen(0.03), backgroundColor: 'white' }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('Colleague List', ({ "name": item.userinfo.name, "companyName": item.userinfo.company_name, "profile_image_url": item.userinfo.profile_image_url, "isFriend": item.is_friend, "userId": item.user_id }))}>
                                        {
                                            (item.userinfo.profile_image_url === undefined || item.userinfo.profile_image_url === null || item.userinfo.profile_image_url === 'http://arc.softwaresolutions.website/images/UserImages/' || '') ?
                                                <Image source={require('../../../assets/icons/2.png')}
                                                    style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                                                :
                                                <Image source={{
                                                    uri: `${item.userinfo.profile_image_url}`
                                                }}
                                                    style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2), borderRadius: getDimen(0.1) }} />
                                        }
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'white', marginLeft: getDimen(0.02), }}>
                                            {/* <TouchableOpacity onPress={() => Alert.alert('name')}> */}

                                            <View style={{ backgroundColor: 'white', flexDirection: 'column', width: '40%' }}>
                                                <TouchableOpacity onPress={() => navigation.navigate('Colleague List', ({ "name": item.userinfo.name, "companyName": item.userinfo.company_name, "profile_image_url": item.userinfo.profile_image_url, "isFriend": item.is_friend, "userId": item.user_id }))}>

                                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                        {(item && item.userinfo) ? item.userinfo.name : ''}
                                                    </Text>
                                                    <Text style={{ fontSize: getDimen(0.035), paddingRight: getDimen(0.02), alignContent: 'space-between', marginTop: getDimen(0.01) }}>
                                                        Listed 2 Days Ago
                        </Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ backgroundColor: 'white', width: '35%', alignContent: 'flex-end', alignItems: 'flex-end' }}>

                                                <Text style={{ color: 'gray', paddingRight: 7 }}>
                                                    {(item && item.userinfo) ? item.userinfo.company_name : ''}
                                                </Text>
                                            </View>
                                            <View style={{ backgroundColor: 'white', width: '10%', paddingLeft: getDimen(0) }}>
                                                <TouchableOpacity onPress={() => onShare()}>
                                                    <Image source={require('../../../assets/icons/20.png')}
                                                        style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => navigation.navigate('Chat Layout', ({ "fetch_chat_user_id": item.user_id, "name": item.userinfo.name, "companyName": item.userinfo.company_name, "profile_image_url": item.userinfo.profile_image_url }))}>
                                                    <Image source={require('../../../assets/icons/25.png')}
                                                        style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                </TouchableOpacity>

                                            </View>

                                        </View>
                                    </View>

                                    <View style={styles.item}>

                                        {
                                            (item.main_image_url === 'http://arc.softwaresolutions.website/images/UserImages/' || '') ?
                                                <Image source={require('../../../assets/icons/19.png')}
                                                    style={{ height: '100%', width: '100%' }} />
                                                :
                                                <Image source={{
                                                    uri: `${item.main_image_url}`
                                                }}
                                                    style={{ height: '100%', width: '100%' }} />
                                        }


                                        {/* <View style={{ width: '100%', alignItems: 'flex-end', flexDirection: 'column', backgroundColor: 'orange' }}>
                
                <View style={{  justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e' }}>
                    <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>$00000</Text>
                </View>
                <View style={{  justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35' }}>
                    <Text style={{ fontSize: getDimen(0.035), fontWeight: '600', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>For Sale</Text>
                </View>
            </View> */}
                                        <View style={{ width: '100%', alignItems: 'flex-end', position: 'absolute', bottom: 0, }}>
                                            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e', height: getDimen(0.1), width: getDimen(0.3), }}>
                                                <Text style={{
                                                    textAlign: 'center', color: 'white',
                                                    textAlignVertical: 'center', fontWeight: '700', fontSize: getDimen(0.04)
                                                }}>
                                                    $0,000,000
                </Text>
                                            </View>

                                            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35', height: getDimen(0.1), width: getDimen(0.3), }}>
                                                <Text style={{
                                                    backgroundColor: '#f1ac35', textAlign: 'center', color: 'white',
                                                    textAlignVertical: 'center', fontWeight: '700', fontSize: getDimen(0.05)
                                                }}>
                                                    {(item) ? item.listing_type : ''}
                                                </Text>
                                            </View>


                                        </View>
                                    </View>
                                </View>
                            )}

                            keyExtractor={item => '' + item.id}
                        />
                    </SafeAreaView>
                </ScrollView>

            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        top: 2,
        width: '100%',
        height: '100%'
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
    item: {
        backgroundColor: '#d2d6d5',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: getDimen(0.9),
        marginVertical: getDimen(0.001),

    }
});
// const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default MainScreen;
