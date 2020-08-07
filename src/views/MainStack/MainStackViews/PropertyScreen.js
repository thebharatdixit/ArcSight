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
    Share,
    Alert,
    Picker
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { getDimen } from '../../../dimensions/dimen';
import ImagePicker from 'react-native-image-picker';

function PropertyScreen({ navigation }) {

    const [filePath, setFilePath] = React.useState([])
    const [selectedValue, setSelectedValue] = React.useState("House");

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
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                const temp = response.data;

                //Or:
                if (Platform.OS === 'android') {
                    source = { uri: response.uri, isStatic: true };
                } else {
                    source = { uri: response.uri.replace('file://', ''), isStatic: true };
                }
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                //  this.setState({
                //     filePath: source
                // });

                console.log(temp);
                // setFilePath(source);
                // <Image source={{ uri: data.path }} style={{ width: 100, height: 100 }} />
                // console.log('SetFilePath', setFilePath)
            }
        });
    };

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
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
                                <Image source={require('../../../assets/icons/plus.png')}
                                    style={{ height: getDimen(0.07), width: getDimen(0.07) }} />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Address</Text>
                        {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                        <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), }}>
                            <Input placeholder='123 Street Name'
                                style={{ fontSize: getDimen(0.038), }}

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

                            />
                        </Item>
                    </View>
                    <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View>


                </View>

            </ScrollView>
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
