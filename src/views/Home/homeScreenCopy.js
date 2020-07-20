import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
    SafeAreaView,
    FlatList,
    TouchableWithoutFeedback,
    Alert,
    Platform
} from 'react-native';
import store from '../../store/configureStore';
import Modal from 'react-native-modal';
import { FloatingAction } from "react-native-floating-action";
import { Container, Button, Picker, Icon, Tab, Tabs, ScrollableTab, Form, ListItem, Label, Item, Input, Content, Card, CardItem, Header, Footer, FooterTab, Left, Right, Body, Title } from 'native-base';
import { getDimen } from '../../dimensions/dimen';
import { setCurrentTab } from '../../actions/tabSelection';
import { bindActionCreators } from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { Pages } from 'react-native-pages';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { getData, storeData, clearData } from '../../utils/asyncStore';
import { getTerminalServingType } from '../../actions/homeScreenAction';
import { getSpecialFoodType, getHomeData } from '../../actions/homeAction';
import { getOutletsList, doCheckOutletAvailability } from '../../actions/outletAction';
import DatePicker from 'react-native-datepicker';
import { getCartItemList } from '../../actions/cartAction';
import CustomText from '../../common/CustomText'
import TimePicker from "react-native-24h-timepicker";
const actions = [
    {
        text: "Offers",
        icon: require("../../assets/images/offer.png"),
        name: "bt_offers",
        position: 1
    }
];
class HomeScreen extends Component {
    state = {
        arrFavourite: [],
        stickyHeaderIndices: [1, 2, 3, 4, 5, 6],
        selectedType: '1',
        travelTypeId: '',
        servingtypeArr: [],
        selectedServingTypeId: '',
        dietary: '',
        sort: 'none',
        priceRange: '',
        specialFood: '',
        data: {},
        sortFilter: [],
        rangeFilter: [],
        specailFilter: [],
        isPriceRange: false,
        isDietary: false,
        sortVar: '',
        isSort: false,
        isSpecialFood: false,
        showLoader: false,
        filter: {
            "pure_veg": "",
            sort: [],
            range: [],
            specail: [],
        }
    }
    sortSelection() {
        // console.log('sorttype:' + this.state.sortVar)
        if (this.state.sortVar === '') {
            this.setState({ isSort: false });
        }
        else {
            this.setState({ isSort: true });
        }
        this.setState({ filterType: '', filterSelected: 'selected' });
        this.doSpecialFoodType();

    }
    rangeSelection() {
        if (this.state.priceRange === '') {
            this.setState({ isPriceRange: false });
        }
        else {
            this.setState({ isPriceRange: true });
        }
        this.setState({ filterType: '', filterSelected: 'selected' });
        this.doSpecialFoodType();
    }
    dietarySelection() {
        if (this.state.dietary === '') {
            this.setState({ isDietary: false });
        }
        else {
            this.setState({ isDietary: true });
        }
        this.setState({ filterType: '', filterSelected: 'selected' });
        this.doSpecialFoodType();

    }
    dietarySelected() {

        this.setState({ filter: { ...this.state.filter, pure_veg: this.state.dietary === 'yes' ? "" : 'yes' }, dietary: this.state.dietary === 'yes' ? "" : 'yes' })

    }
    priceRangeSelected(value) {


        var range = []
        range.push(value)
        // console.log("sort : " + JSON.stringify(range))
        //  console.log("Modified sort : " + JSON.stringify({ ...this.state.filter, range }))

        this.setState({ filter: { ...this.state.filter, range }, priceRange: value })

    }
    async getCartData(userdata) {

    }
    async doSpecialFoodType() {

        getData('user').then((user) => {
            //  console.log('USER reson id : ' + JSON.stringify(user));
            const userdata = JSON.parse(user);

            getData('accessToken').then((accessToken) => {
                let data = {
                    "user_id": userdata.id,
                    "access_token": accessToken,
                    "device_type": Platform.OS,
                    "device_token": "hdskjdkjheuyuriewhgewuiwyewehjewuiyew"
                }
                this.setState({ showLoader: true });
                getSpecialFoodType(this.props.dispatch, data).then((response) => {
                    this.setState({ showLoader: false });
                    if (response && response.message && response.message === 'Please provide valid access token') {
                        clearData();
                        this.props.navigation.navigate("Auth")
                        // store.dispatch({
                        //     type: 'COUNT_CHANGE',
                        //     payload: {
                        //         count: Math.floor(Math.random() * 100) + 1
                        //     }
                        // });
                    }
                    let dataForCart = {
                        "user_id": userdata.id,
                        "device_type": Platform.OS,
                        "device_token": userdata.device_token,
                        "access_token": userdata.access_token,
                    }
                    this.setState({ showLoader: true });
                    getCartItemList(this.props.dispatch, dataForCart).then((responseCart) => {
                        this.setState({ showLoader: false });
                        if (responseCart && responseCart.message && responseCart.message === 'Please provide valid access token') {
                            clearData();
                            // store.dispatch({
                            //     type: 'COUNT_CHANGE',
                            //     payload: {
                            //         count: Math.floor(Math.random() * 100) + 1
                            //     }
                            // });
                        }
                        if (responseCart.status) {

                            var dateTimeForOutlet = '';
                            if (responseCart.cartDataList && responseCart.cartDataList.length) {
                                dateTimeForOutlet = responseCart.cartDataList[0].delivery_date_time;

                                //       console.log("responseCart.cartDataList : " + JSON.stringify(responseCart.cartDataList));
                                store.dispatch({
                                    type: 'BADGE_CHANGE',
                                    payload: {
                                        badge: responseCart.cartDataList[0].outletItemList ? responseCart.cartDataList[0].outletItemList.length : 0

                                    }
                                })

                            }


                            storeData('dateForOutlet', dateTimeForOutlet);
                            if (response) {
                                this.setState({ specialFoodArr: response.specialFoodType, dateTimeForOutlet })
                            } else {
                                this.setState({ specialFoodArr: [], dateTimeForOutlet })
                            }
                        } else {
                            store.dispatch({
                                type: 'BADGE_CHANGE',
                                payload: {
                                    badge: 0
                                }
                            })
                            storeData('dateForOutlet', '');
                            if (response) {
                                this.setState({ specialFoodArr: response.specialFoodType, dateTimeForOutlet: '' })
                            } else {
                                this.setState({ specialFoodArr: [], dateTimeForOutlet: '' })
                            }
                        }
                    });
                    //console.log("Getting cart data : " + JSON.stringify(cartdata));

                });
                getData('selectedAirport').then((selectedAirport) => {
                    //     console.log('selectedairportathome: ' + selectedAirport);
                    const selectedAirportObject = JSON.parse(selectedAirport);
                    getData('selectedTerminalId').then((selectedTerminalId) => {
                        getData('travel_type_id').then((travel_type_id) => {
                            const sort = []
                            if (this.state.sort !== '')
                                sort.push(this.state.sort)
                            const range = []
                            if (this.state.priceRange !== '')
                                range.push(this.state.priceRange)
                            const specail = []
                            if (this.state.specialFood !== '')
                                specail.push(this.state.specialFood)
                            const pure_veg = this.state.dietary
                            const homeData = {
                                "user_id": userdata.id,
                                "airport_id": selectedAirportObject.id,
                                "terminal_id": selectedTerminalId,
                                "travel_type_id": travel_type_id,
                                "device_type": Platform.OS,
                                "device_token": userdata.device_token,
                                "access_token": userdata.access_token,
                                "filter": this.state.filter

                            }
                            //   console.log("API REQUEST : " + JSON.stringify(homeData));
                            //   console.log("access_token : " + userdata.access_token)
                            this.setState({ showLoader: true });
                            getHomeData(this.props.dispatch, homeData).then((response) => {
                                this.setState({ showLoader: false });
                                if (response && response.message && response.message === 'Please provide valid access token') {
                                    clearData();
                                    Alert.alert("Token Expire please login again.")
                                    this.props.navigation.navigate("Auth")

                                    return;

                                    // store.dispatch({
                                    //     type: 'COUNT_CHANGE',
                                    //     payload: {
                                    //         count: Math.floor(Math.random() * 100) + 1
                                    //     }
                                    // });
                                }
                                if (response) {
                                    //      console.log("getHomeData RESPONSE : " + JSON.stringify(response))
                                    this.setState({ data: response, name: selectedAirportObject.name })
                                } else {
                                    this.setState({ name: selectedAirportObject.name })

                                }
                            });

                        });

                    });
                });
            });
        })
    }
    getBackgroundColor = (pos) => {
        //   console.log('pR: ' + this.state.priceRange + ', pos :' + pos);
        if (this.state.priceRange == pos) {
            //  console.log('insert');
            return '#F6512B';


        } else {
            //    console.log('outside');
            return 'white';

        }

    }
    sortSelected(value) {
        var sort = []
        if (this.state.sort === value) {
            sort = { sort: '' };
            sort.push('');
        }
        else {
            sort.push(value);
        }
        // console.log("sort : " + JSON.stringify(sort))
        // console.log("Modified sort : " + JSON.stringify({ ...this.state.filter, sort }))

        this.setState({ filter: { ...this.state.filter, sort }, sortVar: 'done' })

    }
    specialFoodSelected(value) {
        var special = '';
        if (this.state.specialFood === value) {
        }
        else {
            special = value;
            this.setState({ specialFood: value });
        }
        var specail = []
        specail.push(special);
        this.setState({ filter: { ...this.state.filter, specail }, specialFood: special })


    }
    disableDateTimePopup() {
        this.setState({ isAskDateTime: false, outletId: '', indexFor: '', itemData: '' });
    }

