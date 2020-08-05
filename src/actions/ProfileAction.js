import {doSignout} from '../service/apiService'

export const doLogout = (data) => {
    return doSignout(dispatch, data).then(function (response) {
        console.log("RESPONSE for doSignOut: ", JSON.stringify(response));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}