import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
//import MainScreen from './MainStackViews/Home';
// import homeScreen from '../Home/homeScreen';
import BaseScreen from './MainStackViews/BaseScreen';
import ChatScreen from './MainStackViews/ChatScreen';



const Stack = createStackNavigator();
const MainStack = function authNavigator({  }) {
   
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {/* <Stack.Screen name="Main Screen" component={MainScreen}
            
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
            /> */}
            <Stack.Screen name="Base Screen" component={BaseScreen}
            
            
            />
            <Stack.Screen name="ChatScreen" component={ChatScreen}
            
            
            />
            {/* <Stack.Screen name="Reset Password" component={ResetPassword} />
            <Stack.Screen name="Terms &amp; Condition" component={TermsCondition} /> */}

        </Stack.Navigator>

    );
}


export default MainStack;