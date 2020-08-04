import React, { useEffect, useState } from 'react';

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
    Alert,
    Picker
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import ProfileScreen from '../MainStackViews/ProfileScreen';
import MyColleagueScreen from '../MainStackViews/MyColleague';


const Drawer = createDrawerNavigator();

function SearchScreen({ navigation }) {

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checkedForSale, setCheckedForSale] = useState(false);
    const [checkedForRent, setCheckedForRent] = useState(false);
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [selectedValue, setSelectedValue] = useState("Swift");
    return (
        <View style={{ backgroundColor: 'blue', flex: 1 }}>



            <View style={{ height: getDimen(0.14), width: getDimen(1), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'white', marginTop: 0 }}>
                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.14), marginTop: getDimen(-0.01), marginRight: 10, alignItems: 'center', }}>
                    <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>SEARCH LISTINGS</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.container}>


                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.20) - 10, marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'center', }}>

                    <CheckBox
                        onPress={() => setChecked1(!checked1)}
                        checked={checked1} color="#94803F" 
                        />
                   
                    <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04) }}>All Listing</Text>

                    <CheckBox
                        onPress={() => setChecked2(!checked2)}
                        checked={checked2} color="#94803F" />
                    <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04) }}>Colleague Listings</Text>
                    <CheckBox
                        onPress={() => setChecked3(!checked3)}
                        checked={checked3} color="#94803F" />
                    <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04) }}>My Listings</Text>

                </View>
                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                    <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Location</Text>
                    {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop:getDimen(0.025), color:'gray',}}>Current Location / City,State / Zip Code</Text> */}
                    <Item style={{ marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), color: 'gray', }}>
                        <Input placeholder='Current Location / City,State / Zip Code'
                            style={{ fontSize: getDimen(0.038), }}

                        />
                    </Item>
                </View>
                <View style={{ height: 1, width: getDimen(0.92), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865' }}></View>

                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.20) - 10, marginTop: getDimen(0.01), marginRight: 10, borderRadius: 0, alignItems: 'center', }}>

                    <CheckBox
                    onPress={() => setCheckedForSale(!checkedForSale)}
                    checked={checkedForSale} color="#94803F" />

                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04) }}>For Sale</Text>

                <CheckBox
                    onPress={() => setCheckedForRent(!checkedForRent)}
                    checked={checkedForRent} color="#94803F" />
                    
                    <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04) }}>For Rent</Text>

                </View>
                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                    <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Price</Text>
                    {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>$000,000</Text> */}
                    <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), color: 'gray', }}>
                        <Input placeholder='$000,000'
                            style={{ fontSize: getDimen(0.038) }}
                        />
                        <Icon active name='arrow' />
                    </Item>
                </View>
                <View style={{ height: 1, width: getDimen(0.92), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865' }}></View>

                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.18), marginTop: getDimen(0.05), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Bedrooms</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>00</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), color: 'gray', }}>
                            <Input placeholder='00'
                                style={{ fontSize: getDimen(0.038), }}
                            />
                        </Item>
                    </View>
                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 10, marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Baths</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>00</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), color: 'gray', }}>
                            <Input placeholder='00'
                                style={{ fontSize: getDimen(0.038), }}
                            />
                        </Item>
                    </View>
                </View>

                <View style={{ height: 1, width: getDimen(0.92), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865' }}></View>
                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.05), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                    <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Home Type</Text>
                    {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                    <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                        <Input placeholder='Co-op / Condo'
                            style={{ fontSize: getDimen(0.038), }}

                        />
                        <Icon active name='arrow' />
                    </Item>
                </View>
                <View style={{ height: 1, width: getDimen(0.92), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.18), marginTop: getDimen(0.05), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Square Feet</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Minimum</Text> */}
                        <Item style={{ marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), color: 'gray', }}>
                            <Input placeholder='Minimum'
                                style={{ fontSize: getDimen(0.038), }}

                            />
                            <Icon active name='arrow' />
                        </Item>
                    </View>
                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>To</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Maximum</Text> */}
                        <Item style={{ marginLeft: getDimen(0.04), color: '#7F7F93', marginTop: getDimen(0), }}>
                            <Input placeholder='Maximum'
                                style={{ fontSize: getDimen(0.038), }}
                            />
                            <Icon active name='arrow' />
                        </Item>
                    </View>
                </View>

                <View style={{ height: 1, width: getDimen(0.92), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.01) }}></View>


            </ScrollView>
            <View style={{ height: getDimen(0.16), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'white', marginTop: 0 }}>
                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.14), marginTop: getDimen(-0.01), marginRight: 10, alignItems: 'center', }}>
                    <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Search List')}
                        >
                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>SEARCH</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ backgroundColor: '#a43d3e', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                        <TouchableOpacity
                            // onPress={() => navigation.goBack()}
                            onPress={() => Alert.alert('Reset')}
                        >
                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>RESET</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
                <Drawer.Screen name="MyColleagueScreen" component={MyColleagueScreen} />

                </Drawer.Navigator>
        </View>
    );
}

// const StackList = createStackNavigator();
// function SearchListScreen({ navigation }) {
//     return (
//         <StackList.Navigator>
//             <StackList.Screen
//                 name="SearchList"
//                 component={SearchList}
//             />
//         </StackList.Navigator>
//     )
// }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: 0,
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
        alignSelf: 'center',
        color: '#8d8865'
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
export default SearchScreen;