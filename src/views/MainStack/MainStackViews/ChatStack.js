import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import ChatScreen from './ChatScreen';
import ColleagueListScreen from './ColleagueListScreen'


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
            

        </Stack.Navigator>

    );
}


export default ChatStack;