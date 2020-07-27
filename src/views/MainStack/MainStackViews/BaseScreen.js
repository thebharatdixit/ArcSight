import React, { useEffect } from 'react';

import {
    View, Text, TouchableOpacity, StyleSheet,
    ScrollView,
    ImageBackground,
    Image,
    StatusBar,
    ActivityIndicator,
    Modal,
    Dimensions,
    TextInput,
    ToastAndroid
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';

import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import HomeScreen from '../MainStackViews/Home';
import SearchScreen from '../MainStackViews/SearchScreen';
import ProfileScreen from '../MainStackViews/ProfileScreen';
import MyColleagueScreen from '../MainStackViews/MyColleague';
import ChatScreen from '../MainStackViews/ChatScreen';
import AddListScreen from '../MainStackViews/AddListScreen';
import FeaturedScreen from '../MainStackViews/FeaturedScreen';






const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function StackNavigation() {
  return (
      <NavigationContainer>
    <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            
            
            <Stack.Screen name="ChatScreen" component={ChatScreen}
            
            
            />
            

        </Stack.Navigator>

        </NavigationContainer>
  );
}
function BaseScreen({ navigation }) {



    // const [checked, setChecked] = React.useState(false);
    // const [password, setPassword] = React.useState('');
    // const [username, setUsername] = React.useState('');
    return (

        
        <View style={{ flex: 1 }}>

            <View style={{ width: '100%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <Image source={require('../../../assets/icons/3.png')}
                    style={{ height: 25, width: 25 }} />

                <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} />

                    <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                </View>


            </View>
            <Tab.Navigator barStyle={{ backgroundColor: '#d2d6d5' }}>
                <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        
                        tabBarLabel: false,
                        tabBarIcon: ({ focused, horizontal, tintColor }) => (
                            <Image
                                source={
                                    require('../../../assets/icons/5.png')
                                }
                                style={{
                                    width: getDimen(0.08),
                                    height: getDimen(0.08)
                                }}
                            />
                        )
                    }} />
                <Tab.Screen name="SearchScreen" component={SearchScreen}
                    options={{
                        tabBarLabel: false,
                        tabBarIcon: ({ focused, horizontal, tintColor }) => (
                            <Image
                                source={
                                    require('../../../assets/icons/6.png')
                                }
                                style={{
                                    width: getDimen(0.08),
                                    height: getDimen(0.08)
                                }}
                            />
                        )
                    }} />
                <Tab.Screen name="ProfileScreen" component={ProfileScreen}
                    options={{
                        tabBarLabel: false,
                        tabBarIcon: ({ focused, horizontal, tintColor }) => (
                            <Image
                                source={
                                    require('../../../assets/icons/7.png')
                                }
                                style={{
                                    width: getDimen(0.08),
                                    height: getDimen(0.08)
                                }}
                            />
                        )
                    }} />
                <Tab.Screen name="MyColleagueScreen" component={MyColleagueScreen}
                    options={{
                        tabBarLabel: false,
                        tabBarIcon: ({ focused, horizontal, tintColor }) => (
                            <Image
                                source={
                                    require('../../../assets/icons/8.png')
                                }
                                style={{
                                    width: getDimen(0.08),
                                    height: getDimen(0.08)
                                }}
                            />
                        )
                    }} />
                <Tab.Screen name="ChatScreen" component={ChatScreen}
                    options={{
                        tabBarLabel: false,
                        tabBarIcon: ({ focused, horizontal, tintColor }) => (
                            <Image
                                source={
                                    require('../../../assets/icons/9.png')
                                }
                                style={{
                                    width: getDimen(0.08),
                                    height: getDimen(0.08)


                                }}

                            />
                        )
                    }} />
                <Tab.Screen name="AddListScreen" component={AddListScreen}
                    options={{
                        tabBarLabel: false,
                        tabBarIcon: ({ focused, horizontal, tintColor }) => (
                            <Image
                                source={
                                    require('../../../assets/icons/10.png')
                                }
                                style={{
                                    width: getDimen(0.08),
                                    height: getDimen(0.08)
                                }}
                            />
                        )
                    }} />


                {/* <Tab.Screen name="FeaturedScreen" component={FeaturedScreen}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ focused, horizontal, tintColor }) => (
                        <Image
                            source={
                                require('../../../assets/icons/11.png')
                            }
                            style={{
                                width: getDimen(0.08),
                                height: getDimen(0.08)
                            }}
                        />
                    )
                }} /> */}



            </Tab.Navigator>

            {/* <Drawer.Navigator >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="SearchScreen" component={SearchScreen} />
      </Drawer.Navigator> */}
      {/* <StackNavigation/> */}
        </View>

        

    );

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        top: 2,
        width: '100%',
        height: '100%'
    },
    input: {
        height: 50,
        flex: 10,
        paddingLeft: 10,
        fontSize: getDimen(0.045),
        // fontFamily: 'Poppins-Regular',
        color: 'black'
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    inputContainerBottom: {
        borderWidth: 1,
        paddingBottom: 5,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row',
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        marginRight: getDimen(.085)
    },
    forgotContainer: {
        paddingTop: 10,
        paddingRight: 20,
    },
    forgotText: {
        fontSize: 13,
        alignSelf: 'flex-end',
        color: '#F26622',
    },
    textStyle1: {
        color: 'black',
        alignSelf: 'flex-start',
        marginTop: getDimen(.2),
        marginLeft: getDimen(.085),
        fontSize: getDimen(.045)
    },
    textStyle2: {
        color: '#0088DD',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: getDimen(.1),
        // marginLeft: getDimen(.085),
        fontSize: getDimen(.08)
    },
    textStyle3: {
        color: 'black',
        alignSelf: 'flex-start',
        fontStyle: 'italic',
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        fontSize: getDimen(.045)
    },
    body: {
        backgroundColor: 'white',
        // alignItems: "center", 
        // justifyContent: "center",
    },
    itemStyle: {
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        marginRight: getDimen(.085)
    },
});
// const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default BaseScreen;
