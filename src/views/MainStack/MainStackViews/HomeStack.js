import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ChatLayout from './ChatLayout';
import MainScreen from './Home';
import ColleagueListScreen from './ColleagueListScreen'
import ProfileScreen from './ProfileScreen'
import SearchListDetailScreen from './SearchListDetailScreen';
import ThreeSixtyView from './ThreeSixtyView';
import MapScreen from './MapScreen'
import EditPropertyScreen from './EditPropertyScreen';

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

            <Stack.Screen name="Search List Detail" component={SearchListDetailScreen}
            />

            <Stack.Screen name="ThreeSixtyView" component={ThreeSixtyView}
            />

            <Stack.Screen name="Map Screen" component={MapScreen}
            />

            <Stack.Screen name="Edit Property Screen" component={EditPropertyScreen}
            />

        </Stack.Navigator>

    );
}


export default HomeStack;