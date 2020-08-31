import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import settingScreen from './Setting'

const Stack = createStackNavigator();

const SettingStack = function authNavigator({ navigation }) {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Setting Screen" component={settingScreen}
            />
        </Stack.Navigator>
    );
}


export default SettingStack;