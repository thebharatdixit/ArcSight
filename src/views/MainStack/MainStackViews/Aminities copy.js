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

function Aminities(props) {

    const { dataFor } = props.route.params ? props.route.params : ""
    const { data } = props.route.params ? props.route.params : ""
    // const { companyName } = route.params ? route.params : ""

    const dummyData = [
        // mainSt: '1234 Main St',
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ];

    const [ArrData, setArr] = React.useState([]);


    React.useEffect(() => {
        // console.log('routenavigation' +JSON.stringify(route) + '....' + JSON.stringify(navigation) );

        filterData(data);

    }, [])

    const filterData = (data) => {
        var filteredData = [];
        var isModified = false;
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (!(item.isSelected == null)) {
                isModified = true;
            }
            else {
                let data = {
                    "id": item.id,
                    "name": item.name,
                    "isSelected": false,
                }
                filteredData.push(data);
            }
        }
        if (isModified) {
            console.log('true..');
            setArr(data);
        }
        else {
            setArr(filteredData);
        }
        console.log('filtereddata :' + JSON.stringify(filteredData));
    }

    const tickOrUntick = (item) => {
        var filteredData = [];
        for (let i = 0; i < ArrData.length; i++) {
            let item2 = ArrData[i];
            if (item.id === item2.id) {
                if (item.isSelected) {
                    let data = {
                        "id": item.id,
                        "name": item.name,
                        "isSelected": false,
                    }
                    filteredData.push(data);
                }
                else {
                    let data = {
                        "id": item.id,
                        "name": item.name,
                        "isSelected": true,
                    }
                    filteredData.push(data);
                }
            }
            else {
                filteredData.push(item2);
            }
        }
        console.log('selectedfiltereddata :' + JSON.stringify(filteredData));
        setArr(filteredData);
    }

    const fetchDataFromAmenities = () => {
        console.log('next to prev success..:' + props.screenProps);
        props.screenProps.fetchDataFromAmenities();
        props.navigation.goBack();
    }
    

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() =>
                    props.navigation.goBack()
                }>
                    <Image source={require('../../../assets/icons/back.png')}
                        style={{ height: 25, width: 25 }} />
                </TouchableOpacity>

                <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <Text style={{ fontSize: 24, color: 'black' }}>Select</Text>

                    <TouchableOpacity onPress={() =>
                    fetchDataFromAmenities()
                }>
                        <Text style={{ fontSize: 24, color: 'black' }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 0.90, width: '100%', height: '100%', backgroundColor: 'white' }}>
                <ScrollView style={styles.container}>
                    <FlatList
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 0, }}
                        data={ArrData}
                        renderItem={({ item, separators, index }) => (
                            <TouchableWithoutFeedback onPress={() => tickOrUntick(item)} style={{ height: getDimen(0.12), width: '100%' }}>
                                <View style={{ flexDirection: 'column', height: getDimen(0.10), width: '100%', alignItems: 'center', alignContent: 'center', marginTop: 5 }}>
                                    <View style={{ flexDirection: 'row', padding: 2, height: getDimen(0.10), width: '90%', justifyContent: 'center' }}>
                                        <Text style={{ flex: 0.85, fontSize: 20, color: 'black' }}>{item.name}</Text>
                                        <View style={{ flex: 0.15, alignItems: 'flex-end', justifyContent: 'center' }}>
                                            {item.isSelected ?
                                                <Image
                                                    source={require('../../../assets/images/Check.png')}
                                                    style={{ height: getDimen(0.045), width: getDimen(0.045) }} />
                                                :
                                                <View style={{ height: getDimen(0.045), width: getDimen(0.045) }}></View>
                                            }

                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '100%', backgroundColor: 'gray' }}></View>

                                </View>

                            </TouchableWithoutFeedback>

                        )}
                        keyExtractor={item => item.id}

                    />
                </ScrollView>
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

export default Aminities;

// export default connect()(Aminities)
