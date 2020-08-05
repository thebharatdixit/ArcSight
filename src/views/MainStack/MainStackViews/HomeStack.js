import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
//import MainScreen from './MainStackViews/Home';
// import homeScreen from '../Home/homeScreen';
import AddListScreen from './AddListScreen';
import ChatLayout from './ChatLayout';
import MainScreen from './Home';

// import FilterScreen from './filter';

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

            <Stack.Screen name="Chat Layout" component={ChatLayout}
            />



        </Stack.Navigator>

    );
}


export default HomeStack;