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
    Share
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';

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
function ChatScreen({ navigation }) {

    const dummyData = [
        // mainSt: '1234 Main St',
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
    ];

    const [chatData, setChatData] = React.useState([]);
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');

    
    return (

        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <ScrollView style={styles.container}>
                <View style={{ flex: 0.1, backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center', marginTop: getDimen(0.0) }}>
                    <View style={{ flex: 0.2, flexDirection: 'row', width: '100%', }}>
                        <View style={{ backgroundColor: 'white', height: getDimen(0.125), width: getDimen(0.8), justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                                <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>MY COLLEAGUES</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ flex: 0.2, flexDirection: 'row', width: '100%', }}>
                        <View style={{ backgroundColor: 'white', height: getDimen(0.28), width: getDimen(0.92), justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ height: getDimen(0.125), width: getDimen(0.92), justifyContent: 'center', alignContent: 'center' }}>
                                <Item style={{ marginLeft: getDimen(0.04), color: '#8d8865', textAlign: 'justify', marginTop: getDimen(0), color: '#8d8865', }}>
                                    <Input placeholder='Search Colleagues'
                                        style={{ fontSize: getDimen(0.048), }}

                                    />
                                </Item>
                            </View>
                            <View style={{ height: 1, width: getDimen(0.95), marginLeft: getDimen(0.08), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.004), }}></View>
                        </View>

                    </View>

                </View>

                <FlatList
                    ///// Search List Screen
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 0, }}
                    data={dummyData}
                    renderItem={({ item, separators, index }) => (
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Colleague List')} >
                            <View>
                                <View style={{ borderRadius: 0, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10 }}>

                                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.28), marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                        <View style={{
                                            flex: 0.25, height: '100%', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', backgroundColor: 'white', marginTop: getDimen(0.05)
                                        }}>
                                            <Image source={require('../../../assets/icons/2.png')}
                                                style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0) }}
                                            />
                                        </View>
                                        <View style={{ flex: 1, height: '100%', }}>
                                            <View style={{ marginLeft: getDimen(0.05), marginTop: getDimen(0.05) }}>
                                                <Text style={{ fontSize: getDimen(0.045), fontWeight: 'bold' }}>Name Here..</Text>
                                                <Text style={{ fontSize: getDimen(0.043), marginTop: getDimen(0.01), color: 'gray' }}
                                                    numberOfLines={2}
                                                >
                                                    Real Estate Company
                                            </Text>

                                            </View>

                                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0), marginLeft: getDimen(0) }}>

                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0), marginLeft: getDimen(0), marginRight: getDimen(0.01), marginBottom: getDimen(0.03) }}>
                                                    <TouchableOpacity onPress={() => Alert.alert('Do you want to delete')}>
                                                        <Image source={require('../../../assets/icons/cross.png')}
                                                            style={{ height: getDimen(0.038), width: getDimen(0.038), marginRight: getDimen(0.03) }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => onShare()}>
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
                    keyExtractor={item => item.id}
                />
            </ScrollView>
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
export default ChatScreen;