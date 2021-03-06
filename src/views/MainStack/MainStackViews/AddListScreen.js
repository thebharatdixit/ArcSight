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
    TouchableWithoutFeedback,
    Alert,
    Share,
    SafeAreaView
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { changeCounter } from '../../../actions/navigationAction'

import SplashScreen from 'react-native-splash-screen'
import { getData } from '../../../utils/asyncStore';
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

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
function AddList({ navigation }) {


    const [searchTerm, setSearchTerm] = React.useState('');
    const [chatData, setChatData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [accessToken, setAccessToken] = React.useState('')
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [showLoader, setShowLoader] = React.useState('');
    const isFocused = useIsFocused();
    const [length, setLength] = React.useState()

    const searchUpdated = (term) => {
        setSearchTerm(term);
        setTimeout(() => {
            filterArray(term);
        }, 1000);
    }

    const filterArray = (term) => {
        const fltrdData = chatData.filter(createFilter(term, KEYS_TO_FILTERS))
        setFilteredData(fltrdData);
    }
    React.useEffect(() => {
        getData('userData').then((data) => {
            const userData = JSON.parse(data);
            const listTokens = userData.token;
            setAccessToken(listTokens);
            // console.log('token1', listTokens)
            if (accessToken) {
                chatListApiIntegration();
            }

        })

    }, [accessToken])

    React.useEffect(() => {
        getData('userData').then((data) => {
            const userData = JSON.parse(data);
            const listTokens = userData.token;
            setAccessToken(listTokens);
            // console.log('token1', listTokens)
            if (accessToken) {
                chatListApiIntegration();
            }

        })

    }, [isFocused])

    const chatListApiIntegration = () => {

        setShowLoader('');
        fetch("https://arcsightapp.com/api/v1/chat-users", {
            method: "get",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: ''
        }).then(res => res.json())
            .then(res => {
                console.log('chatData: ', JSON.stringify(res))
                setShowLoader('hide');
                if (res.status) {
                    setChatData(res.data);
                    setFilteredData(res.data);
                    setLength((res && res.data) ? res.data.length : '')
                    // AsyncStorage.clear();
                    // navigation.navigate('Login Screen');
                    // Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false })
                } else {
                    console.log('No data');
                    Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }
            })
            .catch(err => {
                console.error("error: ", err);
            });

    }
    return (

        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', flexDirection: 'column' }}>
            {/* <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity style={{ height: 25, width: 25 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../../../assets/images/back.png')}
                        style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
                
                <Text style={{ fontSize: getDimen(0.055), marginLeft: getDimen(0.15) }}>Chat List </Text>

                <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />


            </View> */}
            <View style={{ width: '100%', flex: 0.11, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity style={{ height: '100%', justifyContent: 'center' }} onPress={() => {
                    changeCounter(Math.random())
                    navigation.dispatch(DrawerActions.toggleDrawer())
                }
                }>
                    <Image source={require('../../../assets/icons/3.png')}
                        style={{ height: 25, width: 25 }} />
                </TouchableOpacity>

                <View style={{ width: '95%', height: '100%', backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <Text style={{ fontSize: getDimen(0.055), marginLeft: getDimen(0.035) }}>Chat List </Text>

                    <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                </View>
            </View>

            <SearchInput
                onChangeText={(term) => { searchUpdated(term) }}
                style={{ height: 50, marginLeft: getDimen(.025), alignSelf: 'flex-start', fontSize: getDimen(.045), padding: getDimen(.035), borderColor: '#CCC', }}
                placeholder="Enter to search.."
            />
            <View style={{ height: 1, width: '100%', backgroundColor: '#8A8A8A' }}></View>

            <SafeAreaView style={{ flex: 1 }}>

                {
                    (length === 0 || length === '') ?
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'white', alignItems: 'center', marginTop: getDimen(0.4) }}>
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
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Chat Layout', ({ "fetch_chat_user_id": item.fetch_chat_user_id, "name": item.name, "companyName": item.company_name, "profile_image_url": item.profile_image_url }))} >
                            <View>
                                <View style={{ borderRadius: 0, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10 }}>

                                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.25), marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                        <View style={{
                                            flex: 0.25, height: '100%', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', backgroundColor: 'white', marginTop: getDimen(0.02)
                                        }}>
                                            {/* <Image
                                                    source={{ uri: item.profile_image_url }}
                                                    defaultSource={require('../../../assets/icons/2.png')}
                                                    // source={require('../../../assets/icons/2.png')}
                                                    style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0), borderRadius: getDimen(0.18) / 2 }}
                                                /> */}
                                            {console.log("item.profile_image_url : ", item.profile_image_url)}
                                            {
                                                (item.profile_image_url) ? <Image
                                                    source={{
                                                        uri: `${item.profile_image_url}`,
                                                    }}
                                                    defaultSource={require('../../../assets/icons/2.png')}
                                                    style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0), borderRadius: 40 }}
                                                /> :
                                                    <Image source={require('../../../assets/icons/2.png')}
                                                        style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0), borderRadius: getDimen(0.18) / 2 }} />
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

                                        </View>
                                        {item.unread_message || item.unread_message > 0 ?
                                            <View style={{ marginLeft: getDimen(0.05), height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ height: getDimen(0.045), width: getDimen(0.045), borderRadius: getDimen(0.045) / 2, backgroundColor: '#f1ac35', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: getDimen(0.030), fontWeight: 'bold', color: 'white' }}>{item.unread_message ? item.unread_message : ""}</Text>
                                                </View>
                                            </View>
                                            : null}

                                    </View>
                                </View>
                                <View style={{ height: 1, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'gray' }}></View>

                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => '' + item.fetch_chat_user_id}
                />

            </SafeAreaView>



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
        flex: 0.90,
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
const mapStateToProps = (state) => ({

});
const mapDispatchToProps = {
    changeCounter
}
const AddListScreen = connect(mapStateToProps, mapDispatchToProps)(AddList);
export default AddListScreen;
