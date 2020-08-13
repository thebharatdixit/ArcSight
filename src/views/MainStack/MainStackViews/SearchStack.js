import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
//import MainScreen from './MainStackViews/Home';
// import homeScreen from '../Home/homeScreen';
import SearchScreen from './SearchScreen';
import SearchList from './SearchList'
import SearchListDetailScreen  from './SearchListDetailScreen'
import colleagueScreen from './ColleagueListScreen'

// import FilterScreen from './filter';

const Stack = createStackNavigator();
const SearchStack = function authNavigator({  }) {
   
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Search Screen" component={SearchScreen}            
            />
            <Stack.Screen name="Search List" component={SearchList}
            />
            <Stack.Screen name="Search List Detail" component={SearchListDetailScreen}
            />
            
        </Stack.Navigator>

    );
}


export default SearchStack;