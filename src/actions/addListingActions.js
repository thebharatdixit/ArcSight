import { getFetchAminities } from '../service/apiService'


export const fetchAminities = () => {
    // dispatch(showLoader(true));
    return getFetchAminities().then(function (response) {
        console.log("RESPONSE getFetchAminities: ", JSON.stringify(response));
        // dispatch(showLoader(false));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}







