import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
    Alert

} from 'react-native';
import { Container, Header, Content, Picker, Form, Icon, Textarea, CheckBox, PickerItem } from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux'
import { TextInputMask } from 'react-native-masked-text'
import DatePicker from 'react-native-datepicker';
import { getCountryList, showLoader, registerNewUser } from '../actions/signUpAction';
import CustomText from '../common/CustomText';

// import { push_feed, pop_feed, restart_feed } from '../actions/navigation'

// const mapStateToProps = (state) => ({
//   isAuthenticating: state.user.isAuthenticating,
//   token: state.user.token,
//   error: state.user.error,
// })

class Register extends Component {
    state = {
        email: '',
        password: '',
        isAuthenticating: false,
        error: '',
        selected: 'key0',
        selected2: '',
        selectedMaritalStatus: 'Single',
        dob: '',
        doa: '',
        countryList: [],
    }

    componentDidMount() {
        getCountryList(this.props.dispatch).then((response) => {
            if (response) {
       //         console.log(JSON.stringify(response))
                this.setState({ countryList: response.countryList })
            }
        });
        // this.props.dispatch(this.props.showLoader(true))
    }

    componentDidUpdate() {
        // this.props.hideTabBar(true)
        // this.props.disableGestures(true)
    }

    onValueChange(value, itemPosition) {
        console.log('check: ' + value);
        if (value === 'key0') {
            this.setState({
                selectedMaritalStatus: 'Single'
            });
        } else if (value === 'key1') {
            this.setState({
                selectedMaritalStatus: 'Married'
            });
        }
        else if (value === 'key2') {
            this.setState({
                selectedMaritalStatus: 'Rather Not Say'
            });
        }
        this.setState({
            selected: value
        });
    }

    getFont(fontType) {
        var font = 'Poppins-Regular'
        switch (fontType) {
            case 'regular':
                font = 'Poppins-Regular'
                break
            case 'bold':
                font = 'Poppins-Bold'
                break
            case 'light':
                font = 'Poppins-Light'
                break
            case 'semiBold':
                font = 'Poppins-SemiBold'
                break
            case 'medium':
                font = 'Poppins-Medium'
                break
            default:
                font = 'Poppins-Regular'
                break
        }
        return font;
    }

    onValueChange2(value) {
        console.log(JSON.stringify(this.state.countryList[value]));
        // console.log(JSON.stringify(value));
        //  return;
        this.setState({
            selected2: value
        });
    }

    onPressForgotPassword() {
  //      console.log("forgot password")
    }

    backToLoginView() {
        // this.props.dispatch(pop_feed())
    }

