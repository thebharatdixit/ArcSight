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
    Alert
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';

// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import searchListDetail from '../MainStackViews/SearchListDetailScreen'


function MyColleagueScreen({ navigation }) {



    const [checked, setChecked] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    return (
/////// SEarch List Detail Screen

        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <ScrollView style={styles.container}>
            <View style={{ flex: 0.1, backgroundColor:'#d2d6d5', justifyContent:'flex-start',alignItems:'center'}}>
                <View style={{ flex: 0.2, flexDirection: 'row', width:'100%', }}>
                    <View style={{ backgroundColor: '#d2d6d5', height: getDimen(0.125), width: getDimen(0.8), justifyContent: 'center', alignContent: 'center' }}>
                        <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>FEATURED PROPERTY</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#a43d3e', height: getDimen(0.125), width: getDimen(0.2), justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>360◦</Text>
                    </View>
                </View>
                
                <Image source={require('../../../assets/icons/19.png')}
                    style={{ height: getDimen(0.15), width: getDimen(0.15), resizeMode: 'contain', margin:getDimen(0.3) }} 
                    />

            </View>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop:getDimen(-0.12), marginRight:getDimen(0.1) }}>
                <TouchableOpacity
                onPress={()=> Alert.alert('I can change my profile photo')}
                >
                        <Image source={require('../../../assets/icons/2.png')}
                            style={{ height: getDimen(0.4 / 2), width: getDimen(0.4 / 2) }} />
                </TouchableOpacity>
            </View>
            {/* <ScrollView style={styles.container}> */}
                <View style={{ flex: 0.15, marginLeft: getDimen(0.05), marginTop: getDimen(0.05), flexDirection:'row' }}>
                    <Text style={{ fontSize: getDimen(0.06) }}>1234 Main St</Text>
                    <View style={{ flexDirection: 'column', marginLeft: getDimen(0.2), justifyContent:'center', alignContent:'center',alignItems:'center'}}>
                       <TouchableOpacity
                            onPress={() => Alert.alert('Broker Name Here Details')}
                       >
                            <Text style={{ fontSize: getDimen(0.040), fontWeight: 'bold', textAlign:'left' }}>Broker Name Here</Text>
                       </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=> Alert.alert('Real Estate Company')}
                        >
                            <Text style={{ fontSize: getDimen(0.038), marginTop: getDimen(0.005), color: 'gray' }}>Real Estate Company</Text>
                        </TouchableOpacity>
                       
                    </View>
                </View>

                <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.05) }}>
                    <View style={{ flex: 0.25, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%', }}>
                        <Text style={{ fontSize: getDimen(0.06) }}>2</Text>
                        <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                    </View>
                    <View style={{ flex: 0.22, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                        <Text style={{ fontSize: getDimen(0.06) }}>2</Text>
                        <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                    </View>
                    <View style={{ flex: 0.21, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                        <Text style={{ fontSize: getDimen(0.06) }}>1</Text>
                        <Text style={{ fontSize: getDimen(0.035) }}>Terrace</Text>
                    </View>
                    <View style={{ backgroundColor: '#a43d3e', flex: 0.395, height: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                        <Text style= {{color:'white', fontWeight:'500', fontSize:getDimen(0.045)}}>&0,000,000</Text>
                    </View>
                </View>

                <View style={{ flex: 0.27, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.08) }}>
                    <View style={{ flex: 0.95, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Text style={{ fontSize: getDimen(0.045) }}>• Detail to Go Here</Text>
                        <Text style={{ fontSize: getDimen(0.045), marginTop:10 }}>• Detail to Go Here</Text>
                        <Text style={{ fontSize: getDimen(0.045), marginTop: 10 }}>• Detail to Go Here</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Text style={{ fontSize: getDimen(0.045) }}>• Detail to Go Here</Text>
                        <Text style={{ fontSize: getDimen(0.045), marginTop: 10 }}>• Detail to Go Here</Text>
                        <Text style={{ fontSize: getDimen(0.045), marginTop: 10 }}>• Detail to Go Here</Text>
                    </View>
                </View>

            <View style={{ flex: 0.27, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.08), marginLeft: getDimen(0.02), marginRight: getDimen(0.02), marginBottom:getDimen(0.04) }}>
                <Text style={{ fontSize: getDimen(0.04), color:'#808080'}}>
                        This is the descriptive paragraph on the lsiting that the broker has uploaded.
                    </Text>
                </View>
                

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#F2F2F2',
        marginTop: 0,
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
export default MyColleagueScreen;
