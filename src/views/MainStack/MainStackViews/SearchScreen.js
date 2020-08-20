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
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body, Picker } from 'native-base';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import ProfileScreen from '../MainStackViews/ProfileScreen';
import MyColleagueScreen from '../MainStackViews/MyColleague';
import { getData } from '../../../utils/asyncStore';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 28.5838, lng: 77.3597 } },
};
const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 28.628454, lng: 77.376945 } },
};


function SearchScreen({ navigation }) {

    const data = [
        { id: '1', value: '20,000', },
        { id: '2', value: '10,000', },
        { id: '3', value: '5,000', },
    ];
    const [userId, setUserId] = React.useState('')
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checkedForSale, setCheckedForSale] = useState(false);
    const [checkedForRent, setCheckedForRent] = useState(false);
    const [bedRoom, setBedroom] = React.useState('00');
    const [bathRoom, setBathroom] = React.useState('00');
    const [location, setLocation] = React.useState('');
    const [selectedValue, setSelectedValue] = React.useState('50,0000');
    const [homeType, setHomeType] = React.useState('Home');
    const [sqFeetMin, setSqFeetMin] = React.useState('5,000');
    const [sqFeetMax, setSqFeetMax] = React.useState('10,000');
    const [accessToken, setAccessToken] = React.useState('')
    const [listing, setListing] = React.useState('my')
    const [searchList, setSearchList] = React.useState([])
    const [alertMessage, setAlertMessage] = React.useState('')
    const [forSaleText, setForSaleText] = React.useState('For Sale')
    const [forRentText, setForRentText] = React.useState('For Rent')


    const allButton = () => {
        setChecked1(true)
        setChecked2(false)
        setChecked3(false)
        setListing('all')
    }

    const colleagueButton = () => {
        setChecked1(false)
        setChecked2(true)
        setChecked3(false)
        setListing('colleague')
    }

    const myButton = () => {
        setChecked1(false)
        setChecked2(false)
        setChecked3(true)
        setListing('my')
    }
    const forSale = () => {
        if (checkedForSale == true) {
            setCheckedForSale(false)
            setForSaleText('')
        } else {
            setCheckedForSale(true)
            setForSaleText('For Sale')
        }
    }

    const forRent = () => {
        if (checkedForRent == true){
            setCheckedForRent(false)
            setForRentText('')
        }else{
            setCheckedForRent(true)
            setForRentText('For Rent')
        }
    }

    React.useEffect(() => {

        console.log('Search screen');
        getData('userData').then((data) => {
            const userData = JSON.parse(data);
            const listTokens = userData.token;
            console.log('USER id : ' + userData.user.id);
            setAccessToken(listTokens);
            setUserId(userData.user.id)
            console.log('Search Screen Token', listTokens)

            if (accessToken) {
                console.log('Prachi123')
                searchListingApiIntegration();
            }
        })

    }, [accessToken])

    const searchListingApiIntegration = () => {
        console.log('Search Details', listing, location, homeType, bedRoom, bathRoom, selectedValue, sqFeetMin, sqFeetMax, forSaleText, forRentText)
        fetch("http://arc.softwaresolutions.website/api/v1/search/listing", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "listing": "my",
                "location": "ludhiana",
                "home_type": "",
                "listing_type": [
                    "For Sale"
                ],
                "bedrooms": 5,
                "bathrooms": 2,
                "price": 2500,
                "sq_feet_min": 4000,
                "sq_feet_max": 4600
                // "bedrooms": parseInt(bedRoom),
                // "bathrooms": parseInt(bathRoom),
                // "price": parseInt(selectedValue),
                // "sq_feet_min": parseInt(sqFeetMin),
                // "sq_feet_max": parseInt(sqFeetMax)
            })
        }).then(res => res.json())
            .then(res => {
                if (res.status) {
                    console.log(listing, location, homeType, bedRoom, bathRoom, selectedValue, sqFeetMin, sqFeetMax)
                    console.log('Search Listing', res.message);
                    console.log('Search Data', JSON.stringify(res.data));
                    setSearchList(res.data)
                    setAlertMessage(res.message)
                    // Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false })
                } else {
                    console.log('Search Listing Error', res.message);
                    setAlertMessage(res.message)
                    // Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }
            })
            .catch(err => {
                console.error("error: ", err);
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                }>
                    <Image source={require('../../../assets/icons/3.png')}
                        style={{ height: 25, width: 25 }} />
                </TouchableOpacity>

                <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} />

                    <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                </View>
            </View>
            <View style={{ backgroundColor: 'blue', flex: 0.90 }}>

                <View style={{ height: getDimen(0.14), width: getDimen(1), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'white', marginTop: 0 }}>
                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.14), marginTop: getDimen(-0.01), marginRight: 10, alignItems: 'center', }}>
                        <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>SEARCH LISTINGS</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.container}
                    keyboardShouldPersistTaps='always'
                >

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.20) - 10, marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'center', }}>
                        <TouchableOpacity
                            onPress={() => allButton()}
                        >
                            <View style={{ backgroundColor: 'white', flexDirection: 'row', height: '100%', marginTop: 0, marginRight: 0, borderRadius: 0, alignItems: 'center', justifyContent: 'center', marginLeft: getDimen(0.026) }}>

                                {checked1 ? (
                                    <Image source={require('../../../assets/icons/radio.png')}
                                        style={{ height: getDimen(0.06), width: getDimen(0.06), }} />
                                ) : <Image source={require('../../../assets/icons/circle.png')}
                                    style={{ height: getDimen(0.06), width: getDimen(0.06), }} />}

                                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.01), textAlign: 'center', textAlignVertical: 'center' }}>All Listing</Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ marginLeft: getDimen(-0.006) }}
                            onPress={() =>
                                colleagueButton()
                            }
                        >
                            <View style={{ backgroundColor: 'white', flexDirection: 'row', height: '100%', marginTop: 0, marginRight: 0, borderRadius: 0, alignItems: 'center', justifyContent: 'center', marginLeft: getDimen(0.028) }}>
                                {
                                    checked2 ? (
                                        <Image source={require('../../../assets/icons/radio.png')}
                                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                    ) :
                                        <Image source={require('../../../assets/icons/circle.png')}
                                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                }

                                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.01) }}>Colleague Listings</Text>
                            </View>


                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ marginLeft: getDimen(-0.006) }}
                            onPress={() =>
                                myButton()
                            }>
                            <View style={{ backgroundColor: 'white', flexDirection: 'row', height: '100%', marginTop: 0, marginRight: 0, borderRadius: 0, alignItems: 'center', justifyContent: 'center', marginLeft: getDimen(0.028) }}>
                                {
                                    checked3 ? (
                                        <Image source={require('../../../assets/icons/radio.png')}
                                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                    ) :
                                        <Image source={require('../../../assets/icons/circle.png')}
                                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                }

                                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.01) }}>My Listings</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Location</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop:getDimen(0.025), color:'gray',}}>Current Location / City,State / Zip Code</Text> */}
                        <GooglePlacesAutocomplete
                            placeholder='Current Location / City,State / Zip Code'
                            autoFocus={false}
                            returnKeyType={'default'}
                            fetchDetails={true}
                            currentLocation={true}
                            keyboardShouldPersistTaps={'handled'}
                            styles={{
                                textInputContainer: {
                                    width: '100%',
                                    marginTop: 10
                                },
                                textInput: {
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginTop: 0,
                                    marginBottom: 0,
                                    height: '98%'
                                }
                            }}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log('Google Details => ', data, details);
                            }}
                            query={{
                                key: 'AIzaSyDx8L9iRu5yyvqdw6pvPFUOdgdUjOq6S2k',
                                language: 'en',
                            }}
                        //  predefinedPlaces={[homePlace, workPlace]}
                        />
                        {/* <Item style={{ marginLeft: getDimen(0.03), marginRight: getDimen(0.03), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), color: 'gray', }}>
                        <Input placeholder='Current Location / City,State / Zip Code'
                            style={{ fontSize: getDimen(0.038), }}
                            onChangeText={(val) => setLocation(val)}

                        />
                    </Item> */}
                    </View>
                    {/* <View style={{ height: 1, width: getDimen(0.92), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865' }}></View> */}

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.20) - 10, marginTop: getDimen(0.01), marginRight: 10, borderRadius: 0, alignItems: 'center', }}>
                        <TouchableOpacity
                            style={{ marginLeft: getDimen(-0.006) }}
                            onPress={() =>
                                forSale()
                            }>
                            <View style={{ backgroundColor: 'white', flexDirection: 'row', height: '100%', marginTop: 0, marginRight: 0, borderRadius: 0, alignItems: 'center', justifyContent: 'center', marginLeft: getDimen(0.03) }}>
                                {
                                    checkedForSale ? (
                                        <Image source={require('../../../assets/icons/tick.png')}
                                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                    ) :
                                        <Image source={require('../../../assets/icons/circle.png')}
                                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                }

                                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.02) }}>For Sale</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ marginLeft: getDimen(-0.006) }}
                            onPress={() =>
                                forRent()
                            }>
                            <View style={{ backgroundColor: 'white', flexDirection: 'row', height: '100%', marginTop: 0, marginRight: 0, borderRadius: 0, alignItems: 'center', justifyContent: 'center', marginLeft: getDimen(0.05) }}>
                                {
                                    checkedForRent ? (
                                        <Image source={require('../../../assets/icons/tick.png')}
                                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                    ) :
                                        <Image source={require('../../../assets/icons/circle.png')}
                                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                }

                                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.02) }}>For Rent</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>

                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Price</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>$000,000</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.02), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), color: 'gray', }}>
                            {/* <Input placeholder='$000,000'
                            style={{ fontSize: getDimen(0.038) }}
                        />
                        <Icon active name='arrow' /> */}
                            <Picker
                                note
                                mode="dropdown"
                                iosIcon={<Icon />}
                                style={{ width: getDimen(0.95), backgroundColor: 'transparent', marginLeft: getDimen(-0.03) }}
                                placeholder="$00,0000"
                                placeholderStyle={{ color: "black", fontSize: 14 }}
                                placeholderIconColor="#a43d3e"
                                selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue, itemIndex)}
                            >
                                <Picker.Item label="20,000" value="20,000" />
                                <Picker.Item label="40,000" value="40,000" />
                                <Picker.Item label="100,000" value="100,000" />
                                <Picker.Item label="100,000" value="2500" />

                            </Picker>
                        </Item>
                    </View>
                    {/* <View style={{ height: 1, width: getDimen(0.92), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865' }}></View> */}

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.18), marginTop: getDimen(0.05), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Bedrooms</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>00</Text> */}
                            <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), color: 'gray', }}>
                                <Input placeholder='00'
                                    style={{ fontSize: getDimen(0.038), }}
                                    onChangeText={(val) => setBedroom(val)}
                                />
                            </Item>
                        </View>
                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 10, marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Baths</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>00</Text> */}
                            <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), color: 'gray', }}>
                                <Input placeholder='00'
                                    style={{ fontSize: getDimen(0.038), }}
                                    onChangeText={(val) => setBathroom(val)}
                                />
                            </Item>
                        </View>
                    </View>

                    {/* <View style={{ height: 1, width: getDimen(0.92), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865' }}></View> */}
                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.05), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Home Type</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            {/* <Input placeholder='Co-op / Condo'
                            style={{ fontSize: getDimen(0.038), }}

                        />
                        <Icon active name='arrow' /> */}
                            <Picker
                                note
                                mode="dropdown"
                                iosIcon={<Icon />}
                                style={{ width: getDimen(0.92), backgroundColor: 'transparent', marginLeft: getDimen(-0.03) }}
                                placeholder="Home"
                                placeholderStyle={{ color: "black", fontSize: 14 }}
                                placeholderIconColor="#a43d3e"
                                selectedValue={homeType}
                                onValueChange={(itemValue, itemIndex) => setHomeType(itemValue, itemIndex)}
                            >
                                <Picker.Item label="Townhouse" value="Townhouse" />
                                <Picker.Item label="Co-op / Condo" value="Co-op / Condo" />
                                <Picker.Item label="Land" value="Land" />
                                <Picker.Item label="Home" value="Home" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </Item>
                    </View>
                    {/* <View style={{ height: 1, width: getDimen(0.92), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.18), marginTop: getDimen(0.05), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>Square Feet</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Minimum</Text> */}
                            <Item style={{ marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), color: 'gray', }}>
                                {/* <Input placeholder='Minimum'
                                style={{ fontSize: getDimen(0.038), }}

                            />
                            <Icon active name='arrow' /> */}
                                <Picker
                                    note
                                    mode="dropdown"
                                    iosIcon={<Icon />}
                                    style={{ width: getDimen(0.92), backgroundColor: 'transparent', marginLeft: getDimen(-0.03) }}
                                    placeholder="$00,00"
                                    placeholderStyle={{ color: "black", fontSize: 14 }}
                                    placeholderIconColor="#a43d3e"
                                    selectedValue={sqFeetMax}
                                    onValueChange={(itemValue, itemIndex) => setSqFeetMax(itemValue, itemIndex)}
                                >
                                    <Picker.Item label="0,000" value="0,000" />
                                    <Picker.Item label="600" value="600" />
                                    <Picker.Item label="5,000" value="5,000" />
                                    <Picker.Item label="4000" value="4000" />
                                </Picker>
                            </Item>
                        </View>
                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18), marginTop: 0, marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.04), textAlign: 'justify', }}>To</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Maximum</Text> */}
                            <Item style={{ marginLeft: getDimen(0.04), color: '#7F7F93', marginTop: getDimen(0), }}>
                                {/* <Input placeholder='Maximum'
                                style={{ fontSize: getDimen(0.038), }}
                            />
                            <Icon active name='arrow' /> */}
                                <Picker
                                    note
                                    mode="dropdown"
                                    iosIcon={<Icon />}
                                    style={{ width: getDimen(0.92), backgroundColor: 'transparent', marginLeft: getDimen(-0.03) }}
                                    placeholder="$00"
                                    placeholderStyle={{ color: "black", fontSize: 14 }}
                                    placeholderIconColor="#a43d3e"
                                    selectedValue={sqFeetMin}
                                    onValueChange={(itemValue, itemIndex) => setSqFeetMin(itemValue, itemIndex)}
                                >
                                    <Picker.Item label="0,000" value="0,000" />
                                    <Picker.Item label="600" value="600" />
                                    <Picker.Item label="5,000" value="5,000" />
                                    <Picker.Item label="4600" value="4600" />
                                </Picker>
                            </Item>
                        </View>
                    </View>

                    {/* <View style={{ height: 1, width: getDimen(0.92), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.01) }}></View> */}


                </ScrollView>
                <View style={{ height: getDimen(0.16), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'white', marginTop: 0 }}>
                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.14), marginTop: getDimen(-0.01), marginRight: 10, alignItems: 'center', }}>
                        <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log('searchListJsonOnPress', JSON.stringify(searchList))
                                    //    console.log('searchListJson', JSON.stringify(searchList.data[0].location))
                                    // searchListingApiIntegration()
                                    Alert.alert('', alertMessage, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                                    navigation.navigate('Search List', ({ "SearchList": searchList }))
                                }
                                }
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
            </View>
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