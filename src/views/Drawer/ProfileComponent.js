import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ListView, Image } from 'react-native'
import { Icon } from 'native-base';
// import strings from "../../lang/strings";


const ProfileComponent = ({ profileUrl, username, email }) =>
	<View style={{ flexDirection: 'row', padding: 1 }}>
		<Image source={{ uri: profileUrl }} resizeMode="contain" style={{ margin: 2, width: 60, height: 60, borderRadius: 30 }} />
		<View style={{ justifyContent: 'flex-start', marginTop: 2 }}>
			<Text style={{ fontWeight: '400', fontSize: 25, color: '#22386F' }}>{username}</Text>
			<Text style={{ fontWeight: '200', color: '#525252' }}>{email}</Text>
			{/* <Text style={{ fontWeight: '200', color: '#CBD5EF' }}>{strings.deviceName + ' : ' + nameOfQuinta}</Text> */}

		</View>
	</View>



export default ProfileComponent
