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
    ToastAndroid,
    FlatList,
    TouchableWithoutFeedback,
    Share,
    Alert
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { getDimen } from '../../../dimensions/dimen';

function SearchListScreen({ navigation }) {
    const onShare = async () => {

        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
        //console.log('hello');
    }
    const dummyData = [
        // mainSt: '1234 Main St',
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ];

    const [ArrData, setArr] = React.useState(dummyData);
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <ScrollView style={styles.container}>
                <FlatList
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 0, }}
                    data={dummyData}
                    renderItem={({ item, separators, index }) => (
                        <TouchableWithoutFeedback 
                        onPress={() => navigation.navigate('Search List Detail')}
                            // onPress={() => Alert.alert('Search List Detail')}
                        >
                        <View>
                            <View style={{ borderRadius: 0, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 20 }}>

                                <View style={{ backgroundColor: '#F2F2F2', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.55), marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                    <View style={{ flex: 0.6, height: '100%' }}>
                                        <View style={{ flex: 0.9, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#E6E6E6' }}>
                                            <Image
                                                source={require('../../../assets/icons/19.png')}
                                                style={{ resizeMode: 'contain', height: getDimen(.09), width: getDimen(.09) }}
                                            />
                                        </View>

                                        <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'orange' }}>
                                            <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35' }}>
                                                <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>FOR SALE</Text>
                                            </View>
                                            <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e' }}>
                                                <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>$000,00</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ flex: 1, height: '100%', }}>
                                        <View style={{ flex: 0.15, marginLeft: getDimen(0.05), marginTop: getDimen(0.05) }}>
                                            <Text style={{ fontSize: getDimen(0.06) }}>1234 Main St</Text>
                                        </View>

                                        <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.05) }}>
                                            <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                <Text style={{ fontSize: getDimen(0.06) }}>2</Text>
                                                <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                                            </View>
                                            <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                                <Text style={{ fontSize: getDimen(0.06) }}>2</Text>
                                                <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                                            </View>
                                            <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                                <Text style={{ fontSize: getDimen(0.06) }}>1</Text>
                                                <Text style={{ fontSize: getDimen(0.035) }}>Terrace</Text>
                                            </View>
                                        </View>

                                        <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.05), marginLeft: getDimen(0) }}>

                                            <View style={{ flex: 0.35, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                <Image source={require('../../../assets/icons/pin.png')}
                                                    style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                            </View>
                                            <View style={{ flex: 0.6, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft: getDimen(-0.01) }}>
                                                <Text style={{ fontSize: getDimen(0.035) }}>City,State</Text>
                                            </View>
                                            <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                {/* <Image source={require('../../../assets/icons/dummyLine.png')}
                                                         style={{ height: getDimen(0.05), width: getDimen(0.05) }} /> */}
                                                <TouchableOpacity onPress={() => Alert.alert('Clicked!')}>
                                                    <Image source={require('../../../assets/icons/dummyLine.png')}
                                                        style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                        <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0), marginLeft: getDimen(0) }}>

                                            <View style={{ flex: 0.35, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                <Image source={require('../../../assets/icons/map.png')}
                                                    style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                            </View>
                                            <View style={{ flex: 0.6, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft: getDimen(-0.01) }}>
                                                <Text style={{ fontSize: getDimen(0.035) }}>0000 Sq Feet</Text>
                                            </View>
                                            <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                {/* <Image source={require('../../../assets/icons/20.png')}
                                                         style={{ height: getDimen(0.05), width: getDimen(0.05) }} /> */}
                                                <TouchableOpacity onPress={() => onShare()}>
                                                    <Image source={require('../../../assets/icons/20.png')}
                                                        style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                    </View>

                                </View>
                            </View>

                        </View>
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => item.id}
                    
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: 0,
        width: getDimen(1)
    },
});

export default SearchListScreen;