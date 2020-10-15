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
    Alert,
    Platform
} from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { WebView } from 'react-native-webview';

// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import ImagePicker from 'react-native-image-picker';
//import loginActions from '../../actions/authAction';
//import loginActions from '../../actions/loginActions';
import { login } from '../../../actions/loginAction';
import { storeData, getData } from '../../../utils/asyncStore';


function Payment({ navigation }) {
    const [url, setUrl] = React.useState('');


    React.useEffect(() => {
        getData('userData').then((data) => {
            const userData = JSON.parse(data);
            const listTokens = userData.token;
            // const userData = 
            console.log('USER id : ' + userData.user.id);
            var userId = userData.user.id;
            var paymentUrl = "http://3.22.155.246/payment?user_id=" + userId

            setUrl(paymentUrl);
        })

        console.log(" Rerendering ")
    }, [url])

    const handleOpenURL = (data) => {
        console.log('call backs returning home ' + JSON.stringify(data));
        // var titleText = '' + data.title;
        // var arrAll = titleText.split('/');
        // var dataStatus = arrAll[0];
        // var dataMessage = arrAll[1];
        // if (dataStatus === "Success") {
        //     Alert.alert(dataMessage);

        //     // const resetAction = StackActions.reset({
        //     //     index: 0,
        //     //     actions: [NavigationActions.navigate({ routeName: 'YourCart' })],
        //     // });
        //     // this.props.navigation.dispatch(resetAction);
        //     // this.props.navigation.navigate('My Orders');
        //     console.log('call backs returning Success: ');
        // }
        // else if (dataStatus === "Failure" || dataStatus === "Aborted") {
        //     Alert.alert(dataMessage);
        //     console.log('call backs returning Failure or Aborted: ');
        //     // this.props.navigation.navigate('Payment', ({ 'totalAmount': this.state.finalAmount, 'DataToSend': this.state.DataToSendNext, 'from': 'paymentView' }));
        // }
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

                <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    {/* <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} /> */}

                    <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                </View>
            </View>

            <View style={{ flex: 0.90, width: '100%', height: '100%', backgroundColor: 'white' }}>
                <WebView
                    // ref={(WEBVIEW) => { this.WEBVIEW = WEBVIEW }}
                    source={{ uri: url }}
                    style={{ flex: 1 }}
                    onNavigationStateChange={handleOpenURL()}
                />
            </View>
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

});
// const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default Payment;
