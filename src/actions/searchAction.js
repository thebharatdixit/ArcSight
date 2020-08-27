import { getSearchApi } from '../service/apiServiceWithToken'

export const searchApi = (token, data) => {
    // dispatch(showLoader(true));
    return getSearchApi(token, data).then(function (response) {
        console.log("RESPONSE getSearchApi: ", JSON.stringify(response));
        // dispatch(showLoader(false));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}

