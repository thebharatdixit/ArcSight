import React from 'react';
import { Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 28.5838, lng: 77.3597 } },
};
const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 28.628454, lng: 77.376945 } },
};

const GooglePlacesInput = () => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            currentLocation={true}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: 'AIzaSyDx8L9iRu5yyvqdw6pvPFUOdgdUjOq6S2k',
                language: 'en',
            }}
            // predefinedPlaces={[homePlace, workPlace]}
        />
    );
};

export default GooglePlacesInput;