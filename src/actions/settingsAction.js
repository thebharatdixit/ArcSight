import { getProfileDetails } from '../service/apiService'



export const getProfileDetail = (dispatch, data) => {
    return getProfileDetails(dispatch, data).then(function (response) {
        console.log("RESPONSE for getProfileDetails: ", JSON.stringify(response));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}