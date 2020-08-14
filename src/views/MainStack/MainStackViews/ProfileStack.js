import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import ProfileScreen from './ProfileScreen'
import ChangePasswordScreen from './ChangePassword'


const Stack = createStackNavigator();

const ProfileStack = function authNavigator({ }) {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Profile Screen" component={ProfileScreen}
            />
            <Stack.Screen name="Change Password Screen" component={ChangePasswordScreen}
            />

        </Stack.Navigator>

    );
}


export default ProfileStack;