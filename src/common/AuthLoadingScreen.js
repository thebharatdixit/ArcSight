import { createAppContainer, createSwitchNavigator, } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { getDimen } from '../dimensions/dimen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    ActivityIndicator,
    StatusBar,
    View,
    Image,
} from 'react-native';
import React from 'react';
import { getData, storeData } from "../utils/asyncStore";
import Main from "../views/main.js";
import Register from "../views/register.js";

import ForgotPass1 from "../views/ForgotPassword/ForgotPass1";
import ForgotPass2 from "../views/ForgotPassword/ForgotPass2";
import ForgotPass3 from "../views/ForgotPassword/ForgotPass3";

import SelectAirport from "../views/Airport Selection/selectAirport";
import AirportList from "../views/Airport Selection/airportList";
import SelectAirportInfo from "../views/Airport Selection/selectAirportInfo";

import Coupons from "../views/Outlet/coupons";
import OutletMenu from "../views/Outlet/outletMenu";
import OutletScreen from "../views/Outlet/OutletScreen";
import OutletList from "../views/Outlet/outletList";
import OutletItems from "../views/Outlet/outLetItems";
import YourCart from "../views/Outlet/yourCart";
import Offers from "../views/Offers/offers";
import Offers2 from "../views/Offers/offers2";
import Search from "../views/Search/search";

import Profile from "../views/Profile/profile";
import Qrcode from "../views/Profile/QRCode/qrCode";
import PhoneVarCode from "../views/Profile/Setting/PhoneVerification/phoneCodeverification";

import EmailVarCode from "../views/Profile/Setting/EmailVerification/emailCodeverification";

import UpcomingOrder from "../views/Order/upcomingOrder";
import RateAndFeedback from "../views/Order/rateAndFeedback";

import Wallet from "../views/Profile/Wallet/wallet";
import Payment from "../views/Outlet/payment";

import Setting from "../views/Profile/Setting/setting";
import EditProfile from "../views/Profile/Setting/editProfile";

import OrderBase from "../views/Order/orderBase";

import Home from "../views/Home/home.js";
import Notification from "../views/Home/notification.js";
import Filters from "../views/filters";

import homeStackNavigation from '../common/homeStackNavigation'
import searchNavigation from '../common/searchNavigation'
import DrawerM from '../views/Drawer/DrawerMenus';
import offersNavifation from '../common/offersNavigation'
import orderNavigation from '../common/orderNavigation'
import profileNavigation from '../common/profileNavigation'
import store from '../store/configureStore';
import { getCartItemList } from '../actions/cartAction';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //      console.log("this.state.count auth : " + this.props.count)
        //    console.log("Changing data")

        getData('user').then((user) => {
            //  console.log('USER reson id : ' + JSON.stringify(user));
            const userdata = JSON.parse(user);
            if (userdata) {
                let dataForCart = {
                    "user_id": userdata.id,
                    "device_type": Platform.OS,
                    "device_token": userdata.device_token,
                    "access_token": userdata.access_token,
                }
                getCartItemList(this.props.dispatch, dataForCart).then((responseCart) => {

                    if (responseCart.status) {

                        if (responseCart.cartDataList && responseCart.cartDataList.length) {

                            var qty = 0;
                            for (let i = 0; i < responseCart.cartDataList.length; i++) {
                                if (responseCart.cartDataList[i].outletItemList) {
                                    for (let j = 0; j < responseCart.cartDataList[i].outletItemList.length; j++) {
                                        if (responseCart.cartDataList[i].outletItemList[j].quantity && responseCart.cartDataList[i].outletItemList[j].quantity.length > 0) {
                                            qty = qty + parseInt(responseCart.cartDataList[i].outletItemList[j].quantity, 10)
                                        }
                                    }
                                }
                            }
                            store.dispatch({
                                type: 'BADGE_CHANGE',
                                payload: {
                                    badge: qty

                                }
                            })

                        }
                    }
                    this._bootstrapAsync();

                });
            } else {
                this._bootstrapAsync();

            }



        })
    }

    componentWillReceiveProps(nextProps) {
        //  console.log("nextProps AUTH : " + nextProps)
    }
    _bootstrapAsync = async () => {

        getData('travelTypeServiceId').then((TravelId) => {
            // console.log('TravelTypeServiceId :', TravelId);
            getData('isLogin').then((value) => {
                console.log('isLogin :', value)
                getData('role_id').then((role_id) => {
                    console.log('role_id :', role_id)
                    if (role_id === "3") {
                        console.log('role_id is inside: ' + role_id);
                        this.props.navigation.navigate('AppVendor');
                    }
                    else {
                        if (value !== null) {
                            if (value) {

                                if (TravelId !== null) {
                                    if (TravelId) {
                                        this.props.navigation.navigate('App');
                                    }
                                    else {
                                        this.props.navigation.navigate('Airport');
                                    }
                                }
                                else {
                                    this.props.navigation.navigate('Airport');
                                }
                            }
                            else {
                                this.props.navigation.navigate('Auth');
                            }


                        }

                        else {
                            this.props.navigation.navigate('Auth');
                        }
                    }

                })
            })
        })


    };

    render() {
        return (
            <View>
                <ActivityIndicator />
                {/* <StatusBar barStyle="default" /> */}
                <Image style={{
                    width: '100%',
                    height: '100%',
                    alignSelf: 'center',
                    resizeMode: 'contain'
                }} source={require('../assets/images/Splash2.png')} />
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        count: state.navigation.count,
    }
}
export default connect(mapStateToProps, null)(AuthLoadingScreen);
