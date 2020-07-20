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
} from 'react-native';
import { Container, Button, Picker, Icon, Tab, Tabs, ScrollableTab, Form, ListItem, Label, Item, Input, Content, Card, CardItem, Header, Footer, FooterTab, Left, Right, Body, Title } from 'native-base';
import { getDimen } from '../../dimensions/dimen';
import { setCurrentTab } from '../../actions/tabSelection';
import { bindActionCreators } from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { Pages } from 'react-native-pages';

const TableData = [{ title: 'Burger King', key: 'item1', Detail: 'American, Fast Food', image: 'https://projects.klientotech.com:9002/staging72/bookabite_new/assets/images/app-images/1.png' }, { title: 'KFC', key: 'item2', Detail: 'Burger Fast Food', image: 'https://projects.klientotech.com:9002/staging72/bookabite_new/assets/images/app-images/4.png' }, { title: 'Haldiram', key: 'item3', Detail: 'North Indian Fast Food', image: 'https://projects.klientotech.com:9002/staging72/bookabite_new/assets/images/app-images/3.png' }, { title: 'Mcdonald', key: 'item4', Detail: 'American, Fast Food', image: 'https://projects.klientotech.com:9002/staging72/bookabite_new/assets/images/app-images/2.png' }, { title: 'Sagar Ratna', key: 'item5', Detail: 'American, Fast Food', image: 'https://projects.klientotech.com:9002/staging72/bookabite_new/assets/images/app-images/outlets1.png' }, { title: 'Burger King', key: 'item6', Detail: 'American, Fast Food', image: 'https://projects.klientotech.com:9002/staging72/bookabite_new/assets/images/app-images/outlets2.png' }];
import CustomText from '../../common/CustomText';

// const TableData = [{ title: 'Burger King', key: 'item1', Detail: 'American, Fast Food' }, { title: 'KFC', key: 'item2', Detail: 'Burger Fast Food' }, { title: 'Haldiram', key: 'item3', Detail: 'North Indian Fast Food' }, { title: 'Mcdonald', key: 'item4', Detail: 'American, Fast Food' }, { title: 'Sagar Ratna', key: 'item5', Detail: 'American, Fast Food' }, { title: 'Burger King', key: 'item6', Detail: 'American, Fast Food' }];

class HomeScreen extends Component {
    state = {
        arrFavourite: [],
        stickyHeaderIndices: [1, 2, 3, 4, 5, 6],
        selectedType: 'key1',

    }

    componentDidMount() {
        //startAuthentication()
    }

    componentDidUpdate() {
        // this.props.hideTabBar(true)
        // this.props.disableGestures(true)
    }

    handlerSimpleCall = (index, item) => {
        //Calling a function of other class (without arguments)
        console.log('didselect');
        this.props.functionWithArg("OutletMenu", index, item);
    };


    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                        <View style={{ height: '100%', width: '100%' }}>


                            <View style={{ height: getDimen(.50), marginTop: 10, flexDirection: 'column', marginLeft: 10 }}>

