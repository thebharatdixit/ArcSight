
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { getDimen } from '../dimensions/dimen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconBadge from 'react-native-icon-badge';
import {
    ActivityIndicator,
    StatusBar,
    View,
    Image,
    IconBadgeIconBadgeIconBadge,
    Text
} from 'react-native';
import React from 'react';
import store from '../store/configureStore';


import homeStackNavigation from '../common/homeStackNavigation'
import searchNavigation from '../common/searchNavigation'

import orderNavigation from '../common/orderNavigation'
import profileNavigation from '../common/profileNavigation'

import cartNavigator from "./cartNavigator";


const bottomTabNavigator = createBottomTabNavigator(
    {
        'Home Screen': homeStackNavigation,
        'Search': searchNavigation,
        // 'Offer': offersNavifation,
        // 'Offer': raiseAticket,
        'My Orders': orderNavigation,
        'Cart': cartNavigator,

        'Profile': profileNavigation,
    },
    {
        /* Other configuration remains unchanged */
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                // var badgeCount = 4;
                // store.subscribe(() =>
                //     badgeCount = store.getState().navigation.badge
                // )
                const { routeName } = navigation.state;
                // let IconComponent = Ionicons;
                let iconName;

                if (focused) {
                    if (routeName === 'Home Screen') {
                        return <Image source={require('../assets/images/home.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#F6512B' }} />;
                    } else if (routeName === 'Search') {
                        return <Image source={require('../assets/images/search.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#F6512B' }} />;
                    } else if (routeName === 'Cart') {
                        return <Image source={require('../assets/images/cart.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#F6512B' }} />;
                    } else if (routeName === 'My Orders') {
                        return <Image source={require('../assets/images/order.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#F6512B' }} />;
                    } else if (routeName === 'Profile') {
                        return <Image source={require('../assets/images/profile.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#F6512B' }} />;
                    }
                }
                else {
                     const badgeCount = navigation.getParam('badgeCount', 0)
                    if (routeName === 'Home Screen') {
                        return <Image source={require('../assets/images/home.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'black' }} />;
                    } else if (routeName === 'Search') {
                        return <Image source={require('../assets/images/search.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'black' }} />;
                    } else if (routeName === 'Cart') {
                        return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <IconBadge
                                MainElement={
                                    <View style={{
                                        width: 22,
                                        height: 22,
                                        margin: 8
                                    }}
                                    >
                                        <Image
                                            source={require('../assets/images/cart.png')}
                                            style={{ width: 20, height: 20, tintColor: 'black', alignSelf: 'center', marginTop: 7 }} />
                                    </View>
                                }
                                BadgeElement={
                                    <Text style={{ color: '#FFFFFF' }}>{badgeCount}</Text>
                                }
                                IconBadgeStyle={
                                    {
                                        width: 20,
                                        height: 20,
                                        backgroundColor: '#F6512B',
                                    }}
                                Hidden={badgeCount === 1}
                            />
                        </View>;
                    } else if (routeName === 'My Orders') {
                        return <Image source={require('../assets/images/order.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'black' }} />;
                    } else if (routeName === 'Profile') {
                        return <Image source={require('../assets/images/profile.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'black' }} />;
                    }
                }

            },

        }),
        tabBarOptions: {

            style: {
                backgroundColor: 'White',
            },
            activeTintColor: '#F6512B',
            inactiveTintColor: 'black',
            tabStyle: {
                marginTop: (Platform.OS === 'ios') ? 0 : 0,
                height: getDimen(.115),
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
            },
            labelStyle: {
                fontSize: getDimen(.025),
                // color: 'black',
                margin: 0,
                padding: 0,
            },
            keyboardHidesTabBar: false,
        },
    }
)


function mapStateToProps(state) {
    return {
        badge: state.navigation.badge,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        dispatch,
        ...bindActionCreators({

        },
            dispatch
        ),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(bottomTabNavigator)
