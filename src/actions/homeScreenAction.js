
import { getTerminalServingTypes , getPriceRangeCurrency } from '../service/apiService'



export const getTerminalServingType = (dispatch, data) => {
    return getTerminalServingTypes(dispatch, data).then(function (response) {
        console.log("RESPONSE for getTerminalServingTypes: ", JSON.stringify(response));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}

export const getPriceRangeCurrencyType = (dispatch, data) => {
    return getPriceRangeCurrency(dispatch, data).then(function (response) {
        console.log("RESPONSE for getPriceRangeCurrency: ", JSON.stringify(response));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}

