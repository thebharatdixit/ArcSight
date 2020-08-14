import API from './env'
const API_BASE = API.ENDPOINT.BASE;
import store from '../store/configureStore';
import { storeData, getData, clearData } from '../utils/asyncStore';

async function requestAPI(token, url, options = {}) {

    let headers = options.headers || {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    };

    let reqBody = {
        method: options.method || "POST",
        headers: headers
    };

    if (options.method.toLowerCase() !== 'get') {
        if (options.headers) {
            reqBody['body'] = options.payload
        }
        else {
            reqBody['body'] = JSON.stringify(options.payload || {})
        }
    }
    console.log('url: ', url);
    console.log('req Body: ', reqBody);
  //  console.log('PAYLOAD :', JSON.stringify(options));

    return fetch(url, reqBody)
        .then(function (resp) {
           
            return resp.json();

        })
        .catch(function (err) {
            console.log('Error:', JSON.stringify(err));
            
        })
}


async function requestGetAPI(url, token ,options = {}) {

    getData('userData').then((data) => {
        const userData = JSON.parse(data);
        //  tokens = userData.token;
        token = userData.token;
        console.log('doLogoutuserDataProfileAction:', token)
    })
    console.log('accessToken requestGetAPI12', token)
    console.log("RESPONSE for doSignOut: ", JSON.stringify(token));
    

    let headers = options.headers || {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        // 'Authorization': 'Bearer '.concat(token),
        'Authorization': 'Bearer ' + token,
        // 'X-localization': 'en'
    };
    console.log("RESPONSE for requestGetAPI12 headers: ", JSON.stringify(headers));
    let reqBody = {
        method: options.method || "GET",
        headers: headers,
    };
    console.log("RESPONSE for requestGetAPI12 body: ", JSON.stringify(headers));
    if (options.method.toLowerCase() !== 'get') {
        if (options.headers) {
            reqBody['body'] = options.payload
        }
        else {
            reqBody['body'] = JSON.stringify(options.payload || {})
        }
    }
    console.log('url requestGetAPI: ', url);
    console.log('req Body requestGetAPI: ', reqBody);
    //  console.log('PAYLOAD :', JSON.stringify(options));

    return fetch(url, reqBody)
        .then(function (resp) {
            return resp.json();
        })
        .catch(function (err) {
            console.log('Error requestGetAPI:', JSON.stringify(err));
        })
}

export function getFetchChat(token, data, option = {}) {
    let { url, method } = API.ENDPOINT.CHAT.FETCH_CHAT;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(token, URL, option)
}

export function getSendChat(token, data, option = {}) {
    let { url, method } = API.ENDPOINT.CHAT.SEND_CHAT;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(token, URL, option)
}