    foodSelection() {
        if (this.state.specialFood === '') {
            this.setState({ isSpecialFood: false });
        }
        else {
            this.setState({ isSpecialFood: true });
        }
        this.setState({ filterType: '', filterSelected: 'selected' });
        this.doSpecialFoodType();


    }
    getBorderWidth = (pos) => {
        //   console.log('pR: ' + this.state.priceRange + ', pos :' + pos);
        if (this.state.priceRange == pos) {
            //      console.log('insert');
            return 0;


        } else {
            //      console.log('outside');
            return 1;

        }

    }


    getTextColor = (pos) => {
        if (this.state.priceRange == pos) {
            return 'white';

        } else {
            return 'black';

        }

    }
    componentDidMount() {

        getData('selectedType').then((type) => {
            //    console.log('Selected Type : ' + type);

            this.setState({
                selectedType: type, travelTypeId: type, dateTimeForOutlet: '', isAskDateTime: false
            });
        })
        //  console.log("Passed Filter  :  " + JSON.stringify(this.props))
        const { navigation } = this.props;

        this.focusListener = navigation.addListener('didFocus', () => {
            this.doTerminalServingType();

        });
        //this.doSpecialFoodType();

    }
    refresh(filters) {
        //      console.log("filters selected : " + JSON.stringify(filters))
        var isDietary = false;
        var isSort = false;
        var isSpecialFood = false;
        var sort = ''
        var dietary = '';
        if (filters.sort && filters.sort.length) {
            sort = filters.sort[0]
            isSort = true;
        }
        var priceRange = ''
        var isPriceRange = false;
        if (filters.range && filters.range.length) {
            priceRange = filters.range[0]
            isPriceRange = true
        }
        var specialFood = ''
        if (filters.specail && filters.specail.length) {
            specialFood = filters.specail[0]
            isSpecialFood = true;

        }
        var pure_veg = '';
        if (filters.pure_veg) {
            pure_veg = filters.pure_veg;
            isDietary = true
            dietary = 'yes'
        }
        this.setState({ filter: filters, sort, priceRange, specialFood, pure_veg, isPriceRange, isSpecialFood, isDietary, isSort, dietary })
        this.doSpecialFoodType();

        //this.doSomething();
    }
    getDataForHomePage = () => {
        getData('user').then((user) => {
            //  console.log('USER reson id : ' + JSON.stringify(user));
            const userdata = JSON.parse(user);
            getData('selectedAirport').then((selectedAirport) => {

                const selectedAirportObject = JSON.parse(selectedAirport);
                getData('selectedTerminalId').then((selectedTerminalId) => {
                    getData('travel_type_id').then((travel_type_id) => {
                        const sort = []
                        if (this.state.sort !== '')
                            sort.push(this.state.sort)
                        const range = []
                        if (this.state.priceRange !== '')
                            range.push(this.state.priceRange)
                        const specail = []
                        if (this.state.specialFood !== '')
                            specail.push(this.state.specialFood)
                        const pure_veg = this.state.dietary
                        const homeData = {
                            "user_id": userdata.id,
                            "airport_id": selectedAirportObject.id,
                            "terminal_id": selectedTerminalId,
                            "travel_type_id": travel_type_id,
                            "device_type": Platform.OS,
                            "device_token": userdata.device_token,
                            "access_token": userdata.access_token,
                            "filter": this.props.filter

                        }
                        //       console.log("API REQUEST : " + JSON.stringify(homeData));
                        //   console.log("access_token : " + userdata.access_token)

                        getHomeData(this.props.dispatch, homeData).then((response) => {
                            if (response) {
                                //    console.log("getHomeData RESPONSE : " + JSON.stringify(response))
                                this.setState({ data: response, name: selectedAirportObject.name })
                            } else {

                            }
                        });

                    });
                });
            });

        });

    }

