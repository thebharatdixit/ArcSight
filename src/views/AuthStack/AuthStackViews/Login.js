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
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';

// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
function LoginScreen({ navigation }) {



    const [checked, setChecked] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <TouchableOpacity
        //         //onPress={() => changeAuthState(true)}
        //         onPress={() => navigation.navigate("Terms & Condition")}

        //     ><Text>Login Screen</Text></TouchableOpacity>
        // </View>
        <ScrollView style={styles.body}>
            {/* <Image style={{
                width: Dimensions.get('window').width * .25,
                height: Dimensions.get('window').height * .15, marginLeft: getDimen(.045), marginTop: getDimen(.045),
                alignSelf: 'flex-start',
                resizeMode: 'contain', backgroundColor: 'transparent'
            }} source={require('../../../assets/logo.png')} /> */}
            {/* <Text style={styles.textStyle1}>Welcome to</Text> */}
            <Text style={{ marginTop: getDimen(0.010), color: '#838383', fontSize: getDimen(0.085), fontWeight: '500', marginLeft: getDimen(.085), marginRight: getDimen(.085) }}>
                Welcome,
                </Text>


            <Text style={{ marginTop: getDimen(0.030), color: '#2B3F5D', fontSize: getDimen(0.085), fontWeight: '400', marginLeft: getDimen(.085), marginRight: getDimen(.085) }}>
                sign in to continue
                </Text>


            <View style={styles.inputContainerBottom}>

                <TextInput
                    secureTextEntry={false}
                    style={styles.input}
                    placeholder="T-0015"
                    placeholderTextColor="#8A8A8A"
                    onChangeText={(username) => setUsername(username)}
                    value={username} />
            </View>

            <View style={styles.inputContainerBottom}>
                {/* <Image
                                            source={require('../../../assets/images/password.png')}
                                            style={styles.ImageStyle}
                                        /> */}
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#8A8A8A"
                    onChangeText={(password) => setPassword(password)}
                    value={password} />

                {/* <TouchableOpacity style={styles.forgotContainer}>
                    <Image
                        source={require('../../../assets/vision.png')}
                        style={styles.ImageStyle}
                    />
                </TouchableOpacity> */}
            </View>
            <TouchableOpacity
                style={{ marginTop: getDimen(.045), alignItems: 'flex-end', alignSelf: 'flex-start', marginLeft: getDimen(.085), marginRight: getDimen(.085), flexDirection: 'row' }}
            >

                <Text style={{ color: 'black', fontSize: getDimen(0.045) }}>Forgot Password?</Text>
            </TouchableOpacity>



            <TouchableOpacity
                style={{
                    width: '85%', alignSelf: 'center', marginTop: getDimen(0.15), height: getDimen(0.15),
                    backgroundColor: '#009EE9',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10
                }}
                onPress={() => changeLogin(true)}>

                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ color: '#FFF', fontSize: getDimen(.055), textAlign: 'center', alignSelf: 'center', fontWeight: 'bold' }}>LOGIN</Text>
                </View>


            </TouchableOpacity>

            <TouchableOpacity
                style={{ marginTop: getDimen(.085), alignItems: "center", flexDirection: 'row', width: '100%', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}
            >
                {/* <CheckBox
                    onPress={() => setChecked(!checked)}
                    checked={checked} color="#1C3169" /> */}
                <Text style={{ textAlign: 'center', textDecorationLine: 'underline', color: 'blue' }}>Term &amp; Conditions</Text>
            </TouchableOpacity>



            {/* <Modal animationType="dialog"
                transparent={true}
                visible={this.props.showLoader}
                style={{ position: "absolute", alignSelf: "center", height: '100%', width: '100%' }}>
                <View style={{ height: "20%", flexDirection: 'row', width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: 'white', borderColor: 'gray', borderWidth: 2 }}>
                    <ActivityIndicator size="large" color="#00ff00" marginRight={10} />
                    <Text style={{ color: 'gray' }}>Please wait ...</Text>
                </View>
            </Modal>
            <Modal animationType="dialog"
                transparent={true}
                visible={this.props.isError}
                style={{ position: "absolute", alignSelf: "center", height: '100%', width: '100%' }}>
                <View style={{ height: "20%", width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: 'white', borderColor: 'gray', borderWidth: 2 }}>
                    <Text style={{ color: 'red' }}>{this.props.message}</Text>
                    <Button transparent style={{ marginTop: getDimen(.04), alignItems: "center", marginLeft: getDimen(.04), marginRight: getDimen(.04), backgroundColor: "#1C3169" }} onPress={() => { this.props.dispatch(this.props.errorMsg(false)) }}>
                        <Text style={{ color: 'white', marginLeft: getDimen(.04), marginRight: getDimen(.04), fontSize: getDimen(.055) }}>OK</Text>
                    </Button>
                </View>
            </Modal> */}
        </ScrollView>
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
});
// const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default LoginScreen;
