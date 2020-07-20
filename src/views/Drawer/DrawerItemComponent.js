import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  ListView,
  Image,
  StyleSheet
} from 'react-native';
import { Icon } from 'native-base';
import { getDimen } from '../../dimensions/dimen';


const DrawerItem = ({ navigation, icon, name, screenName }) =>
  <TouchableOpacity
    style={styles.menuItem}
    onPress={() =>
      navigation.navigate(`${screenName}`, { isStatusBarHidden: false })}
  >
    <Icon name={icon} size={getDimen(.085)} color="#5C5C5C" style={{ margin: getDimen(.045), fontSize: getDimen(.065) }} />
    <Text style={styles.menuItemText}>{name}</Text>
  </TouchableOpacity>


const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row'
  },
  menuItemText: {
    fontSize: getDimen(.045),
    fontWeight: '300',
    margin: getDimen(.045),
    color: '#5C5C5C',
  }
})

export default DrawerItem
