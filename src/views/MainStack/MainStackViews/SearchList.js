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
import { getData } from '../../../utils/asyncStore';

function SearchListScreen({ navigation, route }) {

    const { SearchList } = route.params ? route.params : ""
    const [webUrl, setWerUrl] = React.useState('')
    const [bannerUrlImage, setBannerUrl] = React.useState('');
    const [length, setLength] = React.useState()

    React.useEffect(() => {
        getData('bannerUrl').then((bannerUrl) => {
            setBannerUrl(bannerUrl);
        })
        console.log('json data in useEffect:', SearchList.data);
        setLength(SearchList.data.length)
        {
            (length === 0) ?
                Alert.alert('No Data Found')
                :
                null
        }
        // const searchListData = SearchList.data[0].location
        // const listDetail = searchListData.location
        // console.log('location', JSON.stringify(searchListData))
    })

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

    }
    const dummyData = [
        // mainSt: '1234 Main St',
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ];

    const [ArrData, setArr] = React.useState(dummyData);
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() =>
                    navigation.goBack()
                }>
                    <Image source={require('../../../assets/icons/back.png')}
                        style={{ height: 25, width: 25 }} />
                </TouchableOpacity>

                <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    {/* <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} /> */}

                    <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                </View>
            </View>
            <View style={{ flex: 0.90, width: '100%', height: '100%', backgroundColor: 'white' }}>
                <ScrollView style={styles.container}>
                    <FlatList
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 0, }}
                        data={SearchList.data}
                        renderItem={({ item, separators, index }) => (
                            <TouchableWithoutFeedback
                            // onPress={() => Alert.alert('Search List Detail')}
                            >
                                <View>
                                    <View style={{ borderRadius: 0, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 20 }}>

                                        <View style={{ backgroundColor: '#F2F2F2', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.55), marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                            <View style={{ flex: 0.6, height: '100%' }}>
                                                <View style={{ flex: 0.9, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#E6E6E6' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        navigation.navigate('Search List Detail', ({ "user_idSearchDetail": item.user_id, "listing_id": item.id }))
                                                    }
                                                    }>
                                                        {/* <Image
                                                source={require('../../../assets/icons/19.png')}
                                                style={{ resizeMode: 'contain', height: getDimen(.09), width: getDimen(.09)}}
                                            /> */}
                                                        {
                                                            (item && item.main_image_url === undefined || item.main_image_url === null || item.main_image_url === 'http://arc.softwaresolutions.website/images/ListingImages/' || '') ?
                                                                <Image
                                                                    source={require('../../../assets/icons/19.png')}
                                                                    style={{ resizeMode: 'contain', height: getDimen(.09), width: getDimen(.09) }}
                                                                />
                                                                :
                                                                <Image source={{
                                                                    uri: `${item.main_image_url}`
                                                                }}
                                                                    style={{ resizeMode: 'cover', height: getDimen(.45), width: getDimen(.35) }} />
                                                        }
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'orange' }}>
                                                    <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f1ac35' }}>
                                                        {/* <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>FOR SALE</Text> */}
                                                        <Text style={{ fontSize: getDimen(0.035), fontWeight: '600', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>{item.listing_type}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#a43d3e' }}>
                                                        <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign: 'center' }}>$000,00</Text>
                                                    </View>
                                                </View>

                                            </View>
                                            <View style={{ flex: 1, height: '100%', }}>
                                                <View style={{ flex: 0.3, marginLeft: getDimen(0.05), marginTop: getDimen(0.05) }}>
                                                    <TouchableOpacity onPress={() => {
                                                        navigation.navigate('Search List Detail', ({ "user_idSearchDetail": item.user_id, "listing_id": item.id }))
                                                    }
                                                    }>
                                                        {/* <Text style={{ fontSize: getDimen(0.06) }}>1234 Main St</Text> */}
                                                        <Text
                                                            numberOfLines={2}
                                                            style={{ fontSize: getDimen(0.045), fontWeight: '600' }}>{item.location}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.05) }}>
                                                    <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                        <Text style={{ fontSize: getDimen(0.06) }}>{item.bedrooms}</Text>
                                                        <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                                                    </View>
                                                    <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                                        <Text style={{ fontSize: getDimen(0.06) }}>{item.bathrooms}</Text>
                                                        <Text style={{ fontSize: getDimen(0.035) }}>Bathrooms</Text>
                                                    </View>
                                                    <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                                        <Text style={{ fontSize: getDimen(0.06) }}>{item.terrace}</Text>
                                                        <Text style={{ fontSize: getDimen(0.035) }}>Terrace</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0.05), marginLeft: getDimen(0) }}>

                                                    <View style={{ flex: 0.35, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                        <Image source={require('../../../assets/icons/pin.png')}
                                                            style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                    </View>
                                                    <View style={{ flex: 0.6, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft: getDimen(-0.01) }}>
                                                        {/* <Text style={{ fontSize: getDimen(0.035) }}>City,State</Text> */}
                                                        <Text style={{ fontSize: getDimen(0.035) }}>{item.city},{item.state}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                        {/* <Image source={require('../../../assets/icons/dummyLine.png')}
                                                         style={{ height: getDimen(0.05), width: getDimen(0.05) }} /> */}
                                                        <TouchableOpacity onPress={() => Alert.alert('Compared Feature!')}>
                                                            <Image source={require('../../../assets/icons/dummyLine.png')}
                                                                style={{ height: getDimen(0.08), width: getDimen(0.08) }} />
                                                        </TouchableOpacity>
                                                    </View>

                                                </View>

                                                <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: getDimen(0), marginLeft: getDimen(0) }}>

                                                    <View style={{ flex: 0.35, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>
                                                        <Image source={require('../../../assets/icons/map.png')}
                                                            style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                    </View>
                                                    <View style={{ flex: 0.6, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft: getDimen(-0.01) }}>
                                                        <Text style={{ fontSize: getDimen(0.035) }}>{item.sq_feet} Sq Feet</Text>
                                                    </View>
                                                    <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%' }}>

                                                        <TouchableOpacity onPress={() => onShare()}>
                                                            {
                                                                (item && item.web_share_url === !'') ?
                                                                    <Image source={require('../../../assets/icons/20.png')}
                                                                        style={{ height: getDimen(0.07), width: getDimen(0.07) }} />
                                                                    :
                                                                    null
                                                            }
                                                            {/* <Image source={require('../../../assets/icons/20.png')}
                                                        style={{ height: getDimen(0.07), width: getDimen(0.07) }} /> */}
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
                {bannerUrlImage ?
                    <View style={{ height: getDimen(0.2), width: getDimen(1), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'white', marginTop: 0 }}>
                        <View style={{ backgroundColor: 'white', width: '100%', height: '100%', alignItems: 'center', }}>
                            <Image source={{ uri: bannerUrlImage }}
                                defaultSource={require('../../../assets/icons/2.png')}
                                style={{ height: '100%', width: '100%', resizeMode: 'cover' }} />

                        </View>
                    </View>
                    :
                    null
                }

            </View>

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