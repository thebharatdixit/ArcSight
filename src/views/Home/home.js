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
    Platform
} from 'react-native';
import { Container, Button, Picker, Icon, Tab, Tabs, ScrollableTab, Form, ListItem, Label, Item, Input, Content, Card, CardItem, Header, Footer, FooterTab, Left, Right, Body, Title } from 'native-base';
import { getDimen } from '../../dimensions/dimen';
import { setCurrentTab } from '../../actions/tabSelection';
import { bindActionCreators } from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { Pages } from 'react-native-pages';
import HomeScreen from './homeScreen';
import Offers from '../Offers/offers';
import Order from '../Order/orderBase';
import Profile from '../Profile/profile';
import Search from '../Search/search';
import OutletScreen from './outletScreen';
import { getData, storeData } from '../../utils/asyncStore';
import { getSpecialFoodType, getHomeData } from '../../actions/homeAction';
import { getFCMToken } from '../fcmTokenClass';
import SplashScreen from 'react-native-splash-screen';
//checking for commit

class Home extends Component {
    state = {
        arrFavourite: [],
        stickyHeaderIndices: [1, 2, 3, 4, 5, 6],
        selectedType: 'key1',
        filterType: '',
        filterSelected: '',
        selectedType: 'key0',
        specialFoodArr: [],
        dietary: '',
        sort: '',
        priceRange: '',
        specialFood: '',
        data: {},
        sortFilter: [],
        rangeFilter: [],
        specailFilter: [],
        filter: {
            "pure_veg": "",
            sort: [],
            range: [],
            specail: [],
        }

    }

    componentDidMount() {
        //startAuthentication()
        SplashScreen.hide();
        this.props.dispatch(this.props.setCurrentTab(0))
        getFCMToken().then((token) => {

            //  console.log('final fcmtoken is: ' + token);


        });
        this.doSpecialFoodType();
    }