    doTerminalServingType() {

        getData('user').then((user) => {
            //   console.log('USER reson id : ' + JSON.stringify(user));
            const userdata = JSON.parse(user);

            //            console.log('USER id : ' + userdata.id);
            getData('accessToken').then((accessToken) => {
                let data = {
                    "user_id": userdata.id,
                    "travel_type_id": this.state.travelTypeId,
                    "access_token": accessToken,
                    "device_type": Platform.OS,
                    "device_token": "hdskjdkjheuyuriewhgewuiwyewehjewuiyew"
                }

                getTerminalServingType(this.props.dispatch, data).then((response) => {
                    if (response && response.message && response.message === 'Please provide valid access token') {
                        clearData();
                        Alert.alert("Token Expire please login again.")
                        this.props.navigation.navigate("Auth")

                        return;

                        // store.dispatch({
                        //     type: 'COUNT_CHANGE',
                        //     payload: {
                        //         count: Math.floor(Math.random() * 100) + 1
                        //     }
                        // });
                    }
                    if (response.status) {
                        console.log('getTerminalServingType: ' + JSON.stringify(response))
                        var arrData = response.servingType
                        var IndexItem = arrData[0]
                        storeData('travelTypeServiceId', IndexItem.id);

                        console.log("IndexItem.id : " + IndexItem.id)
                        this.setState({ servingtypeArr: response.servingType, selectedServingTypeId: IndexItem.id })
                        this.doSpecialFoodType();
                    }
                });
            })
        })
    }

    componentDidUpdate() {
        // this.props.hideTabBar(true)
        // this.props.disableGestures(true)
    }
    getOutletAvaibility(dateTimeForOutlet) {
        this.setState({ showLoader: true });
        getData('fcmToken').then((fcmToken) => {
            getData('user').then((user) => {
                console.log('USER reson id : ' + JSON.stringify(user));
                const userdata = JSON.parse(user);
                let outLetData = this.props.navigation.getParam('item');
                console.log('USER id : ' + userdata.id);
                getData('accessToken').then((accessToken) => {
                    let data = {
                        "user_id": userdata.id,
                        "outlet_id": this.state.outletId,
                        // "delivery_date_time": dateTimeForOutlet,
                        "delivery_date_time": "2020-04-27 11:27:00",
                        "device_id": "dkhsdjhajkhfjkhsajkh",
                        "device_type": Platform.OS,
                        "device_token": "hdskjdkjheuyuriewhgewuiwyewehjewuiyew",
                        "access_token": accessToken

                    }

                    //console.log("data to send : "+ JSON.stringify(data));
                    //return;
                    doCheckOutletAvailability(this.props.dispatch, data).then((response) => {
                        this.setState({ showLoader: false });

                        if (response && response.status) {
                            this.setState({ isAskDateTime: false, dateTimeForOutlet: '' });
                            this.props.functionWithArg("OutletMenu", this.state.indexFor, this.state.itemData);

                            //  this.goToOutletMenuScreen(this.state.indexFor, this.state.itemData);
                        } else {
                            Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                        }
                    });
                })
            })
        })
    }

    handlerSimpleCall = (index, item) => {
        //Calling a function of other class (without arguments)
        //  console.log('didselect');
        getData('dateForOutlet').then((dateForOutlet) => {
            //console.log("dateForOutlet:  "+dateForOutlet);

            if (dateForOutlet) {
                //console.log("dateForOutlet:  "+dateForOutlet);
                this.setState({ outletId: item.outlet_id, indexFor: index, itemData: item, dateTimeForOutlet: dateForOutlet });
                const a = setTimeout(() => {
                    this.getOutletAvaibility(dateForOutlet);
                }, 300);
            }
            else {
                this.setState({ isAskDateTime: true, outletId: item.outlet_id, indexFor: index, itemData: item, dateTimeForOutlet: '', selectedDate: undefined, selectedTime: undefined });
            }
        })


        //  this.props.functionWithArg("OutletMenu", index, item);
    };

    selectServingType(id) {
        storeData('travelTypeServiceId', id);
        var objToDisplay = {}
        if (this.props.data && this.props.data.homeData) {
            if (id === '1') {
                objToDisplay = this.props.data.homeData.Outside_terminal_building
            }
            else if (id === '2') {
                objToDisplay = this.props.data.homeData.Within_terminal_building
            }
            else if (id === '3') {
                objToDisplay = this.props.data.homeData.Before_Security
            }
            else if (id === '4') {
                objToDisplay = this.props.data.homeData.After_Security
            }
        }
        //  console.log(JSON.stringify(objToDisplay))
        this.setState({ selectedServingTypeId: id, objToDisplay })

    }


    clearFilter = () => {

        const filter = {
            "pure_veg": "",
            sort: [],
            range: [],
            specail: [],
        }
        this.setState({ isDietary: false, isSort: false, isSpecialFood: false, isPriceRange: false, filterType: '', filterSelected: '', dietary: '', sort: '', priceRange: '', specialFood: '', filter })
        this.doSpecialFoodType();

    }
    onCancel() {
        this.TimePicker.close();
    }

