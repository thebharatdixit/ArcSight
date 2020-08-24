
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, SafeAreaView } from 'react-native';
import Blank from '../views/AuthStack/AuthStackViews/Blank';
// import AuthStack from './AuthStack';
// import PatientSelectionStack from './PatientSelectionStack';
// import ProtocolStack from './protocolStack';
// import AppNavigator from './drawerNavigator';
// import ScreeningStack from './ScreeningPatientStack';
// import EnrolledStack from './EnrolledPatientStack';
import { getData, storeData } from '../utils/asyncStore';
import { connect } from 'react-redux';
import AuthStack from '../views/AuthStack/AuthStack';
import LoginScreen from '../views/AuthStack/AuthStackViews/Login';

import MainStack from '../views/MainStack/MainStack';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { changeAuthState, changeProtocolState, changeToLogoutState } from '../actions/authAction';
import DrawerNavigator from './DrawerNavigator';
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const Nav = function Navigator({ isLoggedIn, changeAuthState }) {
  //console.log("after Navigator :" + JSON.stringify(isLoggedIn) + ":>" + isLoggedIn.isLoggedIn);
  //console.log(isLoggedIn.isLoggedIn ? "LOgin true " : "login false")
  const [login, setIsLogin] = React.useState("");
  const [loading, setloading] = React.useState(true);
  const [proto, setProto] = React.useState(false);
  const [isEnrolled, setIsEnrolled] = React.useState(false);


  React.useEffect(() => {
    console.log('aysncsto');
    getData('isLogin').then((isLogin) => {
      console.log('aysncsto :' + isLogin);
      if (isLogin === 'true') {
        changeAuthState(true)
        setIsLogin(true)
      }
      else {
        changeAuthState(false)
        setIsLogin(false)
      }
    })

  }, [])

  return (

    <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      {console.log("In return :" + JSON.stringify(isLoggedIn) + "..:." + login)}
      {(isLoggedIn) ? <DrawerNavigator /> : isLoggedIn === false ? <AuthStack /> : <Blank />}
    </SafeAreaView>

  );
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = {
  changeAuthState
}

const Navigation = connect(mapStateToProps, mapDispatchToProps)(Nav);
export default Navigation;
