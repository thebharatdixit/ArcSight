
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

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


class BottomTabView extends Component {
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




    componentDidMount() {
       // console.log("routeName : " + this.props.routeName);

     //   console.log("this.props.focused : " + JSON.stringify(this.props.focused));
      //  console.log("this.props.routeName : " + JSON.stringify(this.props.routeName));


    }



    render() {

        this.props.focused ?
            this.props.routeName === 'Home Screen' ? <Image source={require('../assets/images/home.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#F6512B' }} />
                : this.props.routeName === 'Search' ?
                    <Image source={require('../assets/images/search.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#F6512B' }} /> :
                    this.props.routeName === 'Cart' ?
                        <Image source={require('../assets/images/cart.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#F6512B' }} /> :
                        this.props.routeName === 'My Orders' ?
                            <Image source={require('../assets/images/order.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#F6512B' }} /> :
                            this.props.routeName === 'Profile' ?
                                <Image source={require('../assets/images/profile.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#F6512B' }} /> :
                                null
            :
            this.props.routeName === 'Home Screen' ?
                <Image source={require('../assets/images/home.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'black' }} /> :
                this.props.routeName === 'Search' ?
                    <Image source={require('../assets/images/search.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'black' }} /> :
                    this.props.routeName === 'Cart' ?
                        <Image source={require('../assets/images/cart.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'black' }} /> :
                        this.props.routeName === 'My Orders' ?
                            <Image source={require('../assets/images/order.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'black' }} /> :
                            this.props.routeName === 'Profile' ?
                                <Image source={require('../assets/images/profile.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'black' }} /> :
                                null



    }
}


function mapStateToProps(state) {
    return {
        badge: state.navigation.badge,

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


export default connect(mapStateToProps, mapDispatchToProps)(BottomTabView);

//export default Events;