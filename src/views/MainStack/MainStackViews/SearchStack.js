import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './SearchScreen';
import SearchList from './SearchList'
import SearchListDetailScreen  from './SearchListDetailScreen'
import colleagueScreen from './ColleagueListScreen'
import ProfileScreen from './ProfileScreen'

const Stack = createStackNavigator();

const SearchStack = function authNavigator({ navigation }) {
   
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
            <Stack.Screen name="Colleague List" component={colleagueScreen}
            />
            <Stack.Screen name="Profile Screen" component={ProfileScreen}
            />
        </Stack.Navigator>
    );
}


export default SearchStack;