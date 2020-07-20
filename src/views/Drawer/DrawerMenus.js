import React, { Component } from "react"
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
  Image,
  Linking,
  SafeAreaView,
} from "react-native"

// import Icon from 'react-native-vector-icons/Ionicons'
// import { Icon } from 'native-base';
import { Button, Icon } from 'native-base';
import { storeData, getData } from '../../utils/asyncStore';
// import AsyncStorage from '@react-native-community/async-storage';
import ProfileComponent from '../Drawer/ProfileComponent';
import DrawerItem from '../Drawer/DrawerItemComponent';
import { getDimen } from '../../dimensions/dimen';

// import strings from "../../lang/strings";

const userData = {
  profileUrls: 'https://s-media-cache-ak0.pinimg.com/736x/a3/e3/d6/a3e3d67e30105ca1688565e484370ab8--social-networks-harry-potter.jpg',
  //   username: 'Emma',
  //   email: 'ewatson@gryffindor.io'
}


const menuData = [
  { icon: "ios-home", name: "Home", screenName: "Home", key: '1' },
  { icon: "book", name: "Study User", screenName: "StudyListing", key: '2' },
  { icon: "flag", name: "Report", screenName: "ReportScreen", key: '3' },
  { icon: "bookmark", name: "Helpdesk", screenName: "HelpdeskScreen", key: '4' },
  { icon: "lock", name: "Change Password", screenName: "ChangePasswordScreen", key: '5' },
  { icon: "ios-log-out", name: "Logout", screenName: "LogoutScreen", key: '6' },
  // { icon: "cog", name: "Home2", screenName: "HomeTwo", key: '3' },
]


class DrawerMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profileUrl: '',
      username: '',
      email: '',
      nameOfQuinta: '',
    }
  }



  // componentWillMount() {
  //   this._retrieveValues();
  //     getData('nameOfQuinta').then((value) => {
  //         if (value !== null) {
  //             this.setState({ nameOfQuinta: value })
  //             // console.log('LOGIN STATUS Success : ', value);
  //         }
  //         else {
  //             // console.log('LOGIN STATUS : ', 'faliure.' + value);
  //         }

  //     })
  // }


  // _retrieveValues() {

  //   getData('loginData').then((value) => {
  //     const myObjStr = JSON.parse(value);
  //     var nameOfUser = JSON.stringify(myObjStr.data[0].username)
  //     var emailOfUser = JSON.stringify(myObjStr.data[0].email)
  //     // alert(nameOfUser);
  //     this.setState({
  //       profileUrl: '',
  //       username: nameOfUser,
  //       email: emailOfUser,
  //     })
  //     // alert('Data from async ' + JSON.stringify(myObjStr.data));

  //   })
  // }

  // clearAsyncStorage = async () => {
  //   AsyncStorage.clear();
  // }

  _logoutAction() {
    // getData('language').then((language) => {
    //   if (language !== null) {
    //     const selectedLanguage = language
    //     this.clearAsyncStorage();
    //     storeData('language', selectedLanguage);
    //     this.props.navigation.navigate('App');
    //   } else {

    //   }
    // })
  }

  render() {
    return (
      // <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <ImageBackground
          source={require('../../assets/images/bg.png')}
          style={{
            width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'
          }} resizeMode='stretch'> */}
        <View style={{
          alignSelf: 'center',
          position: 'absolute',
          backgroundColor: 'transparent',
          height: '100%',
          width: '100%',
          flex: 1,
          flexDirection: 'column'
        }}>
          <View style={styles.headerView}>
            <Text style={styles.textMenu}>Menu</Text>
          </View>
          <View style={{ flex: .15, marginLeft: getDimen(.045), alignItems: 'flex-start', justifyContent: 'center', }}>
            {/* <Image source={require('../../assets/images/bg.png')} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }} resizeMode='cover'> */}

            <ProfileComponent profileUrl={userData.profileUrls} username="Elaine Dreifuss" email="CRO" />

            {/* </Image> */}
          </View>
          <View style={styles.viewSeperatorStyle}></View>
          <View style={{ flex: .65, backgroundColor: '#ffffff' }}>
            <FlatList
              data={menuData}
              renderItem={({ item }) => <DrawerItem navigation={this.props.navigation} screenName={item.screenName} icon={item.icon} name={item.name} key={item.key} />}
            />
          </View>
          <View style={{ flex: .10, backgroundColor: '#ffffff' }}>
            {/* <Button style={{ backgroundColor: '#ffffff' }}
              onPress={() => this._logoutAction()
              } full>
              <Text style={{ color: 'black' }}>"Logout"</Text>
            </Button> */}
          </View>
        </View>
        {/* </ImageBackground> */}
      </View>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  textMenu: {
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    fontWeight: 'normal',
    marginTop: getDimen(.025),
    marginLeft: getDimen(.085),
    fontSize: getDimen(.065)
},
  headerView: {
    color: '#72C1E1',
    backgroundColor: '#72C1E1',
    marginTop: 0,
    flex: .10,
    justifyContent: 'center',
    width: "100%",
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomColor: '#F1F1F4',
    // borderBottomWidth: 1,
  },
  viewSeperatorStyle: {
    color: 'gray',
    marginTop: getDimen(.025),
    width: "100%",
    alignSelf: 'center',
    borderBottomColor: '#F1F1F4',
    borderBottomWidth: 1,
  },
  menuItem: {
    flexDirection: 'row'
  },
  menuItemText: {
    fontSize: getDimen(.045),
    fontWeight: '300',
    margin: getDimen(.045),
  }
})

DrawerMenu.defaultProps = {};

DrawerMenu.propTypes = {};

export default DrawerMenu;