    validate = (text) => {
     //   console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // alert("Email is Not Correct");
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({ email: text })
            // alert("Email is Correct");
            return true
        }
    }

    submitSignup() {

        if (!this.state.firstName) {
            this.setState({ error: 'Please Enter First name..' })
            Alert.alert('', 'Please Enter First name..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (this.state.firstName.trim() === '') {
            this.setState({ error: 'Please Enter First name..' })
            Alert.alert('', 'Please Enter First name..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (!this.state.lastName) {
            this.setState({ error: 'Please Enter Last name..' })
            Alert.alert('', 'Please Enter Last name..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (this.state.lastName.trim() === '') {
            this.setState({ error: 'Please Enter Last name..' })
            Alert.alert('', 'Please Enter Last name..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (this.state.email.trim() === '') {
            this.setState({ error: 'Please Enter Email..' })
            Alert.alert('', 'Please Enter Email..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }

        if (this.validate(this.state.email)) {
    //        console.log('email is correct.');

        }
        else {
            Alert.alert('', 'Email is Not Correct', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (!this.state.mobileNumber) {
            this.setState({ error: 'Please Enter Mobile No..' })
            Alert.alert('', 'Please Enter Mobile No..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (this.state.mobileNumber.trim() === '') {
            this.setState({ error: 'Please Enter Mobile No..' })
            Alert.alert('', 'Please Enter Mobile No..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        // if (this.state.mobileNumber.length > 10) {
        //   this.setState({ error: 'Maximum length is 10 digits for mobile number..' })
        //   alert("Maximum length is 10 digits for mobile number..");
        //   return;
        // }
        if (this.state.mobileNumber.length > 10 || this.state.mobileNumber.length < 10) {
            this.setState({ error: 'Length of mobile number should be 10 digits..' })
            Alert.alert('', 'Length of mobile number should be 10 digits..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (!this.state.email) {
            this.setState({ error: 'Please Enter Email Id..' })
            Alert.alert('', 'Please Enter Email Id..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (this.state.email.trim() === '') {
            this.setState({ error: 'Please Enter Email Id..' })
            Alert.alert('', 'Please Enter Email Id..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }

        if (!this.state.selected) {
            this.setState({ error: 'Please Select Marital status..' })
            Alert.alert('', 'Please Enter Marital status..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (!this.state.selected2) {
            this.setState({ error: 'Please Select Country..' })
            Alert.alert('', 'Please Enter Country..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        if (!(this.state.password === this.state.confirmPass)) {
            this.setState({ error: 'Password Mismatch..' })
            Alert.alert('', 'Password Mismatch..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        // if (!(this.state.isChecked)) {
        //     this.setState({ error: 'Please agree terms and conditions to continue..' })
        //     Alert.alert('', 'Please agree terms and conditions to continue..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
        //     return;
        // }
        this.setState({ error: '', isLoader: true })

        // this.props.dispatch(pop_feed())
        //  this.props.dispatch(restart_feed({ key: 'Feed', type: 'Home' }))

        let data = {
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "email": this.state.email,
            "contact_number": this.state.mobileNumber,
            "country": this.state.selected2,
            "dob": this.state.dob,
            "martial_status": this.state.selectedMaritalStatus,
            "password": this.state.password,
            "do_anniversary": this.state.doa,
            "device_type": Platform.OS,
            "device_token": ""
        }

        registerNewUser(this.props.dispatch, data).then((response) => {
            if (response) {
           //     console.log("REGISTER RESPONSE :: " + JSON.stringify(response))
                //this.setState({ hotelList: response.hostelList })
                this.setState({ isLoader: false })
                if (response.status) {
                    Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });;
                    this.props.navigation.goBack();
                    // this.props.dispatch(pop_feed())
                } else {
                    this.setState({ error: response.message })
                    Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });;
                }
            } else {
                this.setState({ error: 'Faliure...' })
            }
        });
    }

    getwidth = () => {

        if (this.state.selected === '') {
            return '82%';

        } else if (this.state.selected === 'key0') {
            // alert('hyy')
            return '77%';


        } else if (this.state.selected === 'key1') {
            return '79%';
        }
        else if (this.state.selected === 'key2') {
            return '79%';
        }
        else {
            return '80%';
        }

    }

    getwidth2 = () => {

        if (this.state.selected2 === '') {
            return '80%';

        } else if (this.state.selected2 === 'key0') {
            // alert('hyy')
            return '78%';


        } else if (this.state.selected2 === 'key1') {
            return '78%';
        }
        else if (this.state.selected2 === 'key2') {
            return '79%';
        }
        else {
            return '85%';
        }

    }

    render() {
        // console.log("BEFORE RENDER"+JSON.stringify(this.state))
        let serviceItems = this.state.countryList.map((country, i) => {
            return <Picker.Item key={i} value={country.id} label={country.name} />
        });
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                <View style={{
                    width: '100%', height: '100%', alignItems: 'center',
                    justifyContent: 'center', flexDirection: 'column',
                    flex: 1,
                }}>
                    {/* <ImageBackground
                        source={require('../assets/images/login-bg.png')}
                        style={{
                            width: '100%', height: '100%', alignItems: 'center',
                            justifyContent: 'center',
                        }}> */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            width: '100%', height: '100%', marginTop: 20, marginBottom: 20, backgroundColor: 'white',
                        }} >
                        {/* <ImageBackground
                        source={require('../assets/images/login-bg.png')}
                        style={{
                            width: '100%', height: '100%', alignItems: 'center',
                            justifyContent: 'center',
                        }}> */}
                        <View style={styles.headerIconView}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: 0.80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', marginLeft: 15 }}>
                                <Image style={styles.backButtonIcon} source={require('../assets/images/back.png')} />
                                <CustomText font={'medium'} text={'Register'} style={styles.titleViewText}></CustomText>
                            </TouchableOpacity>
                            <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>

                            </View>

                            {/* <TouchableOpacity style={styles.headerBackButtonView} onPress={() => this.props.navigation.goBack()}>
                                <Image style={styles.backButtonIcon} source={require('../assets/images/back.png')} />
                            </TouchableOpacity>
                            <Text style={styles.titleViewText}>Register</Text> */}
                        </View>
                        <View style={{ height: 1, width: '100%', backgroundColor: '#8A8A8A' }}></View>
                        <Form style={{
                            width: '100%', height: '90%'
                        }}>


                            <Spinner visible={this.state.isAuthenticating} />
                            <View style={styles.inputs}>
                                {/* <View>
                                    <Text style={styles.errorText}>{this.state.error}</Text>
                                </View> */}
                                <View style={styles.inputContainerFirst}>
                                    <Image
                                        source={require('../assets/images/user.png')}
                                        style={styles.ImageStyle}
                                    />
                                    <TextInput
                                        style={[styles.input, styles.whiteFont]}
                                        placeholder="First Name"
                                        placeholderTextColor="#8A8A8A"
                                        underlineColorAndroid='transparent'
                                        onChangeText={(firstName) => this.setState({ firstName })}
                                        value={this.state.firstName} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Image
                                        source={require('../assets/images/user.png')}
                                        style={styles.ImageStyle}
                                    />
                                    <TextInput
                                        style={[styles.input, styles.whiteFont]}
                                        placeholder="Last Name"
                                        placeholderTextColor="#8A8A8A"
                                        onChangeText={(lastName) => this.setState({ lastName })}
                                        value={this.state.lastName} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Image
                                        source={require('../assets/images/email.png')}
                                        style={styles.ImageStyle}
                                    />
                                    <TextInput
                                        style={[styles.input, styles.whiteFont]}
                                        placeholder="Email Id"
                                        placeholderTextColor="#8A8A8A"
                                        onChangeText={(email) => this.setState({ email })}
                                        value={this.state.email} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Image
                                        source={require('../assets/images/phone.png')}
                                        style={styles.ImageStyle}
                                    />
                                    <TextInput
                                        style={[styles.input, styles.whiteFont]}
                                        placeholder="Phone Number"
                                        placeholderTextColor="#8A8A8A"
                                        underlineColorAndroid='transparent'
                                        onChangeText={(mobileNumber) => this.setState({ mobileNumber })}
                                        value={this.state.mobileNumber} />
                                </View>

                                <View style={styles.inputContainer}>
                                    <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'center', width: '100%', height: '100%' }}>
                                        <View style={{ flex: 0.8 }}></View>
                                        <View style={{ flex: 0.2, width: '100%', height: '100%', justifyContent: 'center' }}>
                                            <Image
                                                source={require('../assets/images/down-arrow.png')}
                                                style={{ marginRight: 1, alignSelf: 'center', width: '30%', height: '30%' }}
                                            />
                                        </View>
                                    </View>
                                    <Image
                                        source={require('../assets/images/nationality.png')}
                                        style={styles.ImageStyle}
                                    />
                                    <Picker
                                        note
                                        mode="dropdown"
                                        iosIcon={<Icon />}
                                        style={{ width: '80%', backgroundColor: 'transparent', color: 'black', fontFamily: 'Poppins-Regular', fontSize: 14 }}
                                        placeholder="Nationality"

                                        placeholderStyle={{ color: "#8A8A8A", fontFamily: 'Poppins-Regular', fontSize: 14 }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selected2}
                                        onValueChange={(value, itemPosition) => this.onValueChange2(value, itemPosition)}
                                    >
                                        {serviceItems}
                                    </Picker>
                                </View>

                                <View style={styles.inputContainer}>
                                    <Image
                                        source={require('../assets/images/password.png')}
                                        style={styles.ImageStyle}
                                    />
                                    <TextInput
                                        style={[styles.input, styles.whiteFont]}
                                        placeholder="**********"
                                        placeholderTextColor="#8A8A8A"
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(password) => this.setState({ password })}
                                        value={this.state.password} />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Image
                                        source={require('../assets/images/password.png')}
                                        style={styles.ImageStyle}
                                    />
                                    <TextInput
                                        style={[styles.input, styles.whiteFont]}
                                        placeholder="Confirm Password"
                                        placeholderTextColor="#8A8A8A"
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(confirmPass) => this.setState({ confirmPass })}
                                        value={this.state.confirmPass} />
                                </View>


                                <View style={styles.inputContainer}>
                                    <Image
                                        source={require('../assets/images/date-birth.png')}
                                        style={styles.ImageStyle}
                                    />

                                    <DatePicker
                                        style={{ width: 200, }}
                                        date={this.state.dob}
                                        mode="date"
                                        placeholder="Date Of Birth"
                                        format="DD-MM-YYYY"
                                        // minDate="2016-05-01"
                                        maxDate={new Date()}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0,
                                                height: 0,
                                                width: 0,
                                                // tintColor: 'red'
                                            },
                                            dateInput: {
                                                marginLeft: 15,
                                                borderWidth: 0,
                                                alignItems: 'flex-start',
                                                color: '#8A8A8A',
                                                fontFamily: 'Poppins-Regular', 
                                                fontSize: 14
                                            },
                                            placeholderText: {
                                                color: '#8A8A8A',
                                                fontFamily: 'Poppins-Regular', 
                                                fontSize: 14
                                            },
                                            // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(date) => { this.setState({ dob: date }) }}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'center', width: '100%', height: '100%' }}>
                                        <View style={{ flex: 0.8 }}></View>
                                        <View style={{ flex: 0.2, width: '100%', height: '100%', justifyContent: 'center' }}>
                                            <Image
                                                source={require('../assets/images/down-arrow.png')}
                                                style={{ marginRight: 1, alignSelf: 'center', width: '30%', height: '30%' }}
                                            />
                                        </View>
                                    </View>
                                    <Image
                                        source={require('../assets/images/marital-status.png')}
                                        style={styles.ImageStyle}
                                    />
                                    <Picker
                                        note
                                        mode="dropdown"
                                        iosIcon={<Icon />}
                                        style={{ width: this.getwidth(), backgroundColor: 'transparent', }}
                                        placeholder="Marital Status"
                                        placeholderStyle={{ color: "#8A8A8A", fontFamily: 'Poppins-Regular', fontSize: 14 }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selected}
                                        onValueChange={(value, itemPosition) => this.onValueChange(value, itemPosition)}
                                    // onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Single" value="key0" />
                                        <Picker.Item label="Married" value="key1" />
                                        <Picker.Item label="Rather Not Say" value="key2" />

                                    </Picker>
                                    {/* <Image
                                        source={require('../assets/images/down-arrow.png')}
                                        style={styles.ImageStyle2}
                                    /> */}
                                </View>

                                {(this.state.selected === 'key1') ? <View style={styles.inputContainer}>
                                    <Image
                                        source={require('../assets/images/aniverary-date.png')}
                                        style={styles.ImageStyle}
                                    />

                                    <DatePicker
                                        style={{ width: this.getwidth() }}
                                        date={this.state.doa}
                                        mode="date"
                                        placeholder="Date Of Anniversary"
                                        format="DD-MM-YYYY"
                                        // minDate="2016-05-01"
                                        maxDate={new Date()}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0,
                                                height: 0,
                                                width: 0,
                                                // tintColor: 'red'
                                            },
                                            dateInput: {
                                                marginLeft: 15,
                                                borderWidth: 0,
                                                alignSelf: 'flex-start',
                                                fontFamily: 'Poppins-Regular'
                                            },
                                            placeholderText: {
                                                color: '#8A8A8A',
                                                alignSelf: 'flex-start',
                                                fontFamily: 'Poppins-Regular'
                                            },
                                            dateText: {
                                                alignSelf: 'flex-start'

                                            }
                                            // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(date) => { this.setState({ doa: date }) }}
                                    />


                                </View>
                                    :
                                    null
                                }





                                <View style={styles.footerContainer}>
                                    <View style={styles.signupView}>
                                        <TouchableOpacity
                                            style={styles.signup}
                                            onPress={() => this.submitSignup()}>
                                            <CustomText font={'medium'} text={'Register'} style={styles.signupText}></CustomText>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                {/* <TouchableOpacity
                        style={styles.signup2}
                        onPress={console.log('')}>
                        <Text style={styles.blueFont}>Don't have an account?<Text style={styles.orangeFont}> Register here</Text></Text>
                    </TouchableOpacity> */}

                            </View>


                            {/* <Button style={{ width: '80%', alignSelf: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#008FFE', marginBottom: 10, marginTop: 20 }}
                                    onPress={() => this.validateAndRegister()}
                                >
                                    <Text
                                        style={{ color: 'white' }}>Register</Text>
                                </Button> */}

                            <TouchableOpacity
                                style={styles.signup2}
                                onPress={() => this.props.navigation.goBack()}>
                                <CustomText text={'Already have an Account?'} style={styles.blueFont}></CustomText>
                                <CustomText text={'Login'} style={styles.orangeFont}>  </CustomText>
                            </TouchableOpacity>

                        </Form>
                        {/* </ImageBackground> */}
                    </ScrollView>

                    {/* <Toast position='center' ref="toast" /> */}
                    {/* <ActivityIndicator animating={this.props.loader} style={{ position: 'absolute', alignSelf: 'center', alignItems: 'center', justifyContent: "center" }}></ActivityIndicator> */}

                </View>
            </KeyboardAvoidingView>
        );
    }


}


let styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    ImageStyle2: {
        backgroundColor: 'red',
        marginRight: 10,
        height: 15,
        width: 15,
        position: 'absolute',
        resizeMode: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    headerIconView: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: .40,
        backgroundColor: '#FFF'
    },
    headerBackButtonView: {
        alignSelf: 'center',
        width: 25,
        height: 25,
        position: 'absolute',
        left: 15,
    },
    backButtonIcon: {
        resizeMode: 'contain',
        width: 25,
        height: 25
    },
    headerTitleView: {
        flex: 0.07,
        backgroundColor: 'transparent',
        paddingLeft: 25,
    },
    titleViewText: {
        alignSelf: 'center',
        fontSize: 22,
        color: '#000000',
        marginLeft: 15,
        marginRight: 10,
        // position: 'absolute',
        // left: 50,
    },
    errorText: {
        color: '#FF3366',
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 15,
    },
    inputs: {
        paddingTop: 0,
        paddingBottom: 10,
        flex: .40
    },
    footerContainer: {
        marginTop: 20,
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupView: {
        paddingTop: 20,
    },
    signup: {
        borderRadius: 25,
        backgroundColor: '#F6512B',
        height: 50,
        width: Dimensions.get('window').width * .7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signup2: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
        flexDirection:'row'
    },
    signupText: {
        color: '#FFF',
    },
    signin: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.05
    },
    inputPassword: {
        width: 25,
        height: 25,
    },
    imageContainer: {
        paddingLeft: 20,
        paddingRight: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputUsername: {
        width: 25,
        height: 25,
    },
    inputContainerFirst: {
        borderWidth: 1,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 15,
        paddingBottom: 5,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row'
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
        fontFamily: 'Poppins-Regular',
        color: 'black'
    },
    forgotContainer: {
        paddingTop: 10,
        paddingRight: 10,
    },
    forgotText: {
        fontSize: 13,
        alignSelf: 'flex-end',
        color: '#D8D8D8',
    },
    greyFont: {
        color: '#D8D8D8'
    },
    whiteFont: {
        color: 'black'
    },
    orangeFont: {
        color: '#F26622',
        marginLeft: 5
    },
    blueFont: {
        color: '#2B5F9C'
    }
})

export default connect()(Register)
