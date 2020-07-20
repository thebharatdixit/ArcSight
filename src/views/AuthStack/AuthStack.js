import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import LoginScreen from './AuthStackViews/Login';



const Stack = createStackNavigator();
const AuthStack = function authNavigator({  }) {
   
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login Screen" component={LoginScreen}
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
            {/* <Stack.Screen name="Reset Password" component={ResetPassword} />
            <Stack.Screen name="Terms &amp; Condition" component={TermsCondition} /> */}

        </Stack.Navigator>

    );
}


export default AuthStack;