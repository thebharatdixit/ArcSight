import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import myColleagueScreen from './MyColleague'
import ProfileScreen from './ProfileScreen'
import EditPropertyScreen from './EditPropertyScreen'

import ColleagueListScreen from './ColleagueListScreen'

// import SearchListDetailScreen from './SearchListDetailScreen';
import MyListingDetailScreen from './MyListingDetail'
import Aminities from './Aminities'

const Stack = createStackNavigator();
const MyColleagueStack = function authNavigator({ }) {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="My Colleague" component={myColleagueScreen}
            />

            {/* <Stack.Screen name="Search List Detail" component={SearchListDetailScreen}
            /> */}

            <Stack.Screen name="My Listing Detail" component={MyListingDetailScreen}
            />

            <Stack.Screen name="Profile Screen" component={ProfileScreen}
            />
            <Stack.Screen name="Colleague List" component={ColleagueListScreen}
            />
            <Stack.Screen name="Edit Property Screen" component={EditPropertyScreen}
            />
            <Stack.Screen name="Aminities" component={Aminities}
            />

        </Stack.Navigator>

    );
}


export default MyColleagueStack;