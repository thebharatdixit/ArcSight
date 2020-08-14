
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, SafeAreaView } from 'react-native';
// import AuthStack from './AuthStack';
// import PatientSelectionStack from './PatientSelectionStack';
// import ProtocolStack from './protocolStack';
// import AppNavigator from './drawerNavigator';
// import ScreeningStack from './ScreeningPatientStack';
// import EnrolledStack from './EnrolledPatientStack';
import { connect } from 'react-redux';
import AuthStack from '../views/AuthStack/AuthStack';
import MainStack from '../views/MainStack/MainStack';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { changeAuthState, changeProtocolState, changeToLogoutState } from '../actions/authAction';



const Stack = createStackNavigator();

const Nav = function Navigator({ navigation, isLoggedIn, protocol }) {
  // const isLoggedIn = true;
  // const protocol = false;
  // if (isLoggedIn) {
  //     console.log("Login true")
  // } else {
  //     console.log("Login false")
  // }
  const [login, setIsLogin] = React.useState(false);
  const [proto, setProto] = React.useState(false);
  const [isEnrolled, setIsEnrolled] = React.useState(false);

  const changeProtocol = function (protocol) {
    //   changeAuthState(false);
    // console.log("protocol state changed");
    setProto(protocol)
  }
  const changeLogin = function (login) {
    //   changeAuthState(false);
    // console.log("protocol state changed");
    setIsLogin(login)
  }
  const changeIsEnrolled = function (isEnrolled) {
    //   changeAuthState(false);
    // console.log("protocol state changed");
    setIsEnrolled(isEnrolled)
  }
  React.useEffect(() => {
    console.log("Did mount called Navigation")
    if (isLoggedIn) {
      console.log("Login true")
    } else {
      console.log("Login false")
    }
    if (protocol) {
      console.log("protocol true")
    } else {
      console.log("protocol false")
    }

  }, [isLoggedIn])
  return (

    <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      {/* {console.log("Did mount called Navigation 2")} */}

      {/* {
        login ?
          <MainStack />
          :
          <AuthStack />
      } */}

      <MainStack />

    </SafeAreaView>

  );
}
const mapStateToProps = (state) => ({
  // isLoggedIn: state.auth.isLoggedIn,
  // protocol: state.auth.protocol,
  // count: state.navigation.count,
  // badge: state.navigation.badge

});
const mapDispatchToProps = (dispatch) => ({
  changeAuthState, changeProtocolState, changeToLogoutState
});

// function mapStateToProps(state) {
//   return {
//     count: state.navigation.count,
//     badge: state.navigation.badge
//   }
// }

// function mapDispatchToProps(dispatch) {

//   return {
//     dispatch,
//     ...bindActionCreators({

//     },
//       dispatch
//     ),
//   };
// }

const Navigation = connect(mapStateToProps, mapDispatchToProps)(Nav);
export default Navigation;