    async doSpecialFoodType() {

        // this.setState({
        //     travelTypeId: this.state.selectedType
        // });
        getData('user').then((user) => {
            //  console.log('USER reson id : ' + JSON.stringify(user));
            const userdata = JSON.parse(user);

            //   console.log('USER id : ' + userdata.id);
            getData('accessToken').then((accessToken) => {
                let data = {
                    "user_id": userdata.id,
                    "access_token": accessToken,
                    "device_type": Platform.OS,
                    "device_token": "hdskjdkjheuyuriewhgewuiwyewehjewuiyew"
                }

                getSpecialFoodType(this.props.dispatch, data).then((response) => {
                    if (response) {
                        //   console.log(JSON.stringify(response))
                        this.setState({ specialFoodArr: response.specialFoodType })
                    } else {

                    }
                });
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
                                "filter": {
                                    "pure_veg": pure_veg,
                                    "sort": sort,
                                    "range": range,
                                    "specail": specail

                                }

                            }
                            //      console.log("API REQUEST : " + JSON.stringify(homeData));


                        });

                    });
                });
            });
        })
    }

    componentDidUpdate() {
        // this.props.hideTabBar(true)
        // this.props.disableGestures(true)
    }

    dietarySelection() {
        this.setState({ filterType: '', filterSelected: 'selected' });

    }

    rangeSelection() {
        this.setState({ filterType: '', filterSelected: 'selected' });
        this.doSpecialFoodType();
    }

    sortSelection() {
        this.setState({ filterType: '', filterSelected: 'selected' });
        this.doSpecialFoodType();

    }

    foodSelection() {
        this.setState({ filterType: '', filterSelected: 'selected' });
        this.doSpecialFoodType();

    }

    functionWithoutArg = (className) => {
        //function to be called from default class (without args)
        this.props.navigation.navigate(className);
    };

    functionWithArg = (className, index, item) => {
        //function to be called from default class (without args)
        console.log(className)
        this.props.navigation.navigate(className, { 'index': index, 'item': item });
    };

    pastOrderFunction = (className, data) => {

    };


    rateAndFeedbackClicked = (className, data) => {
        this.props.navigation.navigate(className);
    };

    goTologinPage = () => {
        console.log('callback is coming');
        this.props.navigation.navigate('Auth');
    }

    goToOutletList = (id) => {
        console.log("outlet list sending  : " + id);
        this.props.navigation.navigate('OutletList', { 'cuisineId': id, from: 'home' });
    }

    dietarySelected() {
        if (this.state.dietary === 'yes') {
            this.setState({ dietary: '' });
        }
        else {
            this.setState({ dietary: '' });
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
        console.log("sort : " + JSON.stringify(sort))
        console.log("Modified sort : " + JSON.stringify({ ...this.state.filter, sort }))

        this.setState({ filter: { ...this.state.filter, sort } })
        //  return { ...this.state, filter: { ...this.state.filter, sort } }

        //this.setState(new Object.assign(this.state, filter))
        // const sortArray = []
        // sortArray.push(value)
    }

    priceRangeSelected(value) {
        // if (this.state.priceRange === value) {
        //     this.setState({ priceRange: '' });
        // }
        // else {
        //     this.setState({ priceRange: value });
        // }
        this.setState({ priceRange: value })
    }

    specialFoodSelected(value) {
        if (this.state.specialFood === value) {
            this.setState({ specialFood: '' });
        }
        else {
            this.setState({ specialFood: value });
        }
    }

    getBackgroundColor = (pos) => {
        console.log('pR: ' + this.state.priceRange + ', pos :' + pos);
        if (this.state.priceRange == pos) {
            console.log('insert');
            return '#F6512B';


        } else {
            console.log('outside');
            return 'white';

        }

    }

    getBorderWidth = (pos) => {
        console.log('pR: ' + this.state.priceRange + ', pos :' + pos);
        if (this.state.priceRange == pos) {
            console.log('insert');
            return 0;


        } else {
            console.log('outside');
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

    render() {
        console.log('price range: ' + this.state.priceRange);
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                        <View style={{ height: '100%', width: '100%' }}>



                            {(this.props.selected === 1) ?
                                <View style={styles.headerIconView}>


                                    <TouchableOpacity style={{ flex: 0.80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', marginLeft: 10 }}>
                                        {/* <Image style={styles.backButtonIcon} source={require('../../assets/images/back.png')} /> */}
                                        <Text style={styles.titleViewText2}>Top Categories</Text>
                                    </TouchableOpacity>
                                    <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                                        <TouchableOpacity>
                                            <Image
                                                source={require('../../assets/images/bell.png')}
                                                style={styles.ImageStyle}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Filters')}>
                                            <Image
                                                source={require('../../assets/images/filter-icon.png')}
                                                style={styles.ImageStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                null
                            }

                            {(this.props.selected === 2) ?
                                <View style={styles.headerIconView}>


                                    <TouchableOpacity style={{ flex: 0.80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', marginLeft: 10 }}>
                                        {/* <Image style={styles.backButtonIcon} source={require('../../assets/images/back.png')} /> */}
                                        <Text style={styles.titleViewText2}>Offers</Text>
                                    </TouchableOpacity>
                                    <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                                        <TouchableOpacity>
                                            <Image
                                                source={require('../../assets/images/bell.png')}
                                                style={styles.ImageStyle}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Filters')}>
                                            <Image
                                                source={require('../../assets/images/filter-icon.png')}
                                                style={styles.ImageStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                null
                            }

                            {(this.props.selected === 3) ?
                                <View style={styles.headerIconView}>


                                    <TouchableOpacity style={{ flex: 0.80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', marginLeft: 10 }}>
                                        {/* <Image style={styles.backButtonIcon} source={require('../../assets/images/back.png')} /> */}
                                        <Text style={styles.titleViewText2}>Order</Text>
                                    </TouchableOpacity>
                                    <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                                        <TouchableOpacity>
                                            <Image
                                                source={require('../../assets/images/bell.png')}
                                                style={styles.ImageStyle}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                :
                                null
                            }

                            {(this.props.selected === 4) ?
                                <View style={styles.headerIconView}>


                                    <TouchableOpacity style={{ flex: 0.80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', marginLeft: 10 }}>
                                        {/* <Image style={styles.backButtonIcon} source={require('../../assets/images/back.png')} /> */}
                                        <Text style={styles.titleViewText2}>Profile</Text>
                                    </TouchableOpacity>
                                    <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                                        <TouchableOpacity>
                                            <Image
                                                source={require('../../assets/images/bell.png')}
                                                style={styles.ImageStyle}
                                            />
                                        </TouchableOpacity>


                                    </View>
                                </View>
                                :
                                null
                            }

                            <View style={{ height: 1, width: '100%', backgroundColor: '#EAEAEA' }}></View>


                            <View style={{ flex: 1.0 }}>

                                {(this.props.selected === undefined || this.props.selected === 0) && <HomeScreen goToOutletList={this.goToOutletList} navigation={this.props.navigation} filter={this.state.filter} data={this.state.data} functionWithArg={this.functionWithArg} />}

                                {/* {this.props.selected === 1 && <Search goToOutletList={this.goToOutletList} />}
                                {this.props.selected === 2 && <Offers />}
                                {this.props.selected === 3 && <Order pastOrderFunction={this.pastOrderFunction} rateAndFeedbackClicked={this.rateAndFeedbackClicked} />}
                                {this.props.selected === 4 && <Profile
                                    functionWithoutArg={this.functionWithoutArg} goTologinPage={this.goTologinPage}
                                />} */}


                            </View>

                            {/* <Footer style={{ width: '100%', flex: .12 }}>
                                <FooterTab style={{ backgroundColor: 'white' }}>
                                    <Button vertical onPress={() => this.selectMode(0)}>
                                        <Image source={require('../../assets/images/home.png')} style={{ tintColor: this.getTintColor(0), width: Dimensions.get('window').height * 0.045, height: Dimensions.get('window').height * 0.045 }} />
                                        <Text style={{ fontSize: 12, color: this.getTintColor(0) }}>Home</Text>
                                    </Button>
                                    <Button vertical onPress={() => this.selectMode(1)}>
                                        <Image source={require('../../assets/images/search.png')} style={{ tintColor: this.getTintColor(1), width: Dimensions.get('window').height * 0.045, height: Dimensions.get('window').height * 0.045 }} />
                                        <Text style={{ fontSize: 12, color: this.getTintColor(1) }}>Search</Text>
                                    </Button>
                                    <Button vertical onPress={() => this.selectMode(2)}>
                                        <Image source={require('../../assets/images/offer.png')} style={{ tintColor: this.getTintColor(2), width: Dimensions.get('window').height * 0.045, height: Dimensions.get('window').height * 0.045 }} />
                                        <Text style={{ fontSize: 12, color: this.getTintColor(2) }}>Offer</Text>
                                    </Button>
                                    <Button vertical onPress={() => this.selectMode(3)}>
                                        <Image source={require('../../assets/images/order.png')} style={{ tintColor: this.getTintColor(3), width: Dimensions.get('window').height * 0.072, height: Dimensions.get('window').height * 0.045 }} />
                                        <Text style={{ fontSize: 12, color: this.getTintColor(3) }}>Order</Text>
                                    </Button>
                                    <Button vertical onPress={() => this.selectMode(4)}>
                                        <Image source={require('../../assets/images/profile.png')} style={{ tintColor: this.getTintColor(4), width: Dimensions.get('window').height * 0.045, height: Dimensions.get('window').height * 0.045 }} />
                                        <Text style={{ fontSize: 12, color: this.getTintColor(4) }}>Profile</Text>
                                    </Button>
                                </FooterTab>
                            </Footer> */}
                        </View>

                    </KeyboardAvoidingView>
                </SafeAreaView>

                {/* First Filter */}
                {(this.state.filterType === 'Dietary') ?
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: '' }}>
                        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: 'black', opacity: 0.5 }}></View>
                        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%', position: 'absolute', backgroundColor: 'transparent', }}>
                            <TouchableOpacity style={{ flex: .75, }} onPress={() => this.setState({ filterType: '' })}></TouchableOpacity>
                            <View style={{ flex: .25, backgroundColor: 'white', borderRadius: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25, marginRight: 10, marginTop: 10, marginBottom: 10, }}>
                                    <Text style={{ flex: 1, color: 'black', fontSize: getDimen(.055), marginTop: 10, }}>Dietary</Text>
                                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', }} onPress={() => this.dietarySelected()}>
                                        <Image source={require('../../assets/images/veg-icon.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'contain' }} />
                                        <Text style={{ flex: 0.80, color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}>Pure Veg</Text>
                                        <View style={{ flex: 0.10 }}></View>
                                        {this.state.dietary === '' ? null : <Image source={require('../../assets/images/tick.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'cover', marginRight: 5 }} />}
                                        {/* <Image source={require('../../assets/images/tick.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'cover', marginRight: 5 }} /> */}
                                    </TouchableOpacity>
                                    <View style={{ flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.signup}
                                            onPress={() => this.dietarySelection()}>
                                            <Text style={styles.signupText}>Apply </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }




                {/* Second Filter */}
                {(this.state.filterType === 'Range') ?
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: '' }}>

                        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: 'black', opacity: 0.5 }}></View>
                        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%', position: 'absolute', backgroundColor: 'transparent', }}>
                            <TouchableOpacity style={{ flex: .70, }} onPress={() => this.setState({ filterType: '' })}></TouchableOpacity>
                            <View style={{ flex: .30, backgroundColor: 'white', borderRadius: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25, marginRight: 10, marginTop: 1, marginBottom: 1, }}>
                                    <Text style={{ flex: 0.15, color: 'black', fontSize: getDimen(.055), marginTop: 10, }}>Price Range</Text>
                                    <View style={{ flex: 0.55, flexDirection: 'row', }}>
                                        <TouchableOpacity onPress={() => this.priceRangeSelected('1')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(1), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(1), marginLeft: 10, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: this.getTextColor(1), fontSize: getDimen(.055), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>₹</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.priceRangeSelected('2')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(2), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(2), marginLeft: 15, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: this.getTextColor(2), fontSize: getDimen(.055), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>₹₹</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.priceRangeSelected('3')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(3), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(3), marginLeft: 15, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: this.getTextColor(3), fontSize: getDimen(.055), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>₹₹₹</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.priceRangeSelected('4')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(4), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(4), marginLeft: 15, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: this.getTextColor(4), fontSize: getDimen(.055), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>₹₹₹₹</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ flex: 0.3, height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginBottom: 10 }}>
                                        <TouchableOpacity
                                            style={styles.signup}
                                            onPress={() => this.rangeSelection()}>
                                            <Text style={styles.signupText}>Apply </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>

                    </View>
                    :
                    null
                }


                {/* Third Filter */}
                {(this.state.filterType === 'Sort') ?
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: '' }}>

                        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: 'black', opacity: 0.5 }}></View>
                        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%', position: 'absolute', backgroundColor: 'transparent', }}>
                            <TouchableOpacity style={{ flex: .70, }} onPress={() => this.setState({ filterType: '' })}></TouchableOpacity>
                            <View style={{ flex: .30, backgroundColor: 'white', borderRadius: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25, marginRight: 10, marginTop: 10, marginBottom: 10, }}>
                                    <Text style={{ flex: 1, color: 'black', fontSize: getDimen(.055), marginTop: 10, }}>Sort</Text>
                                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', }} onPress={() => this.sortSelected('most')}>
                                        <Image source={require('../../assets/images/order.png')} style={{ flex: 0.10, width: '100%', height: '50%' }} />
                                        <Text style={{ flex: 0.80, color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}>Most Popular</Text>
                                        <View style={{ flex: 0.10 }}></View>
                                        {this.state.sort === 'most' ? <Image source={require('../../assets/images/tick.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'cover', marginRight: 5 }} /> : null}
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', }} onPress={() => this.sortSelected('rating')}>
                                        <Image source={require('../../assets/images/star2.png')} style={{ flex: 0.10, width: '100%', height: '50%' }} />
                                        <Text style={{ flex: 0.80, color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}>Rating</Text>
                                        <View style={{ flex: 0.10 }}></View>
                                        {this.state.sort === 'rating' ? <Image source={require('../../assets/images/tick.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'cover', marginRight: 5 }} /> : null}
                                    </TouchableOpacity>
                                    <View style={{ flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.signup}
                                            onPress={() => this.sortSelection()}>
                                            <Text style={styles.signupText}>Apply </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }

                {/* Fourth Filter */}
                {(this.state.filterType === 'Food') ?
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: '' }}>

                        {(this.state.selectedType === 'key1') ? <Text>a</Text> : <Text>b</Text>}
                        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, position: 'absolute', backgroundColor: 'black', opacity: 0.5 }}></View>
                        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%', position: 'absolute', backgroundColor: 'transparent', }}>
                            <TouchableOpacity style={{ flex: .62, }} onPress={() => this.setState({ filterType: '' })}></TouchableOpacity>
                            <View style={{ flex: .38, backgroundColor: 'white', borderRadius: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25, marginRight: 10, marginTop: 10, marginBottom: 10, }}>
                                    <Text style={{ flex: 1, color: 'black', fontSize: getDimen(.055), marginTop: 10, }}>Special Food</Text>

                                    {this.state.specialFoodArr.map((item, i) => {
                                        return (
                                            <View key={item.id} style={{ flexDirection: "row", flex: 1, }}>
                                                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', }} onPress={() => this.specialFoodSelected(item.id)}>
                                                    <Image source={require('../../assets/images/order.png')} style={{ flex: 0.10, width: '100%', height: '50%' }} />
                                                    <Text style={{ flex: 0.80, color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}>{item.special_food_name}</Text>
                                                    <View style={{ flex: 0.10 }}></View>
                                                    {this.state.specialFood == item.id ? <Image source={require('../../assets/images/tick.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'cover', marginRight: 5 }} /> : null}

                                                    {/* <Image source={require('../../assets/images/tick.png')} style={{ flex: 0.10, width: '100%', height: '50%', resizeMode: 'contain', marginRight: 5 }} /> */}
                                                </TouchableOpacity>
                                            </View>

                                        );
                                    }
                                    )}

                                    <View style={{ flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.signup}
                                            onPress={() => this.foodSelection()}>
                                            <Text style={styles.signupText}>Apply </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }

            </View>
        );
    }

    getTintColor = (pos) => {
        if (this.props.selected === pos) {
            return '#F6512B';

        } else {
            return '#48455B';

        }

    }

    selectMode = (pos) => {
        console.log('POSITION SELECTED :', pos)
        this.setState({ filterType: '', filterSelected: '' });
        if (pos === 0) {
            // store.dispatch({
            //     type: 'CELL_CLICKED',
            //     payload: {
            //         cell: "",
            //     }
            // });
        } else if (pos === 1) {
            // store.dispatch({
            //     type: 'SUBJECTCELL_CLICKED',
            //     payload: {
            //         subjectCell: "",
            //     }
            // });
        } else if (pos === 2) {
            // store.dispatch({
            //     type: 'SUBJECTCELL_CLICKED',
            //     payload: {
            //         subjectCell: "",
            //     }
            // });
        } else if (pos === 3) {
            // store.dispatch({
            //     type: 'SEND_TO_DETAILS',
            //     payload: {
            //         position: 0, item: undefined
            //     }
            // });
        }
        else if (pos === 4) {
            // store.dispatch({
            //     type: 'SEND_TO_DETAILS',
            //     payload: {
            //         position: 0, item: undefined
            //     }
            // });
        }


        this.props.dispatch(this.props.setCurrentTab(pos))
    }
}

let styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
    },
    headerIconView: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: .1,
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
        fontSize: getDimen(.042),
        color: '#000000',
        marginLeft: 15,
        marginRight: 10,
        // position: 'absolute',
        // left: 50,
    },
    titleViewText2: {
        alignSelf: 'center',
        fontSize: getDimen(.055),
        color: '#000000',
        marginLeft: 15,
        marginRight: 10,
        // position: 'absolute',
        // left: 50,
    },
    ImageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: 5,
        marginRight: 5
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
        height: 50,
        width: Dimensions.get('window').width * .9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupText: {
        color: '#FFF',
        fontSize: getDimen(.050),
    },

})

function mapStateToProps(state) {
    return {
        selected: state.home.selected,
        // icon: state.home.icon,
        // headerName: state.home.headerName

    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            setCurrentTab,
        },
            dispatch
        ),
    };
}

// export default connect()(Home)
export default connect(mapStateToProps, mapDispatchToProps)(Home);
