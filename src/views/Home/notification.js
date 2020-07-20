
import React, { Component } from 'react';

import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    FlatList,
    TextInput,
    TouchableOpacity,
    Keyboard, Dimensions, TouchableHighlight, ActivityIndicator,
    Platform, Alert, ImageBackground, SafeAreaView,
} from 'react-native';
// import { push_feed } from '../../actions/'
// import { getEventslist, sendToDetails } from '../../views/feedActions/eventsAction'
import { getNotificationList } from '../../actions/notificationAction'

import { getData } from '../../utils/asyncStore';
import CustomText from '../../common/CustomText';


class Notification extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            showSpinner: false,
            fontLoaded: false,
            feedId: '',
            data: [],
            noticeBoardDataList: []

        }
    }
    showNoticeBoardDetails(data) {
        // this.props.dispatch(push_feed({ key: 'Notice Board Details' }))
    }
    dateFormatMonth = dateToFormat => dateToFormat ? moment(dateToFormat).format("DD") : "";
    dateFormatMonthOfWeek = dateToFormat => dateToFormat ? moment(dateToFormat).format("MMM") : "";
    dateFormatDayOfWeek = dateToFormat => dateToFormat ? moment(dateToFormat).format("ddd") : "";
    timeFormat = dateToFormat => dateToFormat ? moment(dateToFormat).format("HH:mm:ss") : "";
    formatted = dateToFormat => dateToFormat ? moment(dateToFormat, "HH:mm:ss").format("hh:mm A") : '';
    dateFormatMonthYear = dateToFormat => dateToFormat ? moment(dateToFormat).format("MMM YYYY") : "";



    loadNotificationList = async () => {
        getData('user').then((user) => {
            console.log('USER reson id : ' + JSON.stringify(user));
            const userdata = JSON.parse(user);

            console.log('USER id : ' + userdata.id);
            getData('accessToken').then((accessToken) => {
                let data = {
                    "user_id": userdata.id,
                    "device_type": Platform.OS,
                    "device_token": "hdskjdkjheuyuriewhgewuiwyewehjewuiyew",
                    "access_token": accessToken
                }
                getNotificationList(this.props.dispatch, data).then((response) => {
                    this.setState({ showLoader: false });

                    if (response && response.status) {
                        console.log('noticeBoardDataList  :  ' + JSON.stringify(response))
                        this.setState({ noticeBoardDataList: response.notificationList })
                    } else {
                        Alert.alert('', response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                    }
                });
            })
        })



    }
    async componentDidMount() {

        const { navigation } = this.props;

        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ showLoader: true });
            this.loadNotificationList();
        });


    }

    renderItem = ({ item }) => (
        //console.log('Item:'+item)
        <CustomTextRow
            item={item}
            dateFormatMonth={this.dateFormatMonth}
            dateFormatDayOfWeek={this.dateFormatDayOfWeek}
            dateFormatMonthOfWeek={this.dateFormatMonthOfWeek}
            dateFormatMonthYear={this.dateFormatMonthYear}
            timeFormat={this.formatted}
            dispatch={this.props.dispatch}
            // push_feed={push_feed}
            // sendToDetails={this.props.sendToDetails}
            navigation={this.props.navigation}
        />
    );

    render() {

        return (
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.headerIconView}>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: 0.70, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', marginLeft: 15 }}>
                        <Image style={styles.backButtonIcon} source={require('../../assets/images/back.png')} />
                        <CustomText font={'medium'} text={'Notifications'} style={styles.titleViewText}></CustomText>
                    </TouchableOpacity>
                    <View style={{ flex: 0.30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginLeft: 10 }}>
                        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat')} style={{ marginLeft: 10 }}>
                            <Image
                                source={require('../../images/query.png')}
                                style={styles.ImageStyle}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image
                                source={require('../../images/users.png')}
                                style={styles.ImageStyle}
                            />
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={{ height: 1, width: '100%', backgroundColor: '#EAEAEA' }}></View>

                <FlatList
                    style={{ backgroundColor: '#EEEEEE' }}
                    data={this.state.noticeBoardDataList}
                    keyExtractor={(item, index) => {
                        return "" + index;
                    }}
                    renderItem={this.renderItem}
                    onEndReached={this.loadLikedUser}
                    onEndThreshold={0.5}

                />
                {
                    (this.state.showLoader) ?
                        <View
                            style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%' }}
                        >
                            <ActivityIndicator size="large" color="tomato" style={{ position: 'absolute' }} />
                            <ActivityIndicator size="small" color="#2b5f9c" style={{ position: 'absolute', rotation: 180 }} />
                        </View>
                        :
                        null
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginBottom: 0,
        backgroundColor: 'white',
        // ...Platform.select({
        //     ios: {
        //         marginTop: 20,
        //     },
        //     android: {
        //         marginTop: 24,
        //     },
        // }),
    },
    photo: {
        height: 60,
        width: 60,
        borderRadius: 10,
    },

    container: {
        flex: 1,
        flexDirection: 'row',

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
    ImageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: 10
    },
    backButtonIcon: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
    },
    titleViewText: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#000000',
        marginLeft: 10,
        marginRight: 10,
        // position: 'absolute',
        // left: 50,
    },
    title: {
        flex: 1,
        fontSize: 12,
        color: 'black',
        marginLeft: 10, marginRight: 10
    }, date: {
        flex: 1,
        fontSize: 12,
        color: 'gray',
    },
    name: {
        flex: 1,
        fontSize: 16,
        color: '#2b5f9c',
        fontWeight: "bold",
        marginTop: 5
    },
    lineSeperator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 10
    },
});
class CustomTextRow extends Component {

