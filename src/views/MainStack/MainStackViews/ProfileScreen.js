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
    Share,
    Alert
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body } from 'native-base';
import { getDimen } from '../../../dimensions/dimen';

function ProfileScreen({ navigation }) {
    // const [username, setUsername] = React.useState('');
   
    const dummyData = [
            // mainSt: '1234 Main St',
            {id: '1'},
            {id: '2'},
            {id: '3'},
       ];
       const [ArrData, setData] = React.useState(dummyData);
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            
            <View style={{backgroundColor: 'white', height: getDimen(0.45), width: '100%', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
               <TouchableOpacity onPress={() => Alert.alert('Show Gallery')}>
                <Image source={require('../../../assets/icons/2.png')}
                    style={{ height: getDimen(0.18), width: getDimen(0.18), marginTop:getDimen(0.04)}}
                />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize:getDimen(0.049) ,marginTop: getDimen(0.03)}}>My Name Here</Text>
                <Text style={{ color: 'gray', fontSize: getDimen(0.036), marginTop:getDimen(0.005)}}>Real Estate Company</Text>
                <View style = {{flexDirection:'row',justifyContent:'center',alignContent:'center', alignItems:'center', marginTop:getDimen(0.04),}}>
                    <View style={{ justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'white', marginRight: getDimen(0.02)}}>
                        <Text style={{ fontSize: getDimen(0.04), textAlign:'left' }}>00 Listings</Text>
                    </View>
                    <View style={{ width: 1, height: '100%', backgroundColor: 'gray', marginLeft: getDimen(0.02)}}></View>
                    <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'white', marginLeft: getDimen(0.03) }}>
                        <Text style={{ fontSize: getDimen(0.04), textAlign:'right' }}>00 Colleagues</Text>
                    </View>
                    
                    
                </View>
            </View>
            
            <ScrollView style={styles.container}>
                <View style={{ flex: 0.1, backgroundColor: '#d2d6d5', justifyContent: 'flex-start', alignItems: 'center', marginTop: getDimen(0.05) }}>
                    <View style={{ flex: 0.2, flexDirection: 'row', width: '100%', }}>
                        <View style={{ backgroundColor: '#d2d6d5', height: getDimen(0.125), width: getDimen(0.8), justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                                <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>FEATURED PROPERTY</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#a43d3e', height: getDimen(0.125), width: getDimen(0.2), justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>360◦</Text>
                        </View>
                    </View>

                    <Image source={require('../../../assets/icons/19.png')}
                        style={{ height: getDimen(0.15), width: getDimen(0.15), resizeMode: 'contain', margin: getDimen(0.3) }}
                    />

                </View>

                <View style={{ flex: 0.15, flexDirection: 'row', backgroundColor:'#F2F2F2', }}>
                    
                    <TouchableOpacity
                        onPress={() => Alert.alert('1234 Main St Profile Details')}
                    >
                        <Text style={{ fontSize: getDimen(0.06), marginLeft: getDimen(0.05), marginTop: getDimen(0.05), marginBottom: getDimen(0.05) }}>1234 Main St</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 0.25, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%', }}>
                        <Text style={{ fontSize: getDimen(0.06) }}>2</Text>
                        <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                    </View>
                    <View style={{ flex: 0.22, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                        <Text style={{ fontSize: getDimen(0.06) }}>2</Text>
                        <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                    </View>
                    <View style={{ flex: 0.21, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                        <Text style={{ fontSize: getDimen(0.06) }}>1</Text>
                        <Text style={{ fontSize: getDimen(0.035) }}>Terrace</Text>
                    </View>
                    <View style={{ backgroundColor: '#a43d3e', flex: 0.395, height: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: getDimen(0.045) }}>&0,000,000</Text>
                    </View>
                </View>
                
                <FlatList
                ///// Search List Screen
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 0, }}
                    data={dummyData}
                    renderItem={({ item, separators, index }) => (
                        <View>
                                <View style={{ borderRadius: 0, width: getDimen(0.95), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center',marginTop:20 }}>

                                    <View style={{ backgroundColor: '#F2F2F2', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.55) , marginTop: 0, marginRight: 0, borderRadius: 5, alignItems: 'center', }}>
                                        <View style={{ flex: 0.6, height: '100%'}}>
                                            <View style={{ flex: 0.9, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor:'#E6E6E6'}}>
                                                <Image
                                                    source={require('../../../assets/icons/19.png')}
                                                    style={{ resizeMode: 'contain', height: getDimen(.09), width: getDimen(.09) }}
                                                />
                                           </View> 
                                           
                                            <View style={{flex: 0.2,flexDirection:'row', backgroundColor:'orange'}}>
                                                <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor:'#f1ac35'}}>
                                                    <Text style={{fontSize:getDimen(0.03),fontWeight:'500', marginLeft: getDimen(0.01), color:'white', textAlign:'center'}}>FOR SALE</Text>
                                                </View>
                                                <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor:'#a43d3e' }}>
                                                    <Text style={{ fontSize: getDimen(0.03), fontWeight: '500', marginLeft: getDimen(0.01), color: 'white', textAlign:'center' }}>$000,00</Text>
                                                </View>
                                            </View>

                                        </View>
                                        <View style={{ flex: 1, height: '100%',  }}>
                                           <View style={{flex:0.15,marginLeft:getDimen(0.05), marginTop: getDimen(0.05)}}>
                                                <Text style={{fontSize:getDimen(0.06)}}>1234 Main St</Text>
                                           </View>

                                            <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop:getDimen(0.05)}}>
                                                <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height:'100%'}}>
                                                    <Text style={{fontSize:getDimen(0.06)}}>2</Text>
                                                    <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                                                </View>
                                                <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%' }}>
                                                    <Text style={{ fontSize: getDimen(0.06) }}>2</Text>
                                                    <Text style={{ fontSize: getDimen(0.035) }}>Bedrooms</Text>
                                                </View>
                                                <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: getDimen(0.002), height: '100%'}}>
                                                    <Text style={{ fontSize: getDimen(0.06) }}>1</Text>
                                                    <Text style={{ fontSize: getDimen(0.035) }}>Terrace</Text>
                                                </View>
                                           </View>

                                           <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop:getDimen(0.05),marginLeft: getDimen(0)}}>
                                           
                                           <View style={{ flex: 0.35, flexDirection: 'column', backgroundColor: '#F2F2F2',justifyContent: 'center', alignContent: 'center', alignItems: 'center',  height:'100%'}}>
                                                     <Image source={require('../../../assets/icons/pin.png')}
                                                         style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                </View>
                                                <View style={{ flex: 0.6, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft:getDimen(-0.01) }}>
                                                    <Text style={{ fontSize: getDimen(0.035) }}>City,State</Text>
                                                </View>
                                                <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%'}}>
                                                    {/* <Image source={require('../../../assets/icons/dummyLine.png')}
                                                         style={{ height: getDimen(0.05), width: getDimen(0.05) }} /> */}
                                                         <TouchableOpacity onPress={() => Alert.alert('Clicked!')}>
                                                        <Image source={require('../../../assets/icons/dummyLine.png')}
                                                             style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                        </TouchableOpacity>
                                                </View>
                                           
                                           </View>

                                           <View style={{ flex: 0.27, flexDirection: 'row', backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop:getDimen(0),marginLeft: getDimen(0)}}>
                                           
                                           <View style={{ flex: 0.35, flexDirection: 'column', backgroundColor: '#F2F2F2',justifyContent: 'center', alignContent: 'center', alignItems: 'center',  height:'100%'}}>
                                                     <Image source={require('../../../assets/icons/map.png')}
                                                         style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                                                </View>
                                                <View style={{ flex: 0.6, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'flex-start', height: '100%', marginLeft:getDimen(-0.01) }}>
                                                    <Text style={{ fontSize: getDimen(0.035) }}>0000 Sq Feet</Text>
                                                </View>
                                                <View style={{ flex: 0.34, flexDirection: 'column', backgroundColor: '#F2F2F2', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%'}}>
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
        marginTop: getDimen(0.02),
        width: getDimen(1)
    },
    input: {
        height: 50,
        flex: 10,
        paddingLeft: 10,
        fontSize: getDimen(0.045),
        // fontFamily: 'Poppins-Regular',
        color: 'black'
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    inputContainerBottom: {
        borderWidth: 1,
        paddingBottom: 5,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row',
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        marginRight: getDimen(.085)
    },
    forgotContainer: {
        paddingTop: 10,
        paddingRight: 20,
    },
    forgotText: {
        fontSize: 13,
        alignSelf: 'flex-end',
        color: '#F26622',
    },
    textStyle1: {
        color: 'black',
        alignSelf: 'flex-start',
        marginTop: getDimen(.2),
        marginLeft: getDimen(.085),
        fontSize: getDimen(.045)
    },
    textStyle2: {
        color: '#0088DD',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: getDimen(.1),
        // marginLeft: getDimen(.085),
        fontSize: getDimen(.08)
    },
    textStyle3: {
        color: 'black',
        alignSelf: 'flex-start',
        fontStyle: 'italic',
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        fontSize: getDimen(.045)
    },
    body: {
        backgroundColor: 'white',
        // alignItems: "center", 
        // justifyContent: "center",
    },
    itemStyle: {
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        marginRight: getDimen(.085)
    },
});
// const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default ProfileScreen;
