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
    ToastAndroid
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

        <ImageBackground
            source={require('../../../assets/images/bg.png')}
            style={{ flex: 1 }}>

            {/* <View style={{ width:'100%',height:60, backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <Image source={require('../../../assets/icons/3.png')}
                    style={{ height: 25, width: 25 }} />

                <Image source={require('../../../assets/images/logo.png')}
                    style={{ height: 55, width: 55 }} />
            </View> */}


            <View style={{ width:'90%',height:270, backgroundColor: 'white',marginLeft:20,  marginTop: 180, borderRadius: 12, shadowColor: 'black' }}>

                <View style={{ marginTop: -30, alignItems: 'center'}}>

                    <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: 55, width: 55 }} />

                </View>

                <TextInput
                    keyboardType="default"
                    underlineColorAndroid="#8d8865"
                    placeholderTextColor="#d2d6d5"
                    autoCapitalize="none"
                    placeholder="Name"
                    style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
                />

                <TextInput
                    keyboardType="default"
                    underlineColorAndroid="#8d8865"
                    placeholderTextColor="#d2d6d5"
                    autoCapitalize="none"
                    placeholder="Password"
                    style={{ marginLeft: 20, marginRight: 20 }}


                />

                <View style={{ alignItems: 'center', marginTop: 15 }}>

                    <Text style={{ backgroundColor: '#121735', color: 'white', paddingLeft: 60, paddingRight: 60, paddingBottom: 10, fontSize: 17, fontWeight: 'bold', paddingTop: 10 }}>
                        LOGIN NOW
</Text>
                </View>

                <View style={{alignSelf:'center',marginTop:15,flexDirection:'row',alignItems:'center'}}>

                    {/* <CheckBox color={'#8d8865'}
                    style={{width:18,height:18}}/> */}

                    <Text style={{paddingLeft:12,color:'#8d8865'}}>
                        Remember Me
                    </Text>

                    <Text style={{paddingLeft:12,alignContent:'space-around',color:'#d2d6d5'}}>
                        Forgot Password?
                    </Text>

                
                
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Register Screen')}>

                <View style={{alignSelf:'center',marginTop:5,flexDirection:'row',alignItems:'center'}}>

                <Text style={{color:'#8d8865'}}>
                        Register
                    </Text>
                </View>
                </TouchableOpacity>


            </View>


        </ImageBackground>
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
