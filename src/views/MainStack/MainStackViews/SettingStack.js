import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import settingScreen from './Setting'
import privacyPolicyScreen from './PrivacyPolicy'
import Terms from './Terms';
 

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
            <Stack.Screen name="Privacy Policy Screen" component={privacyPolicyScreen}/>
            <Stack.Screen name="Terms" component={Terms}
            />
        </Stack.Navigator>
    );
}


export default SettingStack;