import { getFetchChat, getSendChat } from '../service/apiServiceWithToken'

export const showLoader = (loader) => {
    return {
        type: 'SHOW_LOGIN_LOADER',
        payload: { loader }
    }
};


export const fetchChat = (token, data) => {
    // dispatch(showLoader(true));
    return getFetchChat(token, data).then(function (response) {
        console.log("RESPONSE getFetchChat: ", JSON.stringify(response));
        // dispatch(showLoader(false));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}

export const sendChat = (token, data) => {
    // dispatch(showLoader(true));
    return getSendChat(token, data).then(function (response) {
        console.log("RESPONSE getSendChat: ", JSON.stringify(response));
        // dispatch(showLoader(false));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}