    onConfirm(hour, minute) {
        this.setState({ selectedTime: `${hour}:${minute}` });
        this.TimePicker.close();
    }
    render() {
        // console.log("Service type id  : " + this.state.selectedServingTypeId);

        // console.log("HOME DATA : " + JSON.stringify(this.state.data));
        // return (null);
        var data = {};
        (this.state.data && this.state.data.homeData) ?
            (this.state.selectedServingTypeId && this.state.selectedServingTypeId === '1') ?
                data = this.state.data.homeData.Outside_terminal_building
                :
                (this.state.selectedServingTypeId && this.state.selectedServingTypeId === '2') ?
                    data = this.state.data.homeData.Within_terminal_building
                    :
                    (this.state.selectedServingTypeId && this.state.selectedServingTypeId === '3') ?
                        data = this.state.data.homeData.Before_security :
                        (this.state.selectedServingTypeId && this.state.selectedServingTypeId === '4') ?
                            data = this.state.data.homeData.After_security
                            :
                            data = undefined

            :
            data = undefined




        //   data = undefined;
        //console.log("data  Filtered:  " + JSON.stringify(this.state.data));

        //  console.log("Issort:  " + this.state.isSort);

        return (
            <View style={{ flex: 1 }}>

                <View style={{ height: '100%', width: '100%', flex: 1, flexDirection: 'column' }}>
                    <View style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flex: .1,
                        backgroundColor: '#FFF',
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AirportList', { "from": "home" })} style={{ flex: 0.80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', marginLeft: 15 }}>
                            <Image style={styles.backButtonIcon} source={require('../../assets/images/saved-airport.png')} />
                            <CustomText font={'medium'} text={this.state.name} style={styles.titleViewText}></CustomText>
                        </TouchableOpacity>
                        <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')}>
                                <Image
                                    source={require('../../assets/images/bell.png')}
                                    style={styles.ImageStyle}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Filters', { onGoBack: (filters) => this.refresh(filters), filter: this.state.filter })}>
                                <Image
                                    source={require('../../assets/images/filter-icon.png')}
                                    style={styles.ImageStyle}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: .1, width: '100%', backgroundColor: 'white' }}>
                        <View style={{ height: 50, width: '100%', marginTop: 0, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity onPress={() => this.clearFilter()} style={styles.filterSlider}>
                                    <CustomText
                                        text={'Clear'}
                                        font={'medium'}
                                        style={{
                                            fontSize: getDimen(.040), paddingLeft: 10, paddingRight: 10,
                                        }}></CustomText>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ filterType: 'Dietary' })} style={{
                                    flexDirection: 'row',
                                    marginLeft: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    backgroundColor: this.state.isDietary ? '#F6512B' : '#F5F5F5',
                                    borderRadius: 25
                                }}>
                                    <CustomText text={'Dietary'} style={{
                                        fontSize: getDimen(.040),
                                        color: this.state.isDietary ? 'white' : 'black',
                                    }}></CustomText>
                                    <Image
                                        style={{ width: 15, height: 15, resizeMode: 'stretch', marginLeft: 10, tintColor: this.state.isDietary ? 'white' : 'black' }}
                                        source={require('../../assets/images/down-arrow.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ filterType: 'Range' })} style={{
                                    flexDirection: 'row',
                                    marginLeft: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    backgroundColor: this.state.isPriceRange ? '#F6512B' : '#F5F5F5',
                                    borderRadius: 25
                                }}>
                                    <CustomText text={'Price Range'} style={{
                                        fontSize: getDimen(.040),
                                        color: this.state.isPriceRange ? 'white' : 'black',
                                    }}></CustomText>
                                    <Image
                                        style={{ width: 15, height: 15, resizeMode: 'stretch', marginLeft: 10, tintColor: this.state.isPriceRange ? 'white' : 'black' }}
                                        source={require('../../assets/images/down-arrow.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ filterType: 'Sort' })} style={{
                                    flexDirection: 'row',
                                    marginLeft: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    backgroundColor: this.state.isSort ? '#F6512B' : '#F5F5F5',
                                    borderRadius: 25
                                }}>
                                    <CustomText text={'Sort'} style={{
                                        fontSize: getDimen(.040),
                                        color: this.state.isSort ? 'white' : 'black',
                                    }}></CustomText>
                                    <Image
                                        style={{ width: 15, height: 15, resizeMode: 'stretch', marginLeft: 10, tintColor: this.state.isSort ? 'white' : 'black' }}
                                        source={require('../../assets/images/down-arrow.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ filterType: 'Food' })} style={{
                                    flexDirection: 'row',
                                    marginLeft: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    backgroundColor: this.state.isSpecialFood ? '#F6512B' : '#F5F5F5',
                                    borderRadius: 25
                                }}>
                                    <CustomText text={'Special Food'} style={{
                                        fontSize: getDimen(.040),
                                        color: this.state.isSpecialFood ? 'white' : 'black',
                                    }}></CustomText>
                                    <Image
                                        style={{ width: 15, height: 15, resizeMode: 'stretch', marginLeft: 10, tintColor: this.state.isSpecialFood ? 'white' : 'black' }}
                                        source={require('../../assets/images/down-arrow.png')}
                                    />
                                </TouchableOpacity>

                            </ScrollView>
                        </View>
                        <View style={{ height: 1, width: '100%', backgroundColor: '#EAEAEA' }}></View>
                    </View>
                    <ScrollView style={{ flex: .8, width: '100%' }}>
                        <View>
                            <View style={{ marginBottom: 5, width: '100%', backgroundColor: 'transparent', marginLeft: getDimen(.015), flexDirection: 'row' }}>


                                {this.state.servingtypeArr.map((item, i) => {
                                    return (
                                        <View key={item.id} style={{ marginLeft: getDimen(.015), marginTop: getDimen(.015), marginRight: 10, marginBottom: 3, justifyContent: 'center' }}>
                                            <TouchableOpacity style={{ flexDirection: "row", }} onPress={() => this.selectServingType(item.id)}>
                                                {this.state.selectedServingTypeId === item.id ?
                                                    <Image
                                                        style={{ width: getDimen(.045), height: getDimen(.045), resizeMode: 'contain', alignSelf: 'center' }}
                                                        source={require('../../assets/images/radioFilled.png')}
                                                    />
                                                    :
                                                    <Image
                                                        style={{ width: getDimen(.045), height: getDimen(.045), resizeMode: 'contain', alignSelf: 'center' }}
                                                        source={require('../../assets/images/radio.png')}
                                                    />
                                                }

                                                <Text style={{ fontSize: getDimen(.035), marginLeft: getDimen(.015), color: '#323B57', alignSelf: 'center' }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        </View>

                                    );
                                }
                                )}
                            </View>
                            {(data && data.bab_offers && data.bab_offers.length > 0) ?

                                <View style={{ height: getDimen(.35), width: '100%', backgroundColor: '' }}>
                                    <Pages style={{}} indicatorColor={'red'} >
                                        {data.bab_offers.map((item, i) => {
                                            return (
                                                <View style={{ flex: 1, }} >
                                                    <TouchableOpacity
                                                        onPress={() => item.outlet_id ? this.handlerSimpleCall(i, item) : console.log("Don't have outlet id")}
                                                        style={{ width: '100%', height: '100%' }}
                                                    >
                                                        <Image
                                                            style={{ width: '100%', height: '100%' }}
                                                            source={{ uri: item.img_url }}
                                                            resizeMode="cover"

                                                        />
                                                    </TouchableOpacity>

                                                </View>

                                            );
                                        }
                                        )}
                                    </Pages>

                                </View>
                                :
                                null
                            }
                            {(data && data.user_fav && data.user_fav.length > 0) ?
                                <View style={{ height: getDimen(.50), marginTop: 10, flexDirection: 'column', marginLeft: 10 }}>

                                    <CustomText font={'medium'} text={'Your Favorites'} style={{ fontSize: getDimen(.040), marginTop: 10, flex: 0.25, }} />

                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        style={{ flex: 0.85, marginRight: 10 }}
                                        data={data.user_fav}
                                        renderItem={({ item, separators, index }) => (
                                            <TouchableWithoutFeedback onPress={() => this.handlerSimpleCall(index, item)}>

                                                <View style={{ flexDirection: "column", width: getDimen(1) / 1.75 }}>
                                                    <View style={{ flexDirection: "column", flex: 1, borderRadius: 2, borderColor: '#EAEAEA', borderWidth: 1, marginLeft: 10 }}>

                                                        <View style={{ flexDirection: "column", flex: 0.75, }}>
                                                            <View style={{ flexDirection: "column", flex: 1 }}>

                                                                <View style={{ flex: .70, alignItems: 'center', justifyContent: 'center', }}>
                                                                    <Image
                                                                        style={{ width: '95%', height: '90%', alignSelf: 'center' }}
                                                                        source={{ uri: item.image_url }}
                                                                        resizeMode="cover"

                                                                    />
                                                                </View>

                                                                <View style={{ flex: .30, flexDirection: 'column' }}>
                                                                    <CustomText font={'regular'} text={item.outlet_name} style={{ alignItems: 'flex-start', justifyContent: 'center', alignSelf: 'flex-start', fontSize: getDimen(.030), marginLeft: 10 }} />
                                                                    <CustomText font={'regular'} text={item.address} style={{ alignItems: 'flex-start', justifyContent: 'center', alignSelf: 'flex-start', fontSize: getDimen(.020), marginLeft: 10 }} />


                                                                </View>

                                                            </View>
                                                        </View>
                                                        <View style={{ height: 1, width: '100%', backgroundColor: '#EAEAEA' }}></View>

                                                        <View style={{ flexDirection: "row", flex: 0.25, }}>
                                                            <View style={{ flexDirection: "row", flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>


                                                                <View style={{ flexDirection: "row", marginLeft: 10, flex: 0.20, backgroundColor: '#48C479', alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                                                    <Image
                                                                        style={{ width: 10, height: 10, resizeMode: 'contain', alignSelf: 'center' }}
                                                                        source={require('../../assets/images/home-star.png')}
                                                                    />
                                                                    <CustomText font={'regular'} text={item.average_rating} style={{ fontSize: getDimen(.030), flex: 0.30, paddingLeft: 3, color: 'white' }} />

                                                                </View>
                                                                <View style={{ flexDirection: "row", flex: 0.10 }}>
                                                                </View>

                                                                <View style={{ flex: 0.70, flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                                                                    <Image
                                                                        style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center' }}
                                                                        source={require('../../assets/images/home-offer.png')}
                                                                    />
                                                                    <CustomText font={'regular'} text={item.offer_description} style={{ alignSelf: 'center', fontSize: getDimen(.025), paddingLeft: 2, }}></CustomText>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>
                                            </TouchableWithoutFeedback>
                                        )}
                                        keyExtractor={item => item.key}
                                    />

                                </View>

                                : null}
                            {(data && data.latest_delas.length > 0) ?
                                <View style={{ height: getDimen(.40), marginTop: 10, flexDirection: 'column', marginLeft: 10 }}>

                                    <CustomText text={' Latest Deals'} font={'medium'} style={{ fontSize: getDimen(.040), marginTop: 10, flex: 0.25, paddingLeft: 3 }}> </CustomText>

                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        style={{ flex: 0.85, paddingLeft: 10, marginTop: 10, marginRight: 10 }}
                                        data={data.latest_delas}
                                        renderItem={({ item, separators, index }) => (
                                            <TouchableWithoutFeedback onPress={() => this.props.goToOutletList(item.id)
                                            }>

                                                <View style={{

                                                    flex: 1, flexDirection: 'column',
                                                }}>
                                                    <View style={{ flex: 1, flexDirection: 'column', width: getDimen(1) / 1.75 }}>
                                                        <Image
                                                            resizeMode="cover"
                                                            source={{ uri: item.image }} style={{ alignItems: 'center', justifyContent: 'center', width: 200, height: 100, position: 'absolute' }} defaultSource={require('../../assets/images/deal-pic.png')} />

                                                        <View style={{ flex: 1, flexDirection: 'column', width: 200, height: '100%', position: 'absolute' }}>
                                                            <View style={{ flex: .65, }}></View>
                                                            <View style={{ flex: .35, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>

                                                            </View>
                                                        </View>

                                                        <View style={{ flex: 1, flexDirection: 'column', width: 200, height: '100%', position: 'absolute', backgroundColor: 'transparent', }}>
                                                            <View style={{ flex: .65, }}></View>
                                                            <View style={{ flex: .35, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                                                                <CustomText text={item.name} font={'regular'} style={{ color: 'white', alignSelf: 'center' }}></CustomText>
                                                            </View>
                                                        </View>


                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )}
                                        keyExtractor={item => item.key}
                                    />

                                </View>
                                :
                                null
                            }
                            {(data && data.dealof_theday.length > 0) ?
                                <View style={{ height: getDimen(.50), marginTop: 10, flexDirection: 'column', marginLeft: 10 }}>

                                    <CustomText font={'medium'} text={" Deal Of The Day "} style={{ fontSize: getDimen(.040), marginTop: 10, flex: 0.25, }}></CustomText>

                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        style={{ flex: 0.85, marginRight: 10 }}
                                        data={data.dealof_theday}
                                        renderItem={({ item, separators, index }) => (
                                            <TouchableWithoutFeedback onPress={() => this.handlerSimpleCall(index, item)}>

                                                <View style={{ flexDirection: "column", width: getDimen(.5) }}>
                                                    <View style={{ flexDirection: "column", flex: 1, borderRadius: 2, borderColor: '#EAEAEA', borderWidth: 1, marginLeft: 7 }}>

                                                        <View style={{ flexDirection: "column", flex: 0.75, }}>
                                                            <View style={{ flexDirection: "column", flex: 1 }}>

                                                                <View style={{ flex: .70, alignItems: 'center', justifyContent: 'center', }}>
                                                                    <Image
                                                                        style={{ width: '100%', height: '90%', alignSelf: 'center' }}
                                                                        source={{ uri: item.image_url }}
                                                                        resizeMode="cover"

                                                                    />
                                                                </View>

                                                                <View style={{ flex: .30, flexDirection: 'column' }}>
                                                                    <CustomText text={item.outlet_name} font={'regular'} style={{ alignItems: 'flex-start', justifyContent: 'center', alignSelf: 'flex-start', fontSize: getDimen(.030), marginLeft: 10 }}></CustomText>
                                                                    <CustomText text={item.cuisinies_name} font={'regular'} style={{ alignItems: 'flex-start', justifyContent: 'center', alignSelf: 'flex-start', fontSize: getDimen(.020), marginLeft: 10 }}></CustomText>
                                                                </View>

                                                            </View>
                                                        </View>
                                                        <View style={{ height: 1, width: '100%', backgroundColor: '#EAEAEA' }}></View>

                                                        <View style={{ flexDirection: "row", flex: 0.25, }}>
                                                            <View style={{ flexDirection: "row", flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>

                                                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                                                                    <Image
                                                                        style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', tintColor: 'red' }}
                                                                        source={require('../../assets/images/home-offer.png')}
                                                                    />
                                                                    <CustomText text={item.offer_description} fomt={'regular'} style={{ alignSelf: 'center', fontSize: getDimen(.025), paddingLeft: 2, color: 'red' }}></CustomText>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>
                                            </TouchableWithoutFeedback>
                                        )}
                                        keyExtractor={item => item.key}
                                    />

                                </View>
                                : null}
                            {(data && data.outlet_list && data.outlet_list.length > 0) ?
                                <View style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                                    <CustomText font={'medium'} text={' Outlets '} style={{ fontSize: getDimen(.040), marginTop: 20, paddingLeft: 3 }}></CustomText>
                                    <FlatList
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        style={{ paddingLeft: 10, marginTop: 10 }}
                                        data={data.outlet_list}
                                        renderItem={({ item, separators, index }) => (
                                            <TouchableWithoutFeedback onPress={() => this.handlerSimpleCall(index, item)}>

                                                <View style={{ height: getDimen(.28) }}>
                                                    <View style={{ flex: 1, flexDirection: "row", marginLeft: 0, marginRight: 15, marginTop: 10, marginBottom: 10 }}>
                                                        <View style={{ flex: .35, flexDirection: "row", }}>
                                                            <Image
                                                                source={{ uri: item.img_url }}
                                                                resizeMode="cover"
                                                                style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1, height: '100%', width: '100%' }} />
                                                        </View>

                                                        <View style={{ flex: .65, flexDirection: "column", backgroundColor: 'white' }}>

                                                            <View style={{ flexDirection: 'column', flex: 0.85 }}>
                                                                <CustomText text={item.outlet_name} font={'regular'} style={{ fontSize: getDimen(.030), paddingLeft: 10, }}></CustomText>
                                                                <CustomText numberOfLines={2} text={item.cuisinies_name} font={'regular'} style={{ fontSize: getDimen(.025), paddingLeft: 10, marginTop: 5 }}></CustomText>

                                                                {item.offer_description ?
                                                                    <View style={{ flexDirection: "row", paddingLeft: 10, marginTop: 5, marginBottom: 2 }}>
                                                                        <Image
                                                                            style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center' }}
                                                                            source={require('../../assets/images/home-offer.png')}
                                                                        />
                                                                        <CustomText font={'regular'} text={item.offer_description ? item.offer_description : "N/A"} style={{ alignSelf: 'center', fontSize: getDimen(.020), paddingLeft: 2 }}></CustomText>
                                                                    </View>

                                                                    : null}
                                                                {/* {item.average_rating ?

                                                                    <View style={{ height: 1, width: '90%', backgroundColor: '#EAEAEA', marginTop: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}></View>
                                                                    : null} */}
                                                            </View>
                                                            <View>
                                                                <View style={{ height: 1, width: '90%', backgroundColor: '#EAEAEA', marginTop: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}></View>

                                                            </View>
                                                            {item.average_rating ?
                                                                <View style={{ flexDirection: 'row', marginLeft: 5, flex: 0.15, }}>
                                                                    <Image
                                                                        style={{ width: 10, height: 10, marginTop: 2, resizeMode: 'contain', marginLeft: 5 }}
                                                                        source={require('../../assets/images/blue-star.png')}
                                                                    />
                                                                    <CustomText text={item.average_rating} style={{ fontSize: getDimen(.025), marginLeft: 5, }}></CustomText>
                                                                    <CustomText text={this.getRatingText(item.average_cost_per_person)} style={{ fontSize: getDimen(.025), marginLeft: 50 }}></CustomText>


                                                                </View>
                                                                // <View style={{ flexDirection: "row", paddingLeft: 10, alignItems: 'center', backgroundColor: 'gray' }}>
                                                                //     <Image
                                                                //         style={{ width: 10, height: 10, resizeMode: 'contain', alignSelf: 'center' }}
                                                                //         source={require('../../assets/images/blue-star.png')}
                                                                //     />
                                                                //     <CustomText text={item.average_rating} style={{ fontSize: getDimen(.025), marginLeft: 3, flex: .3, alignSelf: 'center' }}></CustomText>
                                                                //     <CustomText text={'₹₹₹₹'} style={{ fontSize: getDimen(.025), flex: .3 }}></CustomText>
                                                                // </View>
                                                                : null}



                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )}
                                        keyExtractor={item => item.key}
                                    />

                                </View>


                                : null}
                        </View>

                    </ScrollView>


                </View>

                {(data && data.outlet_list && data.outlet_list.length > 0) ?

                    <View style={{ position: 'absolute', width: 50, height: 50, borderRadius: 35, backgroundColor: '#F6512B', bottom: 10, right: 10 }}>
                        <TouchableOpacity
                            style={{ width: 50, height: 50, justifyContent: 'center' }}
                            onPress={() => this.props.navigation.navigate("Offers")}>
                            <Image source={require('../../assets/images/offer.png')} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: 'white', alignSelf: 'center' }} />
                            <CustomText text={'Offers'} style={{ color: 'white', fontSize: 9, alignSelf: "center" }}></CustomText>
                        </TouchableOpacity>
                    </View> : null}

                {(this.state.filterType === 'Dietary') ?
                    <Modal isVisible={true}>
                        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%', position: 'absolute' }}>
                            <TouchableOpacity style={{ flex: .75, }} onPress={() => this.setState({ filterType: '' })}></TouchableOpacity>
                            <View style={{ flex: .25, backgroundColor: 'white', borderRadius: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25, marginRight: 10, marginTop: 10, marginBottom: 10, }}>
                                    <CustomText font={'medium'} text={'Dietary'} style={{ flex: 1, color: 'black', fontSize: getDimen(.055), marginTop: 10, }}></CustomText>
                                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', }} onPress={() => this.dietarySelected()}>
                                        <Image source={require('../../assets/images/veg-icon.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'contain' }} />
                                        <CustomText text={'Pure Veg'} style={{ flex: 0.80, color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}></CustomText>
                                        <View style={{ flex: 0.10 }}></View>
                                        {this.state.dietary === '' ? null : <Image source={require('../../assets/images/tick.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'cover', marginRight: 5 }} />}
                                        {/* <Image source={require('../../assets/images/tick.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'cover', marginRight: 5 }} /> */}
                                    </TouchableOpacity>
                                    <View style={{ flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.signup}
                                            onPress={() => this.dietarySelection()}>
                                            <CustomText font={'medium'} text={"Apply"} style={styles.signupText}> </CustomText>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </Modal>
                    // <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', }}>
                    //     <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: 'black', opacity: 0.5 }}></View>

                    // </View>
                    :
                    null
                }




                {/* Second Filter */}
                {(this.state.filterType === 'Range') ?
                    <Modal isVisible={true}>
                        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%', position: 'absolute', backgroundColor: 'transparent', }}>
                            <TouchableOpacity style={{ flex: .70, }} onPress={() => this.setState({ filterType: '' })}></TouchableOpacity>
                            <View style={{ flex: .30, backgroundColor: 'white', borderRadius: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10, marginRight: 10, marginTop: 1, marginBottom: 1, }}>
                                    <CustomText font={'medium'} text={'Price Range'} style={{ flex: 0.2, color: 'black', fontSize: getDimen(.05), marginTop: 5, }}></CustomText>
                                    <View style={{ flex: 0.5, flexDirection: 'row', }}>
                                        <TouchableOpacity onPress={() => this.priceRangeSelected('1')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(1), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(1), marginLeft: 10, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <CustomText text={'₹'} style={{ color: this.getTextColor(1), fontSize: getDimen(.055), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}></CustomText>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.priceRangeSelected('2')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(2), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(2), marginLeft: 15, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <CustomText text={'₹₹'} style={{ color: this.getTextColor(2), fontSize: getDimen(.055), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}></CustomText>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.priceRangeSelected('3')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(3), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(3), marginLeft: 15, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <CustomText text={'₹₹₹'} style={{ color: this.getTextColor(3), fontSize: getDimen(.055), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}></CustomText>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.priceRangeSelected('4')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(4), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(4), marginLeft: 15, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <CustomText text={'₹₹₹₹'} style={{ color: this.getTextColor(4), fontSize: getDimen(.055), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}></CustomText>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ flex: 0.3, height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginBottom: 10 }}>
                                        <TouchableOpacity
                                            style={styles.signup}
                                            onPress={() => this.rangeSelection()}>
                                            <CustomText font={'medium'} text={'Apply'} style={styles.signupText}>Apply</CustomText>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </Modal>
                    // <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', }}>

                    //     <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: 'black', opacity: 0.5 }}></View>


                    // </View>
                    :
                    null
                }


                {/* Third Filter */}
                {(this.state.filterType === 'Sort') ?
                    <Modal isVisible={true}>
                        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%', position: 'absolute', backgroundColor: 'transparent', }}>
                            <TouchableOpacity style={{ flex: .70, }} onPress={() => this.setState({ filterType: '' })}></TouchableOpacity>
                            <View style={{ flex: .30, backgroundColor: 'white', borderRadius: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25, marginRight: 10, marginTop: 10, marginBottom: 10, }}>
                                    <CustomText font={'medium'} text={'Sort'} style={{ flex: 1, color: 'black', fontSize: getDimen(.055), marginTop: 10, }}></CustomText>
                                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', }} onPress={() => this.sortSelected('most')}>
                                        <Image source={require('../../assets/images/order.png')} style={{ flex: 0.10, width: '100%', height: '50%' }} />
                                        <CustomText text={'Most Popular'} style={{ flex: 0.80, color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}></CustomText>
                                        <View style={{ flex: 0.10 }}>
                                            {(this.state.filter && this.state.filter.sort && this.state.filter.sort[0] === 'most') ? <Image source={require('../../assets/images/tick.png')} style={{ width: '70%', height: '70%', resizeMode: 'cover', marginRight: 5 }} /> : null}

                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', }} onPress={() => this.sortSelected('rating')}>
                                        <Image source={require('../../assets/images/rating.png')} style={{ resizeMode: 'contain', flex: 0.10, width: '100%', height: '50%' }} />
                                        <CustomText text={'Rating'} style={{ flex: 0.80, color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}></CustomText>
                                        <View style={{ flex: 0.10 }}>
                                            {(this.state.filter && this.state.filter.sort && this.state.filter.sort[0] === 'rating') ? <Image source={require('../../assets/images/tick.png')} style={{ width: '70%', height: '70%', resizeMode: 'cover', marginRight: 5 }} /> : null}

                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.signup}
                                            onPress={() => this.sortSelection()}>
                                            <CustomText font={'medium'} text={'Apply'} style={styles.signupText}> </CustomText>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </Modal>
                    // <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', }}>

                    //     <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: 'black', opacity: 0.5 }}></View>

                    // </View>
                    :
                    null
                }

                {/* Fourth Filter */}
                {(this.state.filterType === 'Food') ?
                    <Modal isVisible={true}>
                        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%', position: 'absolute', }}>
                            <TouchableOpacity style={{ flex: .62, }} onPress={() => this.setState({ filterType: '' })}></TouchableOpacity>
                            <View style={{ flex: .38, backgroundColor: 'white', borderRadius: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25, marginRight: 10, marginTop: 10, marginBottom: 10, }}>
                                    <CustomText font={'medium'} text={'Special Food'} style={{ flex: 1, color: 'black', fontSize: getDimen(.055), marginTop: 10, }}></CustomText>

                                    {this.state.specialFoodArr.map((item, i) => {
                                        return (
                                            <View key={item.id} style={{ flexDirection: "row", flex: 1, }}>
                                                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', }} onPress={() => this.specialFoodSelected(item.id)}>

                                                    <Image
                                                        source={{ uri: item.image_url }}
                                                        // source={require('../../assets/images/order.png')}
                                                        style={{ flex: 0.10, width: '100%', height: '70%', resizeMode: 'contain' }} />
                                                    <CustomText text={item.special_food_name} style={{ flex: 0.80, color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}></CustomText>
                                                    <View style={{ flex: 0.10 }}></View>
                                                    {this.state.specialFood == item.id ? <Image source={require('../../assets/images/tick.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'cover', marginRight: 5 }} /> : null}

                                                    {/* <Image source={require('../../assets/images/tick.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'contain', marginRight: 5 }} /> */}
                                                </TouchableOpacity>
                                            </View>

                                        );
                                    }
                                    )}

                                    <View style={{ flex: .5, height: '100%', width: '50%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.signup}
                                            onPress={() => this.foodSelection()}>
                                            <Text style={styles.signupText}>Apply</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </Modal>
                    // <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', }}>

                    //     {/* {(this.state.selectedType === 'key1') ? <Text>a</Text> : <Text>b</Text>} */}
                    //     {/* <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: 'black', opacity: 0.5 }}></View> */}

                    // </View>
                    :
                    null
                }

                {this.state.isAskDateTime ?

                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: 'transparent' }}>
                        <TouchableOpacity style={{ width: '100%', height: '40%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: 'white', borderColor: 'gray', borderWidth: 2 }}></TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%', position: 'absolute', backgroundColor: 'transparent', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', }} 
                          // onPress={() => this.disableDateTimePopup()}
                            ></TouchableOpacity>
                            <View style={{ width: '90%', height: '30%', backgroundColor: 'white', borderRadius: 10, flexDirection: 'column', }}>
                                <View style={{ flex: 0.20, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderRadius: 8, }}>
                                    <Text style={{ color: '#30445F', fontSize: getDimen(.045), marginLeft: 10, flex: 0.85 }}>Pickup Date/Time</Text>
                                    <TouchableOpacity style={{ flex: 0.15, width: getDimen(.060), height: getDimen(.060), marginRight: 5, alignSelf: 'center' }} onPress={() => this.disableDateTimePopup()}>
                                        <Image source={require('../../assets/images/close.png')} style={{ width: getDimen(.060), height: getDimen(.060), resizeMode: 'contain', alignSelf: 'flex-end' }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 1, width: '100%', backgroundColor: '#8A8A8A', marginTop: 5 }}></View>
                                <View style={{ flex: 0.90, justifyContent: 'flex-end' }}>
                                    <View style={styles.inputContainer}>


                                        <DatePicker
                                            style={{ flex: 0.80 }}
                                            date={this.state.selectedDate}
                                            mode="date"
                                            // value={this.state.date}
                                            placeholder="Select pickup Date"
                                            format="DD-MM-YYYY"
                                            // minDate="2016-05-01"
                                            minDate={new Date()}
                                            confirmBtnText="Confirm"
                                            is24Hour={true}
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 4,
                                                    marginLeft: 0,
                                                    height: 0,
                                                    width: 0,
                                                    // tintColor: 'red'
                                                },
                                                dateInput: {
                                                    marginLeft: 15,
                                                    borderWidth: 0,
                                                    alignItems: 'flex-start',
                                                    color: '#8A8A8A'
                                                },
                                                placeholderText: {
                                                    color: '#8A8A8A'
                                                },
                                                // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={(date) => { this.dateChangedEvent("date", date) }}
                                        />




                                        <Image
                                            source={require('../../assets/images/date-birth.png')}
                                            style={styles.ImageStyle2}
                                        />
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => {
                                        //              console.log("Minutes : " + new Date().getMinutes())
                                        this.TimePicker.open()
                                    }}>
                                        <View style={{
                                            marginBottom: 5,
                                            borderWidth: 1,
                                            marginLeft: 5,
                                            marginRight: 5,
                                            paddingBottom: 0,
                                            borderBottomColor: '#CCC',
                                            borderColor: 'transparent',
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ flex: .80, color: '#8A8A8A', paddingLeft: 17 }}>{this.state.selectedTime ? this.state.selectedTime : "Please select time"}</Text>

                                            {/*  <DatePicker
                                            style={{ flex: 0.80 }}
                                            date={this.state.selectedTime}
                                            mode="time"
                                            // value={this.state.date}
                                            placeholder="Select pickup Time"
                                            format="HH:ss"
                                            // minDate="2016-05-01"
                                            minDate={new Date()}
                                            confirmBtnText="Confirm"
                                            is24Hour={true}
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 4,
                                                    marginLeft: 0,
                                                    height: 0,
                                                    width: 0,
                                                    // tintColor: 'red'
                                                },
                                                dateInput: {
                                                    marginLeft: 15,
                                                    borderWidth: 0,
                                                    alignItems: 'flex-start',
                                                    color: '#8A8A8A'
                                                },
                                                placeholderText: {
                                                    color: '#8A8A8A'
                                                },
                                                // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={(date) => { this.dateChangedEvent("time", date) }}
                                        /> */}
                                            <TimePicker
                                                style={{ flex: 0.80 }}
                                                //hourUnit={'hr'}
                                                //  minuteUnit={'min'}
                                                selectedHour={"" + new Date().getHours()}
                                                selectedMinute={"" + new Date().getMinutes()}

                                                ref={ref => {
                                                    this.TimePicker = ref;
                                                }}
                                                onCancel={() => this.onCancel()}
                                                onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                                            />


                                            <Image
                                                source={require('../../assets/images/date-birth.png')}
                                                style={styles.ImageStyle2}
                                            />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <View style={{ flex: 0.40, borderRadius: 8 }}>
                                    <View style={{ flex: 0.4 }}></View>
                                    <View style={{ flex: 0.6, flexDirection: 'row', borderRadius: 8 }}>
                                        <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this.disableDateTimePopup()}>
                                            <Text style={{ color: '#30445F', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', fontSize: getDimen(.050) }}>Cancel</Text>
                                        </TouchableOpacity>
                                        <View style={{ height: '60%', width: 1, backgroundColor: '#8A8A8A' }}></View>
                                        <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this.submitAction()}>
                                            <Text style={{ color: '#F6512B', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', fontSize: getDimen(.050) }}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }

                {
                    (this.state.showLoader) ?
                        <View
                            style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%' }}
                        >
                            {/* <ActivityIndicator size="large" color="tomato" style={{ position: 'absolute' }} /> */}
                            <ActivityIndicator size="large" color="#2b5f9c" style={{ position: 'absolute', rotation: 180 }} />
                        </View>
                        :
                        null
                }

            </View>
        );
    }

    getRatingText = (average_rating) => {
        if (average_rating === 5)
            return '₹₹₹₹₹'
        else if (average_rating >= 4 && average_rating < 5)
            return '₹₹₹₹'
        else if (average_rating >= 3 && average_rating < 4)
            return '₹₹₹'
        else if (average_rating >= 2 && average_rating < 3)
            return '₹₹'
        else if (average_rating >= 1 && average_rating < 2)
            return '₹'
        else if (average_rating >= 0 && average_rating < 1)
            return '₹'
    }
    dateChangedEvent = (type, date) => {
        if (type === 'date') {
            this.setState({ selectedDate: date })
            if (this.state.selectedTime && this.state.selectedTime.length > 0) {
                storeData('dateForOutlet', date + ' ' + this.state.selectedTime);
                this.setState({ dateTimeForOutlet: date + ' ' + this.state.selectedTime });
            }
        } else {
            this.setState({ selectedTime: date })
            if (this.state.selectedDate && this.state.selectedDate.length > 0) {
                storeData('dateForOutlet', this.state.selectedDate + ' ' + date);
                this.setState({ dateTimeForOutlet: this.state.selectedDate + ' ' + date });
            }
        }
    }
    submitAction() {
        if (this.state.dateTimeForOutlet.trim() === '') {
            this.setState({ error: 'Please Select Date/Time..' })
            Alert.alert('', 'Please Select Date/Time..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return;
        }
        //     console.log("checking availablity")
        this.getOutletAvaibility(this.state.dateTimeForOutlet);
    }
    getTintColor = (pos) => {
        if (this.props.selected === pos) {
            return '#F6512B';

        } else {
            return '#48455B';

        }

    }
}

let styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
    }, ImageStyle2: {
        height: getDimen(.065),
        width: getDimen(.065),
        resizeMode: 'contain',
        marginRight: 5,
        flex: 0.20
    },
    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        paddingBottom: 0,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row'
    },
    headerIconView: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: .08,
        backgroundColor: '#FFF',
    },
    headerBackButtonView: {
        alignSelf: 'center',
        width: 25,
        height: 25,
        position: 'absolute',
        left: 15,
    },
    backButtonIcon: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
    },
    titleViewText: {
        alignSelf: 'center',
        fontSize: getDimen(.035),
        color: '#000000',
        marginLeft: 15,
        marginRight: 10,
        // position: 'absolute',
    },
    ImageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: 5,
        tintColor: '#30445F'

    },
    filterSlider: {
        flexDirection: 'row',
        marginLeft: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 25
    },
    filterText: {
        fontSize: getDimen(.040)
    },
    signup: {
        borderRadius: 10,
        backgroundColor: '#F6512B',
        height: 45,
        width: Dimensions.get('window').width * .8,
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center',
    },
    signupText: {
        color: '#FFF',
        fontSize: getDimen(.050),
    },

})

export default connect()(HomeScreen)
