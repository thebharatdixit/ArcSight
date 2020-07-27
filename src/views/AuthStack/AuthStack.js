import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import LoginScreen from './AuthStackViews/Login';
import RegisterScreen from './AuthStackViews/RegisterScreen';
import MainStack from '../MainStack/MainStack';


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