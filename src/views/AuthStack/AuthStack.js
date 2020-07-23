import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import LoginScreen from './AuthStackViews/Login';
import RegisterScreen from './AuthStackViews/RegisterScreen';
<<<<<<< HEAD
import BaseScreen from './MainStackViews/BaseScreen';

=======
import MainStack from '../MainStack/MainStack';
>>>>>>> ecd62c446f44c21f5c5662d2f38b30c6d58a163e


const Stack = createStackNavigator();
const AuthStack = function authNavigator({  }) {
   
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login Screen" component={LoginScreen} />
            
            <Stack.Screen name="Register Screen" component={RegisterScreen}
            // options={{
            //     title: 'My home',
            //     headerStyle: {
            //         backgroundColor: '#f4511e',
            //     },
            //     headerTintColor: '#fff',
            //     headerTitleStyle: {
            //         fontWeight: 'bold',
            //     },
            // }}
            />
            <Stack.Screen name="Main Stack" component={MainStack} />
            {/* <Stack.Screen name="Terms &amp; Condition" component={TermsCondition} /> */}

        </Stack.Navigator>

    );
}


export default AuthStack;