                                <CustomText  font={'medium'} text={' Deal Of The Day '} style={{ fontSize: getDimen(.040), marginTop: 10, flex: 0.25, }}></CustomText>

                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={{ flex: 0.85 }}
                                    data={[{ title: 'Title Text', key: 'item1', image: 'https://projects.klientotech.com:9002/staging72/bookabite_new/assets/images/app-images/DealOfTheDay1.png' }, { title: 'Title Text2', key: 'item2', image: 'https://projects.klientotech.com:9002/staging72/bookabite_new/assets/images/app-images/DealOfTheDay2.png' }, { title: 'Title Text3', key: 'item3', image: 'https://projects.klientotech.com:9002/staging72/bookabite_new/assets/images/app-images/deal-pic1.png' }]}
                                    renderItem={({ item, separators, index }) => (
                                        <TouchableWithoutFeedback onPress={() => console.log('')}>

                                            <View style={{ flexDirection: "column" }}>
                                                <View style={{ flexDirection: "column", flex: 1, borderRadius: 2, borderColor: '#EAEAEA', borderWidth: 1, marginLeft: 10 }}>

                                                    <View style={{ flexDirection: "column", flex: 0.75, }}>
                                                        <View style={{ flexDirection: "column", flex: 1 }}>

                                                            <View style={{ flex: .70, alignItems: 'center', justifyContent: 'center', }}>
                                                                <Image
                                                                    style={{ width: '95%', height: '90%', resizeMode: 'stretch', alignSelf: 'center' }}
                                                                    source={{ uri: item.image }}
                                                                />
                                                            </View>

                                                            <View style={{ flex: .30, flexDirection: 'column' }}>
                                                                <CustomText text={'Akira Back'} style={{ alignItems: 'flex-start', justifyContent: 'center', alignSelf: 'flex-start', fontSize: getDimen(.030), marginLeft: 10 }}></CustomText>
                                                                <CustomText text={'Sushi, Tuna Pizza, Sashimi, Cheesecake, Rolls...'} style={{ alignItems: 'flex-start', justifyContent: 'center', alignSelf: 'flex-start', fontSize: getDimen(.020), marginLeft: 10 }}></CustomText>
                                                            </View>

                                                        </View>
                                                    </View>
                                                    <View style={{ height: 1, width: '100%', backgroundColor: '#EAEAEA' }}></View>

                                                    <View style={{ flexDirection: "row", flex: 0.25, }}>
                                                        <View style={{ flexDirection: "row", flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>

                                                            {/* <View style={{ flexDirection: "row", flex: 0.15 }}>
                            </View>
                            <View style={{ flexDirection: "row", flex: 0.20, backgroundColor: '#48C479', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                <Image
                                    style={{ width: 10, height: 10, resizeMode: 'contain', alignSelf: 'center' }}
                                    source={require('../../assets/images/home-star.png')}
                                />
                                <Text style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', fontSize: getDimen(.030), flex: 0.30, paddingLeft: 3, paddingTop: 3, paddingBottom: 5, color: 'white' }}>4.3</Text>
                            </View> */}


                                                            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                                                                {/* <Image
                                                                    style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', tintColor: 'red' }}
                                                                    source={require('../../assets/images/home-offer.png')}
                                                                /> */}
                                                                <Text style={{ alignSelf: 'center', fontSize: getDimen(.025), paddingLeft: 2, color: 'red' }}>20% off on all orders</Text>
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

                            <View style={{ marginTop: 0, marginLeft: 20 }}>

                                <Text style={{ fontSize: getDimen(.055), marginTop: 10, paddingLeft: 3 }}> Outlets </Text>

                                <FlatList
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                    style={{ paddingLeft: 10, marginTop: 5 }}
                                    data={TableData}
                                    renderItem={({ item, separators, index }) => (
                                        <TouchableWithoutFeedback onPress={() => this.handlerSimpleCall(index, item)}>

                                            <View style={{ height: getDimen(.28) }}>
                                                <View style={{ flex: 1, flexDirection: "row", marginLeft: 0, marginRight: 15, marginTop: 10, marginBottom: 10 }}>
                                                    <View style={{ flex: .35, flexDirection: "row", }}>
                                                        <Image
                                                            source={{ uri: item.image }}
                                                            style={{ resizeMode: 'cover', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1, height: '100%', width: '100%' }} />
                                                    </View>

                                                    <View style={{ flex: .65, flexDirection: "column", backgroundColor: 'white' }}>


                                                        <Text style={{ fontSize: getDimen(.035), paddingLeft: 10, }}>{item.title}</Text>
                                                        <Text style={{ fontSize: getDimen(.025), paddingLeft: 10, marginTop: 5 }}>{item.Detail}</Text>
                                                        <View style={{ flexDirection: "row", paddingLeft: 10, marginTop: 5 }}>
                                                            {/* <Image
                                                                style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center' }}
                                                                source={require('../../assets/images/home-offer.png')}
                                                            /> */}
                                                            <Text style={{ alignSelf: 'center', fontSize: getDimen(.025), paddingLeft: 2 }}>20% off on all orders</Text>
                                                        </View>
                                                        <View style={{ height: 1, width: '90%', backgroundColor: '#EAEAEA', marginTop: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}></View>
                                                        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                                                            <Image
                                                                style={{ width: 10, height: 10, resizeMode: 'contain', alignSelf: 'center' }}
                                                                source={require('../../assets/images/blue-star.png')}
                                                            />
                                                            <Text style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', fontSize: getDimen(.030), flex: 0.30, paddingLeft: 3, paddingTop: 3, paddingBottom: 5, }}>4.3</Text>
                                                            <Text style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', fontSize: getDimen(.030) }}>₹₹₹₹</Text>
                                                        </View>


                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )}
                                    keyExtractor={item => item.key}
                                />

                            </View>


                            {/* </ScrollView> */}
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

export default connect()(HomeScreen)
