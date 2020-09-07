import React, { useEffect, Component } from 'react';

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

import SplashScreen from 'react-native-splash-screen';
import { getData, storeData } from '../../../utils/asyncStore';
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { getDimen } from '../../../dimensions/dimen';

class Aminities extends Component {

    // const { dataFor } = props.route.params ? props.route.params : ""
    // const { data } = props.route.params ? props.route.params : ""
    // const { companyName } = route.params ? route.params : ""

    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {

            ArrData: [],



        }
    }

    componentDidMount() {
        var data = this.props.route.params.data;
        console.log('...::' + JSON.stringify(this.props));
        this.filterData(data);


    }

    componentWillUnmount() {
    }

    // console.log('routenavigation' +JSON.stringify(route) + '....' + JSON.stringify(navigation) );


    filterData = (data) => {
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
            this.dataGetFromCache(data);
            this.setState({ ArrData: data });
            // setArr(data);
        }
        else {
            this.dataGetFromCache(filteredData);
            this.setState({ ArrData: filteredData });
            // setArr(filteredData);
        }
        console.log('filtereddata :' + JSON.stringify(filteredData));

    }

    dataGetFromCache = (dataSelected) => {
        getData('selectedAminitiesData').then((selectedAminitiesData) => {
            if (selectedAminitiesData && selectedAminitiesData.length > 0) {
                console.log('USER selectedAminitiesData : ' + JSON.stringify(selectedAminitiesData));
                const dataArr = JSON.parse(selectedAminitiesData);
                var strArr = [];
                var strArrApi = [];
                var filteredData = [];

                // for (let j = 0; j < dataArr.length; j++) {
                //     let item2 = dataArr[j];
                //     let data = {
                //         "id": item2.id,
                //         "name": item2.name,
                //         "isSelected": true,
                //     }
                //     filteredData.push(data);
                // }

                // for (let i = 0; i < dataSelected.length; i++) {
                //     let item = dataSelected[i];
                //     let data = {
                //         "id": item.id,
                //         "name": item.name,
                //         "isSelected": false,
                //     }
                //     filteredData.push(data);
                // }


                for (let i = 0; i < dataSelected.length; i++) {
                    let item = dataSelected[i];
                    let data2 = {
                        "id": item.id,
                        "name": item.name,
                        "isSelected": false,
                    }
                    var isedit = false;
                    for (let j = 0; j < dataArr.length; j++) {
                        let item2 = dataArr[j];
                        if (item.id === item2.id) {
                            let data = {
                                "id": item.id,
                                "name": item.name,
                                "isSelected": true,
                            }
                            const modifiedData = { ...item, isSelected: true }
                            filteredData.push(data);
                            isedit = true
                        }
                        else {
                            // let data = {
                            //     "id": item.id,
                            //     "name": item.name,
                            //     "isSelected": false,
                            // }
                            // filteredData.push(data);
                        }
                    }
                    if (isedit) {

                    }
                    else {
                        filteredData.push(data2);
                    }

                }
                this.setState({ ArrData: filteredData });
                // setArrSelectedAminities(filteredData);
                // setArrSelectedAminitiesForApi(filteredData);
                // this.setState({ arrSelectedAminities: strArr });
            }
            else {
            }
        })
    }

    tickOrUntick = (item) => {
        var filteredData = [];
        for (let i = 0; i < this.state.ArrData.length; i++) {
            let item2 = this.state.ArrData[i];
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
        this.setState({ ArrData: filteredData });
        // setArr(filteredData);
    }

    fetchDataFromAmenities = () => {
        console.log('next to prev success..:');
        var filteredData = [];
        for (let i = 0; i < this.state.ArrData.length; i++) {
            let item2 = this.state.ArrData[i];
            if (item2.isSelected) {
                filteredData.push(item2);
            }
            else {

            }
        }
        storeData("selectedAminitiesData", JSON.stringify(filteredData));
        // this.props.navigation.params.fetchDataFromAmenities();
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() =>
                        this.props.navigation.goBack()
                    }>
                        <Image source={require('../../../assets/icons/back.png')}
                            style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>

                    <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 24, color: 'black' }}>Select Aminities</Text>

                        <TouchableOpacity onPress={() =>
                            this.fetchDataFromAmenities()
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
                            data={this.state.ArrData}
                            renderItem={({ item, separators, index }) => (
                                <TouchableWithoutFeedback onPress={() => this.tickOrUntick(item)} style={{ height: getDimen(0.12), width: '100%' }}>
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
        );
    }
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
