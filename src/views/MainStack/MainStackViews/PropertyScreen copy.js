import React, { useEffect, useState, Component } from 'react';

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
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import SplashScreen from 'react-native-splash-screen'
// import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body, Picker } from 'native-base';
//import CustomMultiPicker from "react-native-multiple-select-list";
import { getDimen } from '../../../dimensions/dimen';
import ImagePicker from 'react-native-image-picker';
import { storeData, getData } from '../../../utils/asyncStore';
import { createList } from '../../../actions/createListAction';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { fetchAminities } from '../../../actions/addListingActions';


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

var temp = '';

class PropertyScreen extends Component {
    // state = {
    //     arrFavourite: [],
    //     stickyHeaderIndices: [1, 2, 3, 4, 5, 6],
    //     selectedType: 'key1',

    // }

    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {

            code: '',
            filePath: [],
            imgs: '',
            imgList: '',
            aminitiesList: [],
            selectdItems: [],
            selected: '',
            address: '',
            city: '',
            arrSelectedAminities: [],


        }
    }

    componentDidMount() {
        // var from = this.props.navigation.getParam('from');
        
        // const { navigation } = this.props;
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            // The screen is focused
            // Call any action
            this.getAminities();
            console.log('insidedidfocus');
            this.focusListernerTask();
        });

        // this.focusListener = this.props.navigation.addListener('didFocus', () => {
        //     console.log('insidedidfocus');
            
        // });

    }

    focusListernerTask = () => {
        getData('selectedAminitiesData').then((selectedAminitiesData) => {
            if (selectedAminitiesData && selectedAminitiesData.length > 0) {
                console.log('USER reson id : ' + JSON.stringify(selectedAminitiesData));
                const selectedAminitiesDataArr = JSON.parse(selectedAminitiesData);
                var strArr = [];
                for (let i = 0; i < selectedAminitiesDataArr.length; i++) {
                    let item = selectedAminitiesDataArr[i];
                    let data = {
                        "name": item.name,
                    }
                    strArr.push(data)
                }
                this.setState({ arrSelectedAminities: strArr });
            }
            else {
                console.log('elsecase');
                this.setState({ arrSelectedAminities: [] });
            }

        })
    }

    componentWillUnmount() {
    }


    createProperty() {


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



    }



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

                console.log('uriLog', JSON.stringify(imgList));


            }
        });
    };



    getAminities = () => {
        console.log('fetchingaminities');
        fetchAminities().then((response) => {

            if (response.status) {
                this.setState({ aminitiesList: response.data })
                // setAminitiesList(response.data);

            }
            else {
                Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }

        })

    }

    onValueChange = (value) => {
        console.log(JSON.stringify(this.state.aminitiesList[value]));
        this.setState({ selected: value })
        setSelected(value);
    }

    getAminitiesItems = () => {
        // console.log('load aminities : '+ JSON.stringify(aminitiesList))
        let serviceItems = this.state.aminitiesList.map((aminities, i) => {
            return <Picker.Item key={i} value={aminities.id} label={aminities.name} />
        });
        console.log('service items : ', serviceItems);

        return serviceItems
    }


    fetchDataFromAmenities = () => {
        console.log('next to prev success');
    }




    componentDidUpdate() {
        // this.props.hideTabBar(true)
        // this.props.disableGestures(true)
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                {console.log("rendering the screen...")}
                <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() =>
                        props.navigation.dispatch(DrawerActions.toggleDrawer())
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
                <View style={{ flex: 0.90, width: '100%', height: '100%', backgroundColor: 'white', alignContent: 'flex-end', flexDirection: 'column' }}>
                    <View style={{ backgroundColor: 'white', height: getDimen(0.125), width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                        <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>ADD LISTING hhhhh</Text>
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
                                        onPress={this.chooseFile.bind(this)}
                                    >
                                        {this.state.filePath === '' ?
                                            <Image
                                                style={{ resizeMode: 'cover', alignSelf: 'center', height: getDimen(0.2), width: getDimen(0.2), borderRadius: getDimen(.32) / 2 }}
                                                source={{ uri: "" }}
                                                defaultSource={require('../../../assets/icons/plus.png')}
                                            /> :
                                            <Image
                                                style={{ resizeMode: 'cover', alignSelf: 'center', height: getDimen(0.55), width: getDimen(0.2), borderRadius: getDimen(.32) / 2 }}
                                                source={this.state.filePath}
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
                                <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), borderBottomWidth: 0}}>
                                    <Input placeholder='123 Street Name'
                                        style={{ fontSize: getDimen(0.038), }}
                                        onChangeText={(val) => this.setState({ address: val })}
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
                                        onChangeText={(val) => this.setState({ city: val })}
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
                                        onChangeText={(val) => this.setState({ city: val })}
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
                                        onChangeText={(val) => this.setState({ city: val })}
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
                                        onChangeText={(val) => this.setState({ city: val })}
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
                                        onChangeText={(val) => this.setState({ price: val })}
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
                                        onChangeText={(val) => this.setState({ city: val })}
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
                                        onChangeText={(val) => this.setState({ bedroom: val })}
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
                                        onChangeText={(val) => this.setState({ bath: val })}
                                    />
                                </Item>
                            </View>
                            <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                            <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Home Type</Text>
                                {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                                <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>




                                </Item>
                            </View>
                            <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                            <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Square Feet</Text>
                                {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                                <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                                    <Input placeholder='0,000'
                                        style={{ fontSize: getDimen(0.038), }}
                                        onChangeText={(val) => this.setState({ squareFeet: val })}
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
                                        onChangeText={(val) => this.setState({ city: val })}
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
                                        onChangeText={(val) => this.setState({ city: val })}
                                    />
                                </Item>
                            </View>
                            <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                            <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(0.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Amenities </Text>
                                {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Aminities', ({ 'dataFor': "Aminities", "data": this.state.aminitiesList, "fetchDataFromAmenities": this.fetchDataFromAmenities }))} style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'center', width: '100%', height: '100%' }}>
                                        <View style={{ flex: 0.8, justifyContent: 'center' }}>
                                            <Text style={{ marginLeft: getDimen(0.1) }}>{(this.state.arrSelectedAminities && this.state.arrSelectedAminities.length > 0) ? JSON.stringify(this.state.arrSelectedAminities) : "Select Aminities"}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, width: '100%', height: '100%', justifyContent: 'center' }}>
                                            <Image
                                                source={require('../../../assets/images/down-arrow.png')}
                                                style={{ marginRight: 1, alignSelf: 'center', width: '30%', height: '30%' }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    {/* <Image
                                    source={require('../assets/images/nationality.png')}
                                    style={styles.ImageStyle}
                                /> */}
                                    {/* <Picker
                                    mode="dialog"
                                    iosIcon={<Icon />}
                                    style={{ marginLeft: getDimen(0.07), width: '80%', height: '100%', backgroundColor: 'transparent', color: 'black', fontSize: 14 }}
                                    placeholder="Aminities"

                                    placeholderStyle={{ color: "#000000", fontSize: 14 }}
                                    placeholderIconColor="#000000"
                                    selectedValue={selected}
                                    onValueChange={(value) => onValueChange(value)}
                                >
                                    {getAminitiesItems()}
                                </Picker> */}
                                </View>
                            </View>
                            <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>

                            <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                                <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Year Built</Text>
                                {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                                <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                                    <Input placeholder='0000'
                                        style={{ fontSize: getDimen(0.038), }}
                                        onChangeText={(val) => this.setState({ yearBuilt: val })}
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
                                        onChangeText={(val) => this.setState({ imageUrl: val })}
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
                                        onChangeText={(val) => this.setState({ imageUrl: val })}
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
                                        onChangeText={(val) => this.setState({ city: val })}
                                    />
                                </Item>
                            </View>
                            <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>


                            <View style={{ width: '100%', height: getDimen(0.1), alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>

                                <TouchableOpacity onPress={this.selectFile.bind(this)}>
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
                                    onPress={() => this.createProperty()}
                                >
                                    <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>SUBMIT</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View >
            </View>
        );
    }

    getTintColor = (pos) => {
        if (this.props.selected === pos) {
            return '#F6512B';

        } else {
            return '#48455B';

        }

    }
}

let styles = StyleSheet.create({
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
    inputContainer: {
        marginTop: 0,
        borderWidth: 1,
        marginRight: 25,
        height: '100%',
        marginLeft: -10,
        borderBottomColor: 'transparent',
        borderColor: 'transparent',
        flexDirection: 'row'
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

})

export default PropertyScreen;

