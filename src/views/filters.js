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
    Alert
} from 'react-native';
import { Container, Button, Picker, Icon, Tab, Tabs, ScrollableTab, Form, ListItem, Label, Item, Input, Content, Card, CardItem, Header, Footer, FooterTab, Left, Right, Body, Title } from 'native-base';
import { getDimen } from './../dimensions/dimen';
import { SearchBar } from 'react-native-elements';
import { getData } from './../utils/asyncStore';
import CustomText from '../common/CustomText';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { Pages } from 'react-native-pages';

import { getCuisineList } from './../actions/searchAction';


class Filters extends Component {
    state = {
        arrFavourite: [],
        stickyHeaderIndices: [1, 2, 3, 4, 5, 6],
        selectedType: 'key1',
        search: '',
        CuisinesArr: [],
        errorMessage: '',
        dietary: '',
        sort: '',
        priceRange: '',
        specialFood: '',
        currencyName: '',
        filter: {}

    }

    dietarySelection = () => {
        var sort = [];
        if (this.state.sort)
            sort.push(this.state.sort)
        var range = [];
        if (this.state.priceRange)
            range.push(this.state.priceRange)
        var pure_veg = '';
        if (this.state.dietary)
            pure_veg = this.state.dietary;
        var specail = [];
        if (this.state.specialFood)
            specail.push(this.state.specialFood)
        const filter = { sort, pure_veg, range, specail }
        this.props.navigation.state.params.onGoBack(filter);
        this.props.navigation.goBack();
    }

    componentDidMount() {
        //startAuthentication()
        // this.getCuisineCategories();
        let filters = this.props.navigation.state.params.filter;
        let currencName = this.props.navigation.getParam('currencyName');
        this.setState({ currencyName: currencName });
        //    console.log("this.props.filter : " + JSON.stringify(filters))
        if (filters) {
            var sort = '';
            (filters.sort && filters.sort.length) ? sort = filters.sort[0] : null;
            var priceRange = '';
            (filters.range && filters.range.length) ? priceRange = filters.range[0] : null;
            var specialFood = '';
            (filters.specail && filters.specail.length) ? specialFood = filters.specail[0] : null;
            var dietary = '';
            filters.pure_veg ? dietary = filters.pure_veg : null;
            this.setState({ filter: filters, sort, priceRange, specialFood, dietary })
        }
    }

    componentDidUpdate() {
        // this.props.hideTabBar(true)
        // this.props.disableGestures(true)
    }

    getCuisineCategories() {
        getData('user').then((user) => {
            //      console.log('USER reson id : ' + JSON.stringify(user));
            const userdata = JSON.parse(user);

            //    console.log('USER id : ' + userdata.id);
            getData('selectedAirport').then((selectedAirport) => {
                const dict = JSON.parse(selectedAirport);
                //     console.log('resultant data: ' + dict);
                var airportId = dict.id
                getData('selectedTerminalId').then((terminalId) => {
                    getData('selectedType').then((travelType) => {
                        getData('accessToken').then((accessToken) => {
                            let data = {
                                // "user_id": "1",
                                "airport_id": "1",
                                "terminal_id": "6",
                                "travel_type_id": "1",
                                "travel_type_service_id": "1",
                                "user_id": userdata.id,
                                // "airport_id": airportId,
                                // "terminal_id": terminalId,
                                // "travel_type_id": travelType,
                                // "travel_type_service_id": "1",
                                "access_token": accessToken,
                                "device_type": Platform.OS,
                                "device_token": "hdskjdkjheuyuriewhgewuiwyewehjewuiyew"
                            }

                            getCuisineList(this.props.dispatch, data).then((response) => {
                                if (response.status) {
                                    //                    console.log(JSON.stringify(response))
                                    this.setState({ CuisinesArr: response.cuisinesList, errorMessage: 'No error found' })
                                }
                                else {
                                    this.setState({ errorMessage: response.message })
                                    Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                                }
                            });
                        })
                    })
                })
            })
        })
    }

    updateSearch = search => {
        this.setState({ search });
    };


    goToOutletListScreen(id) {
        this.props.goToOutletList(id);
    }

    dietarySelected() {
        if (this.state.dietary === 'yes') {
            this.setState({ dietary: '' });
        }
        else {
            this.setState({ dietary: 'yes' });
        }

    }

    sortSelected(value) {
        if (this.state.sort === value) {
            this.setState({ sort: '' });
        }
        else {
            this.setState({ sort: value });
        }
    }

    priceRangeSelected(value) {
        if (this.state.priceRange === value) {
            this.setState({ priceRange: '' });
        }
        else {
            this.setState({ priceRange: value });
        }

    }

