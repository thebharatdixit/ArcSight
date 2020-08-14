/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */



import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from './src/common/navigation';
import { Provider } from 'react-redux';
import store from './src/store/configureStore';
import SplashScreen from 'react-native-splash-screen'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import DrawerNavigator from './src/common/DrawerNavigator'

function App() {

  useEffect(() =>{
    SplashScreen.hide();
}, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
        
          <Navigator />

          {/* <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>

  );
}
export default App;
