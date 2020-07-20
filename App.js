/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navigate from './src/common/navigation';
import store from './src/store/configureStore'


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigate />
      </Provider>
    );
  }
}
