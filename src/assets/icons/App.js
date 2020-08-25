import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ToastAndroid,

} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { color, Value } from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';

import { CheckBox } from 'native-base';









function WelcomeScreen({ navigation }) {


  return (
    <ImageBackground
      source={require('./assets/splash_mob.png')}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="light-content" backgroundColor="#AA2622" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Personal')}>
          <Text style={styles.textStyle}>START</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

function PersonalInfo({ navigation }) {

  const [name, setName] = React.useState('');
  const [emailId, setEmailId] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [designation, setdesignation] = React.useState('');
  const [location, setlocation] = React.useState('');
  const [remark, setremark] = React.useState('');

  return (
    <ImageBackground source={require('./assets/bg.png')} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 40,
            }}>
            <Text style={styles.personalTitle}>Personal Info</Text>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ color: '#A1ACB2', fontSize: 17 }}>Name</Text>
              <Text style={{ color: '#AA2622', marginLeft: 2 }}>*</Text>
            </View>

            <TextInput
              underlineColorAndroid="#A1ACB2"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={(val) => setName(val)}
            />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ color: '#A1ACB2', fontSize: 17 }}>Email ID</Text>
              <Text style={{ color: '#AA2622', marginLeft: 2 }}>*</Text>
            </View>

            <TextInput
              keyboardType="email-address"
              underlineColorAndroid="#A1ACB2"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={(val) => setEmailId(val)}
            />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ color: '#A1ACB2', fontSize: 17 }}>Phone Number</Text>
              <Text style={{ color: '#AA2622', marginLeft: 2 }}>*</Text>
            </View>

            <TextInput
              keyboardType="number-pad"
              underlineColorAndroid="#A1ACB2"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={(val) => setPhoneNumber(val)}
            />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ color: '#A1ACB2', fontSize: 17 }}>Company Name</Text>
              <Text style={{ color: '#AA2622', marginLeft: 2 }}>*</Text>
            </View>

            <TextInput
              keyboardType="default"
              underlineColorAndroid="#A1ACB2"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={(val) => setCompanyName(val)}
            />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ color: '#A1ACB2', fontSize: 17 }}>Designation</Text>
              <Text style={{ color: '#AA2622', marginLeft: 2 }}>*</Text>
            </View>

            <TextInput
              keyboardType="default"
              underlineColorAndroid="#A1ACB2"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={(val) => setdesignation(val)}
            />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ color: '#A1ACB2', fontSize: 17 }}>Location</Text>
              <Text style={{ color: '#AA2622', marginLeft: 2 }}>*</Text>
            </View>

            <TextInput
              keyboardType="default"
              underlineColorAndroid="#A1ACB2"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={(val) => setlocation(val)}
            />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ color: '#A1ACB2', fontSize: 17 }}>
                Remark (if any)
              </Text>
            </View>

            <TextInput
              keyboardType="default"
              multiline
              underlineColorAndroid="#A1ACB2"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={(val) => setremark(val)}
            />
          </View>
        </ScrollView>

        <View style={styles.viewContainer}>
          <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WelcomeScreen')}>
              <Image
                source={require('./assets/previous.png')}
                style={{ width: 30, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', paddingRight: 5 }}>
            <TouchableOpacity
              onPress={() =>
                validation(
                  name,
                  emailId,
                  phoneNumber,
                  companyName,
                  designation,
                  location,
                  remark,
                  navigation,
                )
              }>
              <Image
                source={require('./assets/next.png')}
                style={{ width: 30, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

validation = (name, emailId, phoneNumber, companyName, designation, location, remark, navigation) => {
  if (name == '') {
    ToastAndroid.show("Please Enter Name ", ToastAndroid.SHORT);
  } else if (emailId === '') {
    ToastAndroid.show('Please Enter Email ID', ToastAndroid.SHORT);
  } else if (phoneNumber === '') {
    ToastAndroid.show("Please Enter Phone Number", ToastAndroid.SHORT);
  } else if (companyName === '') {
    ToastAndroid.show("Please Enter Company Name", ToastAndroid.SHORT);
  }
  else if (designation === '') {
    ToastAndroid.show("Please Enter Designation", ToastAndroid.SHORT);
  } else if (location === '') {
    ToastAndroid.show("Please Enter Location", ToastAndroid.SHORT);
  } else {
    navigation.navigate('Intrest', { name, emailId, phoneNumber, companyName, designation, location, remark });
  }
}

function IntrestScreen({ route, navigation }) {

  const { name } = route.params;
  const { emailId } = route.params;
  const { phoneNumber } = route.params;
  const { designation } = route.params;
  const { location } = route.params;
  const { remark } = route.params;


  const [interest, setInterest] = React.useState([
    { interest: 'Automation', key: '1', value: false },
    { interest: 'Clinical Operations', key: '2', value: false },
    { interest: 'Data Management', key: '3', value: false },
    { interest: 'Biostatistics', key: '4', value: false },
    { interest: 'Medical Writing', key: '5', value: true },
    { interest: 'Quality Assurance', key: '6', value: true },
    { interest: 'Digital Transformation', key: '7', value: false },
    { interest: 'Technology Solutions', key: '8', value: false },
    { interest: 'Other', key: '9', value: false },
  ]);

  const [isSelected, setSelection] = useState(false);
  const [isAutomation, setAutomation] = useState(false);
  const [isClinicalOperation, setClinicalOperation] = useState(false);
  const [isDataManagment, setDataManagment] = useState(false);
  const [isBioStatics, setBioStatics] = useState(false);
  const [isMedicalWriting, setMedicalWriting] = useState(false);
  const [isQualityAssurance, setQualityAssurance] = useState(false);
  const [isDigitalTransformation, setDigitalTrans] = useState(false);
  const [isTechnologySol, setTechnologySol] = useState(false);
  const [isOther, setOther] = useState(false);

  React.useEffect(() => {
    //console.log("Did mount called")
    //loadResourcesAsync()
  }, [])

  function changeCheck(position) {
    if (position === 0)
      setAutomation(!isAutomation)
    else if (position === 1)
      setClinicalOperation(!isClinicalOperation)
    else if (position === 2)
      setDataManagment(!isDataManagment)
    else if (position === 3)
      setBioStatics(!isBioStatics)
    else if (position === 4)
      setMedicalWriting(!isMedicalWriting)
    else if (position === 5)
      setQualityAssurance(!isQualityAssurance)
    else if (position === 6)
      setDigitalTrans(!isDigitalTransformation)
    else if (position === 7)
      setTechnologySol(!isTechnologySol)
    else if (position === 8)
      setOther(!isOther)


  }

  function getView(position) {
    return <View
      // key={intest.key}
      style={{ margin: 6, alignContent: 'center' }}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignContent: 'center',
          padding: 5,
        }}>
        <View style={styles.checkbox}>
          <Image
            source={require('./assets/arrow.png')}
            style={{ width: 20, height: 18 }}
          />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 18,
              fontWeight: 'normal',
            }}>
            {interest[position].interest}
          </Text>
        </View>

        <CheckBox
          onPress={(Value) => changeCheck(position)}
          checked={isChecked(position)} color="#1C3169" />
      </View>
    </View>
  }
  function isChecked(position) {
    if (position === 0)
      return isAutomation
    else if (position === 1)
      return isClinicalOperation
      else if (position === 2)
      return isDataManagment
      else if (position === 3)
      return isBioStatics
      else if (position === 4)
      return isMedicalWriting
      else if (position === 5)
      return isQualityAssurance
      else if (position === 6)
      return isDigitalTransformation
      else if (position === 7)
      return isTechnologySol
      else if (position === 8)
      return isOther

  }

  return (
    <ImageBackground source={require('./assets/bg.png')} style={{ flex: 1 }}>
      {console.log("changing view")}

      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ margin: 20 }}>
            <Text style={styles.personalTitle}>Interest</Text>
            <Text style={{ marginTop: 5 }}>Please select your interest area</Text>
            <View>
              {/* {interest.map((intest, index) => {
                //const [isSelected, setSelection] = useState(false);
                return (
                  <View
                    key={intest.key}
                    style={{ margin: 6, alignContent: 'center' }}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignContent: 'center',
                        padding: 5,
                      }}>
                      <View style={styles.checkbox}>
                        <Image
                          source={require('./assets/arrow.png')}
                          style={{ width: 20, height: 18 }}
                        />
                        <Text
                          style={{
                            paddingLeft: 20,
                            fontSize: 18,
                            fontWeight: 'normal',
                          }}>
                          {intest.interest}
                        </Text>
                      </View>
                      {console.log("" + interest[index].value)}
                     
                      <CheckBox
                        onPress={() => changeCheck(index)}
                        checked={interest[index].value} color="#1C3169" />
                    </View>
                  </View>
                );
              })} */}
              {getView(0)}
              {getView(1)}
              {getView(2)}
              {getView(3)}
              {getView(4)}
              {getView(5)}
              {getView(6)}
              {getView(7)}
              {getView(8)}

            </View>
          </View>
        </ScrollView>

        <View style={styles.viewContainer}>
          <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Personal')}>
              <Image
                source={require('./assets/previous.png')}
                style={{ width: 30, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', paddingRight: 5 }}>
            <TouchableOpacity onPress={() => checkedValidatation(navigation, isSelected, name, emailId, phoneNumber, companyName, designation, location, remark)}>
              <Image
                source={require('./assets/next.png')}
                style={{ width: 30, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}


checkedValidatation = (navigation, isSelected, name, emailId, phoneNumber, companyName, designation, location, remark) => {

  const [data, setData] = useState([]);

  if (isSelected === false) {
    ToastAndroid.show('Please Enter Designation' + isSelected, ToastAndroid.SHORT);
  } else {
    fetch('https://iscr.klientotech.com/iscrprofile.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameParam: name,
        emailParam: emailId,
        phoneParam: phoneNumber,
        compParam: companyName,
        desigParam: designation,
        locationParam: location,
        remarkParam: remark
      })
    }).then(res => res.json()).
      then((json) => setData(json.movies)).
      catch(error => console.error('error', error)).
      then(Response => console.log('success', response));
  }
}

function ThankyouScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('./assets/thankyou_image.png')}
        style={{ width: 200, height: 200 }}
      />

      <Text style={{ justifyContent: 'center', fontSize: 17, fontFamily: 'Lato-Regular.ttf' }}>
        Thank You for your time, Our domain
      </Text>
      <Text style={{ justifyContent: 'center', fontSize: 17 }}>
        expert will reach you to help &amp; grow your business
      </Text>
      <Text style={{ justifyContent: 'center', marginTop: 30, fontSize: 17 }}>
        “ Have a Great day ahead ”
      </Text>

      <View style={styles.thanku}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('WelcomeScreen')}>
            <Image
              source={require('./assets/home.png')}
              style={{ width: 30, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00aeef',
    borderWidth: 5,
    borderRadius: 15,
  },
  viewContainer: {
    height: 40,
    width: '100%',
    backgroundColor: '#E1E1E1',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: '#fff',
  },
  personalTitle: {
    color: '#000000',
    fontSize: 28,
    fontWeight: 'bold'
  },
  SubmitButtonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#AA2622',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    color: '#ffffff',
  },
  thanku: {
    height: 40,
    width: '100%',
    backgroundColor: '#E1E1E1',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center'
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});



const Stack = createStackNavigator();


function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}
        />
        <Stack.Screen name="Personal" component={PersonalInfo}
        />
        <Stack.Screen name="Intrest" component={IntrestScreen}
        />
        <Stack.Screen name="Thankyou" component={ThankyouScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;