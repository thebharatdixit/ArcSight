import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ChatLayout from './ChatLayout';
import MainScreen from './Home';
import ColleagueListScreen from './ColleagueListScreen'
import ProfileScreen from './ProfileScreen'



const Stack = createStackNavigator();
const HomeStack = function authNavigator({ }) {

    return (
       
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="MainScreen" component={MainScreen}
            />

            
            <Stack.Screen name="Colleague List" component={ColleagueListScreen}
            />
            
            <Stack.Screen name="Chat Layout" component={ChatLayout}
            />

            <Stack.Screen name="Profile Screen" component={ProfileScreen}
            />

        </Stack.Navigator>

    );
}


export default HomeStack;