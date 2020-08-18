import {doSignout} from '../service/apiService'
import { getFetchProfile } from '../service/apiServiceWithToken'


export const doLogout = () => {

    return doSignout(token).then(function (response) {
        console.log("RESPONSE for doSignOut: ", JSON.stringify(response));
        return response;
    }, function (err) {
            console.log(' error doLogout ', err)
    }).catch(function (err) {
        console.log('catch error doLogout', err)
    });
}

export const fetchProfile = (token, data) => {
    // dispatch(showLoader(true));
    return getFetchProfile(token, data).then(function (response) {
        console.log("RESPONSE getFetchProfile: ", JSON.stringify(response));
        // dispatch(showLoader(false));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}