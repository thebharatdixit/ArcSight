import { getCreateList } from '../service/apiService'

export const showLoader = (loader) => {
    return {
        type: 'SHOW_LOGIN_LOADER',
        payload: { loader }
    }
};


export const createList = ( formData) => {
    //dispatch(showLoader(true));
    return getCreateList( formData).then(function (response) {
        console.log("RESPONSE createList: ", JSON.stringify(response));
        
        //dispatch(showLoader(false));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}





