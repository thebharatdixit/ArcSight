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

export function getFetchProfile(token, data, option = {}) {
    let { url, method } = API.ENDPOINT.PROFILE.FETCH_PROFILE;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(token, URL, option)
}

export function doSignout(token, option = {}) {
    let { url, method, } = API.ENDPOINT.AUTH.LOGOUT;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(token, URL, option)
}

export function getSearchApi(token, data, option = {}) {
    let { url, method } = API.ENDPOINT.SEARCH.SEARCH_DATA;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(token, URL, option)
}





