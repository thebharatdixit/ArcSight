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
    FlatList,
    Share,
    Alert,
    Picker
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { getDimen } from '../../../dimensions/dimen';
import ImagePicker from 'react-native-image-picker';
import { storeData, getData } from '../../../utils/asyncStore';
import { createList } from '../../../actions/createListAction';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';


function PropertyScreen({ navigation }) {

    const [filePath, setFilePath] = React.useState('')
    const [picture, setPicture] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [bedroom, setBedroom] = React.useState('');
    const [bath, setBath] = React.useState('');
    const [homeType, setHomeType] = React.useState('');
    const [squreFeet, setSqureFeet] = React.useState('');
    const [amenities, setAmenities] = React.useState('');
    const [yearBuilt, setYearBuilt] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [selectedValue, setSelectedValue] = React.useState("House");
    const [tokens, setTokens] = React.useState('');
    const [imgs, setImgs] = React.useState('');
    const [imgList, setImgList] = React.useState([]);
    let temp='';


    let imageUrls = {
        "imgUrl": ''
    }

    getData('userData').then((data) => {
        const userData = JSON.parse(data);
        const listTokens = userData.token;
        setTokens(listTokens);
        console.log('token1', listTokens)
        // const tokens = userData.token;
        // setAccessToken(tokens)
        // console.log('userDataPrachi:', userData)
        // console.log('UserAccessToken67777Prachi:', 'Bearer ' + accessToken )
    })
    //const tokens = datas.token;
    function createProperty() {


        //console.log('token',tokens);
        const formData = new FormData();

        formData.append('home_type', 'House');
        formData.append('sq_feet', 4500);
        formData.append('bedrooms', 5);
        formData.append('bathrooms', 2);
        formData.append('terrace', '');
        formData.append('listing_type', 'For Sale');
        formData.append('state', 'Punjab');
        formData.append('city', 'Ludhiana');
        formData.append('zipcode', 141001);
        formData.append('location', 'Prem nagar civil lines Ludhiana');
        formData.append('year_built', 2019);
        formData.append('price_per_sq_feet', 25);
        formData.append('price', 2500);
        formData.append('taxes', 25);
        formData.append('amenities[]', 1);
        formData.append('amenities[]', 2);
        formData.append('description', 'Testing');
        formData.append('is_featured', 'yes');
        formData.append('main_image', '');
        formData.append('listing_images[]', '');

        fetch("http://arc.softwaresolutions.website/api/v1/create-listing", {
            method: "post",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${tokens}`,
            },
            body: formData,
        }).then(res => res.json())
            .then(res => {

                console.log('listLog', res.message);
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


        // createList(formData).then((response) => {
        //     if (response.status) {
        //         storeData('isLogin', 'true');
        //         storeData('userData', JSON.stringify(response.data));


        //     }
        //     else {
        //         Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
        //     }

        // })


    }

    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    chooseFile = () => {
        var options = {
            title: 'Select Image',

            // customButtons: [
            //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            // ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
                //console.log('hello india')
            } else {

                //console.log('hello')
                let source = { uri: response.uri };
                setFilePath(source);
                //responseUri: response
                // const source = { uri: response.uri };
                // setPicture(source);
                // console.log(picture);
                // // const temp = response.data;
                // // const fileUri = response.uri;
                // // console.log(fileUri);

                // //Or:
                // // if (Platform.OS === 'android') {
                // //     source = { uri: response.uri, isStatic: true };
                // // } else {
                // //     source = { uri: response.uri.replace('file://', ''), isStatic: true };
                // // }
                // // You can also display the image using data:
                // // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                // //  this.setState({
                // //     filePath: source
                // // });

                // // console.log(temp);
                // // setFilePath(source);
                // // <Image source={{ uri: data.path }} style={{ width: 100, height: 100 }} />
                // // console.log('SetFilePath', setFilePath)
            }
        });
    };




    selectFile = () => {
        var options = {
            title: 'Select Image',

            // customButtons: [
            //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            // ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
           // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
                //console.log('hello india')
            } else {

                //console.log('hello')
                imageUrls.imgUrl = { uri: response.uri };
                 temp = imageUrls.imgUrl;
                 setImgs(temp);
                 //storeData('imgObj',setImgList(imgs))
                setImgList(imgs);
               // console.log('uriLog',JSON.stringify(getData('imgObj')));

                console.log('uriLog',JSON.stringify(imgList));


            }
        });
    };




    return (
        <View style={{flex:1}}>
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
        <View style={{flex:0.90, width: '100%', height: '100%', backgroundColor: 'white', alignContent: 'flex-end', flexDirection: 'column' }}>
            <View style={{ backgroundColor: 'white', height: getDimen(0.125), width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>ADD LISTING</Text>
                </View>
                {/* <TouchableOpacity onPress={chooseFile.bind(this)}>
                    <View style={{ backgroundColor: '#f1ac35', height: getDimen(0.125), width: getDimen(0.5), justifyContent: 'center', alignContent: 'center', marginLeft: getDimen(0.01) }}>
                        <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#f1ac35', textAlign: 'center' }}>IMAGE UPLOAD</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
            <ScrollView style={styles.container}>
                <View>
                    <View style={{ borderRadius: 0, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10 }}>

                        <View style={{ backgroundColor: '#E6E6E6', flex: 1, width: '100%', height: getDimen(.55), marginTop: 0, marginRight: 0, borderRadius: 5, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center' }}>

                            <TouchableOpacity
                                // onPress={() => Alert.alert('Plus icon clicked!')}
                                onPress={chooseFile.bind(this)}
                            >
                                {filePath === '' ?
                                    <Image
                                        style={{ resizeMode: 'cover', alignSelf: 'center', height: getDimen(0.2), width: getDimen(0.2), borderRadius: getDimen(.32) / 2 }}
                                        source={{ uri: "" }}
                                        defaultSource={require('../../../assets/icons/plus.png')}
                                    /> :
                                    <Image
                                        style={{ resizeMode: 'cover', alignSelf: 'center', height: getDimen(0.55), width: getDimen(0.2), borderRadius: getDimen(.32) / 2 }}
                                        source={filePath}
                                    />
                                }


                                {/* <Image source={require('../../../assets/icons/plus.png')}
                                    style={{ height: getDimen(0.07), width: getDimen(0.07) }} />

                                <Image source={{ picture }}  /> */}


                                {/* <Image source={require({filePath})}
                                    style={{ height: getDimen(0.07), width: getDimen(0.07) }} /> */}
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Address</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='123 Street Name'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setAddress(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>State</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='State'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setCity(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>


                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>City</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='City State'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setCity(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Zip Code</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='Zip Code'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setCity(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Location</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='Location'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setCity(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>



                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Price</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='$000,000,000'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setPrice(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Price per squre feet</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='Price per squre feet'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setCity(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Bedrooms</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='2'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setBedroom(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Baths</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='00'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setBath(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Home Type</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="House " value="House " />
                                <Picker.Item label="Townhouse " value="Townhouse " />
                            </Picker>
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Square Feet</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='0,000'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setSqureFeet(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Terrace</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='Terrace'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setCity(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Listing Type</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='Listing Type'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setCity(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Amenities </Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="House " value="House " />
                                <Picker.Item label="Townhouse " value="Townhouse " />
                            </Picker>
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Year Built</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='0000'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setYearBuilt(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Property image URL</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='Enter your property image URL'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setImageUrl(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>


                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Property video URL</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='Enter your property video URL'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setImageUrl(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Description</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='Description'
                                style={{ fontSize: getDimen(0.038), }}
                                onChangeText={(val) => setCity(val)}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>


                    <View style={{ width: '100%', height: getDimen(0.1), alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>

                        <TouchableOpacity onPress={selectFile.bind(this)}>
                            <Text style={{ backgroundColor: '#D7D4D3', paddingLeft: getDimen(0.1), paddingRight: getDimen(0.1), paddingTop: 5, paddingBottom: 5 }}>
                                Choose File...
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ width: '100%', height: getDimen(0.1), alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                        <Image
                            style={{ resizeMode: 'cover', alignSelf: 'center', height: getDimen(0.55), width: getDimen(0.2), borderRadius: getDimen(.32) / 2 }}
                            source={temp}
                        />

                    </View>

                </View>

            </ScrollView>

            <View style={{ height: getDimen(0.16), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'white', marginTop: 0 }}>
                <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.14), marginTop: getDimen(-0.01), alignItems: 'center', }}>
                    <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => createProperty()}
                        >
                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>SUBMIT</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </View >
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: getDimen(0.02),
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
export default PropertyScreen;
