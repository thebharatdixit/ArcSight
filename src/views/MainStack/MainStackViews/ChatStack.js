import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import ChatScreen from './ChatScreen';
import ColleagueListScreen from './ColleagueListScreen'
import ChatLayout from './ChatLayout'
import SearchListDetailScreen from './SearchListDetailScreen'


// import FilterScreen from './filter';

const Stack = createStackNavigator();
const ChatStack = function authNavigator({ }) {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Chat Screen" component={ChatScreen}
            />
            <Stack.Screen name="Colleague List" component={ColleagueListScreen}
            />

            <Stack.Screen name="Chat Layout" component={ChatLayout}
            />

            <Stack.Screen name="Search List Detail" component={SearchListDetailScreen}
            />


        </Stack.Navigator>

    );
}


export default ChatStack;