    getTextColor = (pos) => {
        if (this.state.priceRange == pos) {
            return 'white';

        } else {
            return 'black';

        }

    }

    getBackgroundColor = (pos) => {
        //   console.log('pR: ' + this.state.priceRange + ', pos :' + pos);
        if (this.state.priceRange && this.state.priceRange == pos) {
            //  console.log('insert');
            return '#F6512B';


        } else {
            //    console.log('outside');
            return 'white';

        }

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

    specialFoodSelected(value) {
        if (this.state.specialFood === value) {
            this.setState({ specialFood: '' });
        }
        else {
            this.setState({ specialFood: value });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                        <View style={{ height: '100%', width: '100%' }}>

                            <View style={styles.headerIconView}>

                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: 0.80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', marginLeft: 15 }}>
                                    <Image style={styles.backButtonIcon} source={require('./../assets/images/back.png')} />
                                    <Text style={styles.titleViewText}>Sort and Filter</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>

                                </View>
                            </View>
                            <View style={{ height: 1, width: '100%', backgroundColor: '#EAEAEA' }}></View>
                            <ScrollView >

                                <View style={{ marginTop: 0, marginLeft: 10 }}>

                                    <View style={{ height: getDimen(.2), width: '100%', flexDirection: 'column', marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10, }}>
                                        <View><Text style={{ color: 'black', fontSize: getDimen(.055), marginTop: 10, }}>Dietary</Text></View>
                                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: getDimen(.040) }} onPress={() => this.dietarySelected()}>
                                            {this.state.dietary === '' ?
                                                <Image source={require('./../assets/images/55.png')} style={{ flex: 0.10, width: getDimen(.050), height: getDimen(.050), resizeMode: 'contain', marginLeft: -5 }} />

                                                :
                                                <Image source={require('./../assets/images/5_5.png')} style={{ flex: 0.10, width: getDimen(.050), height: getDimen(.050), resizeMode: 'contain', marginLeft: -5 }} />
                                            }
                                            <Text style={{ flex: 0.80, color: '#30445F', fontSize: getDimen(.040), marginLeft: 5 }}>Pure Veg</Text>
                                            <View style={{ flex: 0.10 }}></View>
                                        </TouchableOpacity>


                                    </View>

                                </View>


                                <View style={{ marginTop: getDimen(.015), marginLeft: 10 }}>

                                    <View style={{ height: getDimen(.2), width: '100%', flexDirection: 'column', marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10, }}>
                                        <View><Text style={{ color: 'black', fontSize: getDimen(.055), marginTop: 10, }}>Sort</Text></View>

                                        <View style={{ flexDirection: 'row', marginTop: getDimen(.040) }}>
                                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.sortSelected('most')}>
                                                {this.state.sort === 'most' ?
                                                    <Image source={require('./../assets/images/check.png')} style={{ width: getDimen(.060), height: getDimen(.060), resizeMode: 'contain' }} />
                                                    :
                                                    <Image source={require('./../assets/images/uncheck.png')} style={{ width: getDimen(.060), height: getDimen(.060), resizeMode: 'contain' }} />
                                                }
                                                <Text style={{ color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}>Most Popular</Text>
                                                <View></View>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: getDimen(.060) }} onPress={() => this.sortSelected('rating')}>
                                                {this.state.sort === 'rating' ?
                                                    <Image source={require('./../assets/images/check.png')} style={{ width: getDimen(.060), height: getDimen(.060), resizeMode: 'contain' }} />
                                                    :
                                                    <Image source={require('./../assets/images/uncheck.png')} style={{ width: getDimen(.060), height: getDimen(.060), resizeMode: 'contain' }} />
                                                }
                                                <Text style={{ color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}>Rating</Text>
                                                <View></View>
                                            </TouchableOpacity>
                                        </View>


                                    </View>

                                </View>


                                <View style={{ marginTop: getDimen(.015), marginLeft: 10 }}>

                                    <View style={{ height: getDimen(.4), flexDirection: 'column', marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10, }}>
                                        <View><Text style={{ color: 'black', fontSize: getDimen(.055), marginTop: 10, }}>Price Range</Text></View>

                                        <View style={{ flexDirection: 'row', flex: 1, marginTop: getDimen(.040) }}>

                                            <TouchableOpacity onPress={() => this.priceRangeSelected('1')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(1), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(1), marginLeft: 10, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                                {/* <CustomText text={this.state.currencyName} style={{ color: this.getTextColor(1), fontSize: getDimen(.040), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}></CustomText> */}
                                                <Text style={{ color: this.getTextColor(1), fontSize: getDimen(.040), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>{this.state.currencyName}</Text>

                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => this.priceRangeSelected('2')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(2), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(2), marginLeft: 15, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                                {/* <CustomText text={this.state.currencyName + '' + this.state.currencyName} style={{ color: this.getTextColor(2), fontSize: getDimen(.040), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}></CustomText> */}
                                                <Text style={{ color: this.getTextColor(2), fontSize: getDimen(.040), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>{this.state.currencyName + '' + this.state.currencyName}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => this.priceRangeSelected('3')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(3), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(3), marginLeft: 15, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                                {/* <CustomText text={this.state.currencyName + '' + this.state.currencyName + '' + this.state.currencyName} style={{ color: this.getTextColor(3), fontSize: getDimen(.040), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}></CustomText> */}
                                                <Text style={{ color: this.getTextColor(3), fontSize: getDimen(.040), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>{this.state.currencyName + '' + this.state.currencyName + '' + this.state.currencyName}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => this.priceRangeSelected('4')} style={{ width: getDimen(.18), height: getDimen(.18), borderWidth: this.getBorderWidth(4), borderColor: '#D3D3D3', borderRadius: getDimen(.18) / 2, backgroundColor: this.getBackgroundColor(4), marginLeft: 15, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                                {/* <CustomText text={this.state.currencyName + '' + this.state.currencyName + '' + this.state.currencyName + '' + this.state.currencyName} style={{ color: this.getTextColor(4), fontSize: getDimen(.040), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}></CustomText> */}
                                                <Text style={{ color: this.getTextColor(4), fontSize: getDimen(.040), justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>{this.state.currencyName + '' + this.state.currencyName + '' + this.state.currencyName + '' + this.state.currencyName}</Text>
                                            </TouchableOpacity>


                                        </View>


                                    </View>

                                </View>


                                <View style={{ marginLeft: 10 }}>

                                    <View style={{ height: getDimen(.4), width: '100%', flexDirection: 'column', marginLeft: 10, marginRight: 10, marginTop: 1, marginBottom: 10, }}>
                                        <View><Text style={{ color: 'black', fontSize: getDimen(.055), marginTop: 10, }}>Special Food</Text></View>

                                        <View style={{ flexDirection: 'row', marginTop: getDimen(.040) }}>
                                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.specialFoodSelected('1')}>
                                                {this.state.specialFood === '1' ?
                                                    <Image source={require('./../assets/images/check.png')} style={{ width: getDimen(.060), height: getDimen(.060), resizeMode: 'contain' }} />
                                                    :
                                                    <Image source={require('./../assets/images/uncheck.png')} style={{ width: getDimen(.060), height: getDimen(.060), resizeMode: 'contain' }} />
                                                }
                                                <Text style={{ color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}>Diabetic Food</Text>
                                                <View></View>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: getDimen(.060) }} onPress={() => this.specialFoodSelected('2')}>
                                                {this.state.specialFood === '2' ?
                                                    <Image source={require('./../assets/images/check.png')} style={{ width: getDimen(.060), height: getDimen(.060), resizeMode: 'contain' }} />
                                                    :
                                                    <Image source={require('./../assets/images/uncheck.png')} style={{ width: getDimen(.060), height: getDimen(.060), resizeMode: 'contain' }} />
                                                }
                                                <Text style={{ color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}>Keto Diet</Text>
                                                <View></View>
                                            </TouchableOpacity>


                                        </View>

                                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: getDimen(.040) }} onPress={() => this.specialFoodSelected('3')}>
                                            {this.state.specialFood === '3' ?
                                                <Image source={require('./../assets/images/check.png')} style={{ width: getDimen(.060), height: getDimen(.060), resizeMode: 'contain' }} />
                                                :
                                                <Image source={require('./../assets/images/uncheck.png')} style={{ width: getDimen(.060), height: getDimen(.060), resizeMode: 'contain' }} />
                                            }
                                            <Text style={{ color: '#30445F', fontSize: getDimen(.040), marginLeft: 10 }}>Baby Food</Text>
                                            <View></View>
                                        </TouchableOpacity>


                                    </View>
                                    <View style={{ marginBottom: 20, flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.signup}
                                            onPress={() => this.dietarySelection()}>
                                            <Text style={styles.signupText}>Apply </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>



                            </ScrollView>




                        </View>

                    </KeyboardAvoidingView>
                </SafeAreaView>


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
        height: 50,
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
    ImageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: 5
    },
    filterSlider: {
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

export default connect()(Filters)
