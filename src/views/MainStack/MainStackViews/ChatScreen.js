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
import { Button, Icon, Item, Input, CheckBox, ListItem, Body, Picker } from 'native-base';
import { storeData, getData } from '../../../utils/asyncStore';


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

    const [checked, setChecked] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [tokens, setTokens] = React.useState('');
    const [selectedValue, setSelectedValue] = React.useState('');
    const [colleaguesData, setColleaguesData] = React.useState();
    const [allColleagues, setAllColleagues] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [checked1, setChecked1] = React.useState(true);
    const [checked2, setChecked2] = React.useState(false);
    global.listData = [{}];
    // global.name = '';
    useEffect(() => {
        tokens ? getDropValue() : getData('userData').then((data) => setTokens(JSON.parse(data).token))
    }, [tokens])

    useEffect(() => { getSearchData() }, [])
    const getDropValue = () => {
        if (selectedValue === 'key0') {
            const my = 'my'
            getColleaguesList(my);
        } else {
            const my = 'all'
            getColleaguesList(my);
        }
        return undefined;
    }

    const getSearchData = () => {
        let data = {

            "search_type": "all",
            "search_query": searchValue

        }
        fetch("http://arc.softwaresolutions.website/api/v1/search-colleagues", {
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

                console.log('listLog1', res.data);

                setAllColleagues(res.data);



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
        return undefined;
    }

    const getColleaguesList = (my) => {
        let data = {
            "search_type": my
        }
        fetch("http://arc.softwaresolutions.website/api/v1/search-colleagues", {
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

                console.log('listLog1', res.data);
                //setAllColleagues([]);
                //listData = res.data;
                setAllColleagues(res.data);
                //console.log('listLog1', allColleagues);
                //  name = listData.name;
                //  console.log('listLog1', name);

                // for(var i =0;i<listData.length;i++){

                //  }


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
        return undefined;
    }






    return (


        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            {/* {getColleaguesList()} */}

            {console.log("allColleagues :  " + JSON.stringify(allColleagues))}

            <ScrollView style={styles.container}>
                <View style={{ flex: 0.1, backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center', marginTop: getDimen(0.0) }}>
                    <View style={{ flex: 0.2, flexDirection: 'row', width: '100%', }}>
                        <View style={{ backgroundColor: 'white', height: getDimen(0.125), width: getDimen(0.8), justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                                {/* <TouchableOpacity onPress={() => getColleaguesList()}> */}
                                <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>MY COLLEAGUES</Text>
                                {/* </TouchableOpacity> */}
                            </View>

                        </View>



                    </View>


                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(0.2), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>


                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>$000,000</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), color: 'gray', }}>
                            {/* <Input placeholder='$000,000'
                            style={{ fontSize: getDimen(0.038) }}
                        />
                        <Icon active name='arrow' /> */}
                            <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.20) - 10, marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'center', }}>

                                <CheckBox
                                    onPress={() => setChecked1(!checked1)}
                                    checked={checked1} color="#94803F"
                                />

                                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04) }}>All Colleagues</Text>

                                <CheckBox
                                    onPress={() => setChecked2(!checked2)}
                                    checked={checked2} color="#94803F" />
                                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04) }}>My Colleagues</Text>


                            </View>
                        </Item>
                    </View>

                    <View style={{
                        flexDirection: 'row', borderWidth: 1, borderColor: '#ebebe0',
                        height: getDimen(0.1), width: '98%'
                    }}>

                        <TextInput
                            keyboardType="default"

                            placeholderTextColor="gray"
                            autoCapitalize="none"
                            placeholder="Search colleagues..."
                            keyboardType='email-address'
                            style={{ width: '80%', marginLeft: getDimen(0.05), marginRight: getDimen(0.05), height: getDimen(0.1) }}
                            // style={{ marginLeft: getDimen(0.05), marginRight: getDimen(0.05), marginTop: getDimen(0.08) }}
                            onChangeText={(val) => setSearchValue(val)}
                        />

                        <TouchableOpacity onPress={() => getSearchData()}>
                            <Image source={require('../../../assets/icons/6.png')}
                                style={{ height: getDimen(0.07), width: getDimen(0.07), justifyContent: 'center', marginTop: 6 }} />
                        </TouchableOpacity>



                        {/* <View style={{ height: 1, width: getDimen(0.95), marginLeft: getDimen(0.08), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.004), }}></View> */}
                    </View>



                </View>

                <FlatList
                    ///// Search List Screen
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 0, }}
                    data={allColleagues}
                    renderItem={({ item, separators, index }) => (
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Colleague List')} >
                            <View>
                                <View style={{ borderRadius: 0, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10 }}>

                                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.28), marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                        <View style={{
                                            flex: 0.25, height: '100%', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', backgroundColor: 'white', marginTop: getDimen(0.05)
                                        }}>
                                            <Image source={{
                                                uri: `${item.profile_image_url}`,
                                            }}
                                                style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop: getDimen(0), borderRadius: 40 }}
                                            />
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