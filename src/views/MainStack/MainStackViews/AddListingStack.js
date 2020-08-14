import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import AddListScreen from './AddListScreen';
import ChatLayout from './ChatLayout';

// import FilterScreen from './filter';

const Stack = createStackNavigator();
const AddListingStack = function authNavigator({ }) {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Search Screen" component={AddListScreen}
            />

            <Stack.Screen name="Chat Layout" component={ChatLayout}
            />



        </Stack.Navigator>

    );
}


export default AddListingStack;