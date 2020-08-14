import React, { useEffect } from 'react';
import {createDrawerNavigator, DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import BaseScreen from '../views/MainStack/MainStackViews/BaseScreen';
import SearchScreen from '../views/MainStack/MainStackViews/SearchScreen'
import { getDimen } from '../dimensions/dimen';
import nineScreen from '../views/MainStack/MainStackViews/NineScreen'
import ChangePassword from '../views/MainStack/MainStackViews/ChangePassword'
import ProfileScreen from '../views/MainStack/MainStackViews/ProfileScreen'
const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
    return (
        <Drawer.Navigator initialRouteName="HomeStack"
            drawerStyle={{
                backgroundColor: '#917C38',
            }}
            
            drawerContentOptions={{
                activeTintColor: 'white',
                inactiveTintColor: 'white',
                labelStyle: {fontSize:getDimen(0.05)}
                // itemStyle: { marginVertical: 30 },
            }}
        >
            <Drawer.Screen name="HOME" component={BaseScreen} />
            <Drawer.Screen name="PROFILE" component={ProfileScreen} />
            <Drawer.Screen name="LISTINGS" component={nineScreen} />
            <Drawer.Screen name="CHANGE PASSWORD" component={ChangePassword} />
            <Drawer.Screen name="COLLEAGUES + CLIENTS" component={nineScreen} />
            <Drawer.Screen name="MESSAGES" component={nineScreen} />
            <Drawer.Screen name="ADD NEW LISTING" component={nineScreen} />
            <Drawer.Screen 
            drawerStyle={{backgroundColor:'red'}}
                name="UPGRADE TO PRO" component={nineScreen} />
            <Drawer.Screen
                drawerStyle={{ backgroundColor: 'red' }}
                name="SETTINGS" component={nineScreen} />
            <Drawer.Screen
                drawerStyle={{ backgroundColor: 'red' }}
                name="LOG OUT" component={nineScreen} />
        </Drawer.Navigator>
    
    );
};

export default DrawerNavigator;

