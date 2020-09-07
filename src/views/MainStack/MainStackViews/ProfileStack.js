import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import ProfileScreen from './ProfileScreen'
import ChangePasswordScreen from './ChangePassword'
import ProfileUpdate from './ProfileUpdateScreen'
import SearchListDetailScreen from './SearchListDetailScreen'
import Aminities from './Aminities'


//import { updateProfile } from '../../../service/apiService';





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
            <Stack.Screen name="Update Profile" component={ProfileUpdate}
            />
            <Stack.Screen name="Search List Detail" component={SearchListDetailScreen}
            />
            
            <Stack.Screen name="Aminities" component={Aminities}
            />

        </Stack.Navigator>

    );
}


export default ProfileStack;