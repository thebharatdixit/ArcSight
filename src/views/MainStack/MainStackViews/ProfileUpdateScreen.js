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
    ToastAndroid,
    Alert,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import ImagePicker from 'react-native-image-picker';
// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import { registerNewUser } from '../../../actions/signUpAction'
import { storeData, getData } from '../../../utils/asyncStore';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



function ProfileUpdateScreen({ navigation }) {


    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [companyName, setCompanyName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [accessToken, setAccessToken] = React.useState('')
    const [showLoader, setShowLoader] = React.useState('hide');
    const [showGoogleView, setGoogleView] = React.useState(false)

    React.useEffect(() => {

            getData('userData').then((data) => {
            const userData = JSON.parse(data);
            console.log('userData : ',userData)
            setFirstName(userData.user.first_name)
            setEmail(userData.user.email)
            setLastName(userData.user.last_name)
            setCompanyName(userData.user.company_name)
            setPhoneNumber(userData.user.mobile)
            setAddress(userData.user.address)
            const listTokens = userData.token;
            
            setAccessToken(listTokens);
            setUserId(userData.user.id)
            console.log('tokenProfileScreen', listTokens)

            if (accessToken) {
                console.log('Prachi123')
                getUserProfileData();
            }

        })

    }, [accessToken])

    const profileUpdate = () => {
        setShowLoader('');
        let data = {
                "first_name"   : firstName,
                "last_name"    : lastName,
                "company_name" :companyName,
                "mobile": phoneNumber,
                "address": address
        }
        fetch("https://arcsightapp.com/api/v1/user/update-profile", {
            method: "post",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                 Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then(res => {
                
                if(res.status == true){
                    alert(res.message)
                    setShowLoader('hide');
                    //navigation.navigate('Profile Screen');
                    navigation.goBack();
                }

               



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
        <View style={{ width: '100%', height: '100%', backgroundColor: '#F2F2F2' }}>
            <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require('../../../assets/icons/back.png')}
                        style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                </TouchableOpacity>

                <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    {/* <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} /> */}

                    <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                </View>


            </View>
            <View

                style={{ flex: 1, backgroundColor: '#D7D4D3' }}>

                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">

                <ScrollView>
                    <View style={{ borderRadius: 0, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: getDimen(0.12) }}>

                        <View style={{ backgroundColor: 'white', width: '100%', height: getDimen(1.2), marginTop: 0, marginRight: 0, borderRadius: 12, }}>

                            {/* <View style={{ marginTop: getDimen(0.3 / 2), alignItems: 'center', }}>
                                <TouchableOpacity
                                    onPress={chooseFile.bind(this)}
                                >

                                </TouchableOpacity>
                            </View> */}

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(email) => setEmail(email)}
                                    value={email} />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="First Name"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(firstName) => setFirstName(firstName)}
                                    value={firstName} />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Last Name"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(lastName) => setLastName(lastName)}
                                    value={lastName} />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Real Estate Company"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(companyName) => setCompanyName(companyName)}
                                    value={companyName} />
                            </View>
                            
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    keyboardType='number-pad'
                                    keyboardAppearance='default'
                                    returnKeyType='done'
                                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                                    value={phoneNumber} />
                            </View>

                            <View style={styles.inputContainer}>
                                {/* <TextInput
                                    style={styles.input}
                                    placeholder="Address"
                                    placeholderTextColor="#8A8A8A"
                                    underlineColorAndroid='transparent'
                                    onChangeText={(address) => setAddress(address)}
                                    value={address} /> */}
                                <TouchableOpacity onPress={() => setGoogleView(true)}>
                                    {
                                        (address === '') ?
                                            <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.05), color: 'gray',height: 30 }}>Address</Text>
                                            :
                                            <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.03), color: 'black', textAlign: 'justify', marginTop: getDimen(0.05),height:35}}>{address}</Text>
                                    }

                                </TouchableOpacity>
                            </View>
                            

                            <View style={{ alignItems: 'center', marginTop: getDimen(0.05) }}>


                                <TouchableOpacity onPress={() => profileUpdate()}>
                                    <Text style={{ backgroundColor: '#121735', color: 'white', paddingLeft: getDimen(0.2), paddingRight: getDimen(0.2), paddingBottom: getDimen(0.03), fontSize: getDimen(0.05), fontWeight: 'bold', paddingTop: getDimen(0.03) }}>
                                        Update
                            </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </ScrollView>
                </KeyboardAvoidingView>
            </View >
            
            {
                (showGoogleView === true) ?
                    <View
                        style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start', position: 'absolute', width: '100%', height: '100%' }}
                    >
                        <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                setGoogleView(false)
                                console.log('address##', address)
                            }
                            }>
                                <Image source={require('../../../assets/icons/cross.png')}
                                    style={{ height: 20, width: 20 }} />
                            </TouchableOpacity>

                            <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                                <Image source={require('../../../assets/icons/2.png')}
                                    style={{ height: getDimen(0.1), width: getDimen(0.1) }} />

                                {/* <Image source={require('../../../assets/images/logo.png')}
                                    style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} /> */}
                            </View>

                        </View>

                        <GooglePlacesAutocomplete
                            placeholder='Address'
                            autoFocus={false}
                            returnKeyType={'default'}
                            fetchDetails={true}
                            listViewDisplayed={false}
                            currentLocation={true}
                            keyboardShouldPersistTaps={'handled'}
                            styles={{
                                textInputContainer: {
                                    width: '100%',
                                    marginTop: 0
                                },
                                textInput: {
                                    // marginLeft: 0,
                                    // marginRight: 0,
                                    // marginTop: 0,
                                    // marginBottom: 0,
                                    // height: '98%'
                                }
                            }}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log('Google Details => ', data.description);
                                setAddress(data.description)
                            }}
                            query={{
                                key: 'AIzaSyDx8L9iRu5yyvqdw6pvPFUOdgdUjOq6S2k',
                                language: 'en',
                            }}
                        //  predefinedPlaces={[homePlace, workPlace]}
                        />

                        {/* <View style={{}}> */}
                        <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center', marginBottom: getDimen(0.01) }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (address === '') {
                                        // Alert.alert('', 'Please Select Address..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                                        return;
                                    } else {
                                        setGoogleView(false)
                                    }
                                    console.log('Address!!', address)
                                }
                                }
                            >
                                <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>SAVE</Text>
                            </TouchableOpacity>

                        </View>
                        {/* </View> */}

                    </View>
                    :
                    null
            }

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
        flex: 1,
        flexDirection: 'column',
        top: 2,
        width: '100%',
        height: '100%'
    },
    inputContainer: {
        marginTop: 10,
        borderWidth: 1,
        marginLeft: 25,
        marginRight: 25,
        paddingBottom: -5,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row'
    },
    input: {
        height: 50,
        flex: 10,
        paddingLeft: 10,
        fontSize: 14,
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
export default ProfileUpdateScreen;