import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
//import MainScreen from './MainStackViews/Home';
// import homeScreen from '../Home/homeScreen';
import SearchScreen from './SearchScreen';
import FilterScreen from './filter';



const Stack = createStackNavigator();
const SearchStack = function authNavigator({  }) {
   
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
            <Stack.Screen name="Search Screen" component={SearchScreen}
            
            
            />
            <Stack.Screen name="Filter Screen" component={FilterScreen}
            
            
            />
            {/* <Stack.Screen name="Reset Password" component={ResetPassword} />
            <Stack.Screen name="Terms &amp; Condition" component={TermsCondition} /> */}

        </Stack.Navigator>

    );
}


export default SearchStack;