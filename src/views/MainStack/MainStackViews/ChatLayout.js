import React, { useCallback, useState, useRef, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'

import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, TextInput, FlatList, Alert, ActivityIndicator, KeyboardAvoidingView, Keyboard, EmitterSubscription, KeyboardEvent, Animated, Platform } from 'react-native'

import { getData } from '../../../utils/asyncStore';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { fetchChat, sendChat } from '../../../actions/chatAction';

// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';

function ChatLayout({ route, navigation }) {


    const { fetch_chat_user_id } = route.params ? route.params : ""
    const { name } = route.params ? route.params : ""
    const { companyName } = route.params ? route.params : ""
    const { profile_image_url } = route.params ? route.params : ""
    // const [messages, setMessages] = React.useState([]);
    const [comment, setcomment] = React.useState('');
    const [chatList, setchatList] = React.useState([]);
    const [showChat, setshowChat] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [cmpanyName, setCmpanyName] = React.useState('');
    const [profileImage, setProfileImage] = React.useState('');
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);
    const [inputHeight, setinputHeight] = React.useState(40);
    const [chatContainerHeight, setchatContainerHeight] = React.useState(2);
    const [inputBoxHeight, setinputBoxHeight] = React.useState(getDimen(.10));
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [accessToken, setAccessToken] = React.useState('')
    const [userId, setUserId] = React.useState('')
    // const [flatRef, setFlatRef] = useRef(null);
    const scrollViewRef = useRef();
    // const ref = useRef<{
    //     keyboardShowListener?: EmitterSubscription,
    //     keyboardHideListener?: EmitterSubscription
    // }>({})
    // const [ref, setRef] = React.i = useRef('flatlist');
    // const [keyboardHeight, setKeyboardHeight] = useState(0);



    const searchUpdated = (term) => {
        setSearchTerm(term);
        setTimeout(() => {
            filterArray();
        }, 1000);
    }

    const filterArray = () => {
        const filteredData = chatList.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
    }

    React.useEffect(() => {
        const didBlurSubscription = navigation.addListener(
            'willFocus',
            payload => {
                console.log('willFocus', payload);
            }
        );
        getData('userData').then((data) => {
            const userData = JSON.parse(data);
            const listTokens = userData.token;
            // const userData = 
            console.log('USER id : ' + userData.user.id);
            setAccessToken(listTokens);
            setUserId(userData.user.id)
            console.log('token1', listTokens)

            if (accessToken) {
                loadChatList();
            }

        })

    }, [accessToken])

    useEffect(() => {
        setUsername(name);
        setCmpanyName(companyName);
        setProfileImage(profile_image_url);
        // ref.current.keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => console.log('didshowkeyboard'));
        // ref.current.keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => console.log('didhidekeyboard'));
        // return () => {
        //     Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
        //     Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
        // };
    }, []);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = (e) => {
        if (Platform.OS === 'ios') {
            const chatHeight = (e.endCoordinates.height - getDimen(.8));
            console.log('chatheight:: ' + chatHeight + " :: " + getDimen(1.32) + " :: " + getDimen(.12) + " :: " + e.endCoordinates.height);
            setchatContainerHeight(chatHeight);

        } else {
            setchatContainerHeight(getDimen(1.32));

        }
    };

    const _keyboardDidHide = () => {
        console.log("Keyboard Hidden");
        setchatContainerHeight(10);
    };




    const changeBoxSize = () => {
        setchatContainerHeight(10);
    }

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        console.log('chatstructure: ' + JSON.stringify(messages));
    }, [])

    const loadChatList = () => {
        var fetchedUserId = fetch_chat_user_id;
        console.log('fetch_chat_user_id: ' + fetchedUserId + "token: " + accessToken);
        console.log('access token error');
        let data = {
            "fetch_chat_user_id": fetch_chat_user_id,
        }
        let token = accessToken;
        fetchChat(token, data).then((response) => {
            setTimeout(() => {
                ShowAlertWithDelay();
            }, 1000);
            if (response.status) {
                setchatList(response.data);
                setcomment('');
            }
            else {
                Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }

        })

    }

    const ShowAlertWithDelay = () => {
        setshowChat('loaded');
        // this.setState({ showChat: 'loaded' });
    }

    const sendComment = () => {
        // console.log('feedList : '+JSON.stringify(this.props.feedList));
        // console.log('commentPos : '+this.props.commentPos);

        if (!comment) {
            Alert.alert('', 'Please add some comment to post.', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (comment.trim() === '') {
            Alert.alert('', 'Please add some comment to post.', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });

            return;
        }

        getData('userData').then((userData) => {
            console.log('USER reson id : ' + JSON.stringify(userData));
            const userdata = JSON.parse(userData);
            console.log('USER id : ' + userdata.user.id);
            let data = {
                "recipient_id": fetch_chat_user_id,
                "message": comment
            }
            let token = accessToken;
            sendChat(token, data).then((response) => {
                setTimeout(() => {
                    ShowAlertWithDelay();
                }, 1000);
                if (response.status) {
                    loadChatList();
                    setcomment('');
                }
                else {
                    Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }

            })
        })

    }


    const renderItem1 = ({ item }) => (

        <View>
            <View style={{ flex: 0.8, flexDirection: "column", marginLeft: 0, marginRight: 15, marginTop: 10, marginBottom: 10, backgroundColor: '#ECECEC', width: '70%', alignSelf: 'flex-end', borderRadius: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', width: '100%', marginLeft: 10, marginRight: 10 }}>

                    <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}>

                        <Text style={styles.name}>{item.user_name} </Text>
                        <Text style={styles.title}>{item.message} </Text>
                        <Text style={styles.date}>{item.sent_date} </Text>

                    </View>
                </View>
            </View>
            <View style={{ flex: 0.2, flexDirection: "column", }}>

            </View>

            {/* {this.state.showChat === '' ? <View style={{ width: '100%', height: '100%', marginTop: 5, position: 'absolute', backgroundColor: 'white' }} >
                <ActivityIndicator animating={true} style={{ width: '100%', height: '100%', position: 'absolute', alignSelf: 'center', alignItems: 'center', justifyContent: "center" }}></ActivityIndicator>
            </View> : null} */}
        </View>

    );

    const renderItem2 = ({ item }) => (

        <View>
            <View style={{ flex: 0.8, flexDirection: "column", marginLeft: 0, marginRight: 15, marginTop: 10, marginBottom: 10, backgroundColor: '#FEEDD5', width: '70%', alignSelf: 'flex-start', borderRadius: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', width: '100%', marginLeft: 10, marginRight: 10 }}>

                    <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}>

                        <Text style={styles.name}>{item.sender_name} </Text>
                        <Text style={styles.title}>{item.message} </Text>
                        <Text style={styles.date}>{item.sent_date} </Text>

                    </View>
                </View>
            </View>
            <View style={{ flex: 0.2, flexDirection: "column", }}>

            </View>

            {/* {this.state.showChat === '' ? <View style={{ width: '100%', height: '100%', marginTop: 5, position: 'absolute', backgroundColor: 'white' }} >
                <ActivityIndicator animating={true} style={{ position: 'absolute', alignSelf: 'center', alignItems: 'center', justifyContent: "center" }}></ActivityIndicator>
            </View> : null} */}
        </View>
    );


    getRenderView = () => {
        return (
            <SafeAreaView style={{ height: '100%', width: '100%', flexDirection: 'column', flex: 1 }}>
                {/* <View style={styles.headerIconView}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 0.80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', marginLeft: 15 }}>
                    <Image style={styles.backButtonIcon} source={require('../../../assets/images/back.png')} />
                    <Text style={styles.titleViewText}>Ez chat</Text>
                </TouchableOpacity>
                <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>

                </View>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: '#EAEAEA' }}></View> */}

                <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ height: 25, width: 25 }} onPress={() => navigation.goBack()}>
                        <Image source={require('../../../assets/icons/back.png')}
                            style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    {/* <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}> */}
                    {/* <Image
                    source={{ uri: profile_image_url }}
                    defaultSource={require('../../../assets/icons/2.png')}
                    // source={require('../../../assets/icons/2.png')}
                    style={{ height: getDimen(0.1), width: getDimen(0.1), marginLeft: getDimen(0.025), borderRadius: getDimen(0.1) / 2 }} /> */}

                    {
                        (profile_image_url) ? <Image
                            source={{
                                uri: `${profile_image_url}`,
                            }}
                            style={{ height: getDimen(0.1), width: getDimen(0.1), marginLeft: getDimen(0.025), borderRadius: getDimen(0.1) / 2 }}
                        /> :
                            <Image source={require('../../../assets/icons/2.png')}
                                style={{ height: getDimen(0.1), width: getDimen(0.1), marginLeft: getDimen(0.025), borderRadius: getDimen(0.1) / 2 }} />
                    }

                    <Text style={{ fontSize: getDimen(0.035), marginLeft: getDimen(0.015) }}>{username} </Text>
                    <Text style={{ fontSize: getDimen(0.025) }}>{"(" + cmpanyName + ")"} </Text>

                    {/* <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} /> */}
                    {/* </View> */}


                </View>
                <View style={{ width: '100%', flex: 0.90,  }} >
                    {(!chatList || chatList.length === 0) ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../../assets/images/logo.png')} style={{ height: '20%', width: 180, resizeMode: 'contain' }} />
                            {/* <Text style={{ justifyContent: 'center', width: '100%', alignSelf: 'center', textAlign: 'center' }}>Please start chat to interact</Text> */}


                        </View>
                        :

                        <FlatList
                            inverted={false}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            style={{ paddingLeft: 10, marginTop: 10 }}
                            data={chatList}
                            // ref={React.useRef("flatlist")}
                            // onContentSizeChange={() => useRef('flatlist').scrollToEnd({ animated: false })}
                            ref={scrollViewRef}
                            onContentSizeChange={(contentWidth, contentHeight) => { scrollViewRef.current.scrollToEnd({ animated: false }) }}
                            // onContentSizeChange={() => flatRef.current.scrollToEnd({ animated: false })}
                            renderItem={({ item, separators, index }) => {

                                if (item.right_side_message === 'yes') {
                                    return renderItem1({ item });
                                }
                                return renderItem2({ item });
                            }}

                            keyExtractor={item => item.key}
                        />
                    }

                    {
                        (showChat === '') ?
                            <View
                                style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%' }}
                            >
                                <ActivityIndicator size="large" color="#2b5f9c" style={{ position: 'absolute', rotation: 180 }} />
                            </View>
                            :
                            null
                    }
                    {/* {this.state.showChat === '' ? <View style={{ width: '100%', height: '100%', marginTop: 5, position: 'absolute', backgroundColor: 'white' }} >
                <ActivityIndicator animating={true} style={{ width: '100%', height: '100%', position: 'absolute', alignSelf: 'center', alignItems: 'center', justifyContent: "center" }}></ActivityIndicator>
            </View> : null} */}

                    <View style={{ backgroundColor: '#DADADA', width: '100%', height: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}></View>
                    <View style={{ marginBottom: 10 }}>
                        {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled> */}
                        <View style={{
                            flexDirection: 'row', justifyContent: 'flex-end',
                            borderWidth: 0, borderColor: '#2B5F9C', justifyContent: 'flex-end', height: 50,

                        }}>
                            <TextInput autoCapitalize={'none'}
                                style={{ flex: 6, paddingLeft: 15 }}
                                placeholder="Type a message here..."
                                placeholderTextColor='gray'
                                //onChangeText={(comment) => this.setState({ comment: comment })}
                                value={comment}
                                onSubmitEditing={() => changeBoxSize()}
                                onChangeText={(comment) => setcomment(comment)}

                                underlineColorAndroid='transparent' />

                            <TouchableOpacity style={{ flex: 1, marginLeft: 5, alignSelf: 'center', }} onPress={() => { sendComment() }}>
                                <Image source={require('../../../assets/images/right-arrow.png')} style={{ height: 25, width: 25, tintColor: '#f1ac35' }} />


                            </TouchableOpacity>
                        </View>
                        {/* </KeyboardAvoidingView> */}
                    </View>
                </View>







            </SafeAreaView >
        )
    }



    return (
        Platform.OS === 'ios' ?
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                {this.getRenderView()}
            </KeyboardAvoidingView>
            :
            this.getRenderView()


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
    headerIconView: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 0.10,
        height: getDimen(.12),
        backgroundColor: 'tomato',
    },
    headerBackButtonView: {
        alignSelf: 'center',
        width: 25,
        height: 25,
        position: 'absolute',
        left: 15,
    },
    ImageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: 5
    },
    backButtonIcon: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        tintColor: 'white'
    },
    titleViewText: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft: 10,
        marginRight: 10,
        // position: 'absolute',
        // left: 50,
    },
});
// const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default ChatLayout;
