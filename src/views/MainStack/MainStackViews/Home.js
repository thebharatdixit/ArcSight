import * as React from 'react';

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
    FlatList,
    SafeAreaView,
    Share,
    ToastAndroid,
    Alert,
    TouchableWithoutFeedback ,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Input, CheckBox, ListItem, Body } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
// import { changeAuthState, changeProtocolState, changeToLogoutState } from '../../actions/authAction';
import { getDimen } from '../../../dimensions/dimen';
import ProfileScreen from '../MainStackViews/ProfileScreen';
import MyColleagueScreen from '../MainStackViews/MyColleague';




const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Item = ({ title }) => (
    
    <View style={{flex:1}}>
        <View style={{ width: '100%', height: getDimen(0.2), flexDirection: 'row', alignItems: 'center', paddingLeft: getDimen(0.02), backgroundColor: 'white' }}>
            
            <Image source={require('../../../assets/icons/2.png')}
                style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>

            <TouchableOpacity onPress={() => Alert.alert('name')}>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                        Name Here
                        </Text>

                    <Text style={{ fontSize: 14, paddingRight: getDimen(0.02), alignContent: 'space-between' }}>
                        Listed 2 Days Ago
                        </Text>
                </View>
                </TouchableOpacity>
                <View>

                    <Text style={{ color: '#d2d6d5', paddingRight: 7 }}>
                        Real Estate Company
                        </Text>
                </View>

                <View >

                    <TouchableOpacity onPress={() => onShare()}>
                        <Image source={require('../../../assets/icons/20.png')}
                            style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>ToastAndroid.show('This is a toast with long duration', ToastAndroid.LONG)}>
                    <Image source={require('../../../assets/icons/25.png')}
                        style={{ height: getDimen(0.05), width: getDimen(0.05) }} />
                        </TouchableOpacity>
                        
                </View>
            </View>

        </View>

        <View style={styles.item}>


            <Image source={require('../../../assets/icons/19.png')}
                style={{ height: getDimen(0.1), width: getDimen(0.1) }} />

            <View style={{ width: '100%', alignItems: 'flex-end', position: 'absolute', bottom: 0 }}>
                <Text style={{
                    width: getDimen(0.3), height: getDimen(0.1), backgroundColor: '#a43d3e', textAlign: 'center', color: 'white',
                    textAlignVertical: 'center'
                }}>
                    $0,000,000
                </Text>
                <Text style={{
                    width: getDimen(0.3), height: getDimen(0.1), backgroundColor: '#f1ac35', textAlign: 'center', color: 'white',
                    textAlignVertical: 'center', fontSize: 18
                }}>
                    FOR SALE
                </Text>
            </View>
        </View>
    </View>
);

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
// const Drawer = createDrawerNavigator();

function MainScreen({ navigation }) {


    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );


    // const [checked, setChecked] = React.useState(false);
    // const [password, setPassword] = React.useState('');
    // const [username, setUsername] = React.useState('');
    return (

        <View style={{flex:1}} >
            <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                }>
                    <Image source={require('../../../assets/icons/3.png')}
                        style={{ height: 25, width: 25 }} />
                </TouchableOpacity>

                <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} />

                    <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                </View>
            </View>
            <View style={{ flex: 0.90}}>
            <View style={{ backgroundColor: 'white' }}>
                <Text style={{
                    width: getDimen(0.6), height: getDimen(0.1), backgroundColor: '#121735', textAlign: 'center', color: 'white',
                    textAlignVertical: 'center', fontSize: 18, fontWeight: 'bold'
                }}>
                    TOP LISTINGS
            </Text>
            
            </View>
            <ScrollView>
            
                <SafeAreaView >
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </ScrollView>

            {/* <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
                <Drawer.Screen name="MyColleagueScreen" component={MyColleagueScreen} />

                </Drawer.Navigator> */}

            </View> 
        </View>
    );

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        top: 2,
        width: '100%',
        height: '100%'
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
    item: {
        backgroundColor: '#d2d6d5',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: getDimen(0.9),
        marginVertical: getDimen(0.001),

    }
});
// const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default MainScreen;
