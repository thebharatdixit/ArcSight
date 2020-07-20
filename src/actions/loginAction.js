import { getLogin } from '../service/apiService'

export const showLoader = (loader) => {
    return {
        type: 'SHOW_LOGIN_LOADER',
        payload: { loader }
    }
};


export const login = (dispatch, data) => {
    dispatch(showLoader(true));
    return getLogin(dispatch, data).then(function (response) {
        console.log("RESPONSE : ", JSON.stringify(response));
        dispatch(showLoader(false));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}





