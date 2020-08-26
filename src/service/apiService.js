import API from './env'
const API_BASE = API.ENDPOINT.BASE;
import store from '../store/configureStore';
import { storeData, getData, clearData } from '../utils/asyncStore';

async function requestAPI(url, options = {}) {

    let headers = options.headers || {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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


export function getLogin( data, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.LOGIN;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option)
}

export function makeForgotPassword(data, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.FORGOT_PASSWORD;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option)
}

export function makeResetPassword(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.RESET_PASSWORD;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function makeChangePassword(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.PASSWORD.CHANGE_PASSWORD;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getSignUp(data, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.SIGN_UP;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option)
}

export function getFbSignUp(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.FB_SIGNUP;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getHomePageData(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.HOMESCREEN.HOME_DATA;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getFetchBannerUrl( option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.BANNER;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL, option)
}


export function getSearchData(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.CUISINE.SEARCH_OUTLET_ITEMS;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}
export function getProfileDetails(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.PROFILE.PROFILE_DETAILS;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function updateProfile(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.PROFILE.EDIT_PROFILE;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}



export function getSearchItems(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.CUISINE.SEARCH_OUTLET_ITEMS;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getNotificationsList(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.HOMESCREEN.NOTIFICATION_LIST;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}






export function doSaveFCMTokenAndDeviceId(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AIRPORT.SAVEFCMTOKEN;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getFetchAminities( option = {}) {
    let { url, method, } = API.ENDPOINT.ADD_LISTINGS.FETCH_AMINITIES;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL, option)
}




