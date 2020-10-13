import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import Payment from './Payment';



// import FilterScreen from './filter';

const Stack = createStackNavigator();
const PaymentStack = function authNavigator({ }) {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Payment" component={Payment}
            />
            
        </Stack.Navigator>

    );
}


export default PaymentStack;