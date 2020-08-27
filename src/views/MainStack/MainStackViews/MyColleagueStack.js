import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import myColleagueScreen from './MyColleague'
// import SearchListDetailScreen from './SearchListDetailScreen';
import MyListingDetailScreen from './MyListingDetail'


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
        
        </Stack.Navigator>

    );
}


export default MyColleagueStack;