    showNoticeBoardDetails = (data) => {
        console.log('NoticeBoardDetail data :', data)

        // this.props.dispatch(this.props.sendToDetails(data));
        // this.props.dispatch(this.props.push_feed({ key: 'Comments', postId: this.props.FeedId }));

        // this.props.navigation.navigate('EventDetails');
        this.props.navigation.navigate('EventDetails');
    }

    render() {
        console.log('noticeBoardDatalist:', this.props.item)

        return (
            <View style={{ flex: 1, }}
            >
                <View style={{ flex: 1, marginTop: 0, marginBottom: 5, }}>
                    <View style={{ flex: 1, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 5, backgroundColor: 'white', width: '93%' }}>
                        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center', }}>
                            <View style={{ flex: 0.2, height: 60, width: 60, backgroundColor: '#F5F5F5', borderRadius: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10, marginBottom: 10, marginRight: 10 }}>
                                <ImageBackground source={require('../../assets/images/notice-board-blank.png')} style={{ width: 30, height: 30, alignSelf: 'center', marginRight: 5 }}>
                                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                        <CustomText text={this.props.dateFormatMonth(this.props.item.created_at)} style={{ color: 'white' }}></CustomText>
                                    </View>
                                </ImageBackground>
                                <CustomText text={this.props.dateFormatMonthYear(this.props.item.created_at)} style={{ fontSize: 10, alignSelf: 'center' }}> </CustomText>
                            </View>
                            <View style={{ flex: 0.8, marginTop: 10, marginBottom: 10, alignSelf: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <CustomText style={{ flex: 1, fontSize: 16, color: '#2b5f9c', fontWeight: "bold", justifyContent: 'center', alignItems: 'center' }}></CustomText>
                                <CustomText text={this.props.item.title} style={{ flex: 1, fontSize: 16, color: '#2b5f9c', fontWeight: "bold", justifyContent: 'center', alignItems: 'center' }}> </CustomText>
                                <CustomText text={this.props.item.description} style={{ flex: 1, color: 'gray', fontSize: 14, justifyContent: 'center', alignItems: 'center', }}> </CustomText>
                                <CustomText style={{ flex: 1, fontSize: 16, color: '#2b5f9c', fontWeight: "bold", justifyContent: 'center', alignItems: 'center' }}></CustomText>
                            </View>
                        </View>
                        {!(this.props.item.image === '') ?
                            // <Image source={{ uri: this.props.url }} style={{ width: '93%', height: 150, borderRadius: 0, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom:10 }} defaultSource={require('../../images/male.png')} />
                            // <Image source={{ uri: this.props.item.image }} style={{ width: '93%', height: 150, borderRadius: 5, alignSelf: 'center', marginBottom: 10, }} defaultSource={require('../../images/loading1.png')} />
                            null
                            :
                            null
                        }
                    </View>
                </View>

            </View>

        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            // sendToDetails,

        },
            dispatch
        ),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Notification);

//export default Events;