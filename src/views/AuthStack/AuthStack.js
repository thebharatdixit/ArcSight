// import * as React from 'react';

// import { createStackNavigator } from '@react-navigation/stack';
// import { View, Text } from 'react-native';
// import LoginScreen from './AuthStackViews/Login';
// import RegisterScreen from './AuthStackViews/RegisterScreen';
// import ForgotPasswordScreen from './AuthStackViews/ForgotPassword'
// import MainStack from '../MainStack/MainStack';


// const Stack = createStackNavigator();
// const AuthStack = function authNavigator({ }) {

//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerShown: false
//             }}
//         >
//             <Stack.Screen name="Login Screen" component={LoginScreen} />
//             <Stack.Screen name="Register Screen" component={RegisterScreen} />
//             <Stack.Screen name="Main Stack" component={MainStack} />
//             <Stack.Screen name="ForgotPassword Screen" component={ForgotPasswordScreen} />

//         </Stack.Navigator>

//     );
// }


// export default AuthStack;


import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import LoginScreen from './AuthStackViews/Login';
import RegisterScreen from './AuthStackViews/RegisterScreen';
import ForgotPasswordScreen from './AuthStackViews/ForgotPassword'
import MainStack from '../MainStack/MainStack';
 const Stack = createStackNavigator();

const Nav = function Navigator(props) {

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            {!props.isLoggedIn ? (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="Login Screen" component={LoginScreen} />
                    <Stack.Screen name="Register Screen" component={RegisterScreen} />
                    <Stack.Screen name="ForgotPassword Screen" component={ForgotPasswordScreen} />

                </Stack.Navigator>
            ) :
                <MainStack />
            }
        </View>
    );
}
const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = {
}

const AuthStack = connect(mapStateToProps, mapDispatchToProps)(Nav);
export default AuthStack;
