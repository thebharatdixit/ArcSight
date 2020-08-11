import {doSignout} from '../service/apiService'

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