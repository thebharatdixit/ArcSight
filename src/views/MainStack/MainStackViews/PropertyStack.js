import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import PropertyScreen from './PropertyScreen'
import Aminities from './Aminities'


const Stack = createStackNavigator();

const PropertyStack = function authNavigator({ }) {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Property Screen" component={PropertyScreen} 
            />
            <Stack.Screen name="Aminities" component={Aminities}
            />

        </Stack.Navigator>

    );
}


export default PropertyStack;