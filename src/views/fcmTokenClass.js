/** Firebase Cloud Messaging Methods */
import { firebase } from '@react-native-firebase/messaging';

const getToken = async () => {
    try {
        const token = await firebase.messaging().getToken();
        if (token) return token;
    } catch (error) {
        console.log(error);
    }
};

const getFCMToken = async () => {
    try {
        const authorized = await firebase.messaging().hasPermission();
       console.log('has permission');
        const fcmToken = await getToken();
       console.log('getting token ' + fcmToken);
        //var token = fcmToken + '';
        if (authorized) {
           console.log('Authorized ' + JSON.stringify(fcmToken));
            return fcmToken;
        }
       console.log('Requesting permission ' + fcmToken);

        await firebase.messaging().requestPermission();
        return fcmToken;
    } catch (error) {
        console.log(error);
    }
};

export { getFCMToken };