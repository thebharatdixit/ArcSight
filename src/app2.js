/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Container, Button, Picker, Icon, Tab, Tabs, ScrollableTab, Form, Label, Item, Input, Content, Card, CardItem } from 'native-base';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {/* <ScrollView> */}
        {/* <Header /> */}

        <View style={styles.body}>
          <Text style={styles.textStyle1}>Welcome to</Text>
          <Text style={styles.textStyle2}>Electronic Data Capture System</Text>
          <Text style={styles.textStyle3}>To keep connected with us please login with your user name and password</Text>

          <Item style={styles.itemStyle}>
            <Icon active name='person' />
            <Input placeholder='User Name' />
          </Item>

          <Item style={styles.itemStyle}>
            <Icon active name='key' />
            <Input placeholder='Password' />
          </Item>

          <Button transparent style={{ marginTop: 30, alignItems: "center", marginLeft: 30, marginRight: 30, backgroundColor: "#1C3169" }}>
            <Text style={{ color: 'white', marginLeft: 30, fontSize: 22 }}>LOGIN</Text>
            <Icon name='arrow-forward' style={{ color: 'white' }} />
          </Button>
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
  engine: {
    position: 'absolute',
    right: 0,
  },
  textStyle1: { 
    color: 'black', 
    alignSelf: 'flex-start', 
    marginTop: 60, 
    marginLeft: 30, 
    fontSize: 18 
  },
  textStyle2: { 
    color: '#0088DD', 
    alignSelf: 'flex-start', 
    fontWeight: 'bold', 
    marginTop: 15, 
    marginLeft: 30, 
    fontSize: 28 
  },
  textStyle3: { 
    color: 'black', 
    alignSelf: 'flex-start', 
    fontStyle: 'italic', 
    marginTop: 30, 
    marginLeft: 30, 
    fontSize: 18 
  },
  body: {
    // backgroundColor: Colors.white,
    // alignItems: "center", 
    justifyContent: "center",
  },
  itemStyle: { 
    marginTop: 30, 
    marginLeft: 30, 
    marginRight: 30 
  },
  
 
});

export default App;
