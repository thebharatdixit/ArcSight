import {makeForgotPassword } from '../service/apiService'

export const showLoader = (loader) => {
    return {
        type: 'SHOW_LOADER',
        payload: { loader }
    }
};


export const forgotPassword = (data) => {
    // dispatch(showLoader(true));
    return makeForgotPassword(data).then(function (response) {
        console.log("RESPONSE forgotPassword: ", JSON.stringify(response));
        // dispatch(showLoader(false));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}