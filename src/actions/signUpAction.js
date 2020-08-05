
import { getCountriesList, getSignUp, getFbSignUp } from '../service/apiService'

export const showLoader = (loader) => {
    return {
        type: 'SHOW_SIGN_UP_LOADER',
        payload: { loader }
    }
};


export const registerNewUser = (dispatch, data) => {
    dispatch(showLoader(true));
    return getSignUp(dispatch, data).then(function (response) {
        console.log("RESPONSE getSignUp: ", JSON.stringify(response));
        dispatch(showLoader(false));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}

export const fbSignup = (dispatch, data) => {
    dispatch(showLoader(true));
    return getFbSignUp(dispatch, data).then(function (response) {
        console.log("RESPONSE fbSignup: ", JSON.stringify(response));
        dispatch(showLoader(false));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}
