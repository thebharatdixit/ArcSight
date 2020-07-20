import API from './env'
const API_BASE = API.ENDPOINT.BASE;
import store from '../store/configureStore';
import { storeData, getData, clearData } from '../utils/asyncStore';


async function requestAPI(url, options = {}, dispatch) {

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
            // if (resp) {
            //     if (resp.status === 401) {
            //         apiCallParams.onUnAuthenticated();
            //     } else if (resp.status === 200) {
            //         apiCallParams.onSuccess(resp);
            //     } else if (resp.status === 403) {
            //         apiCallParams.onUnauthorized("Sorry you are not authorised to view this page. Please login again.");
            //     } else {
            //         apiCallParams.onError(AXIOS_ERROR_WITH_RESPONSE, resp.status);
            //     }
            // }



            return resp.json();

        })
        .catch(function (err) {
            console.log('Error:', JSON.stringify(err));
            // The following code is mostly copy/pasted from axios documentation at https://github.com/axios/axios#handling-errors
            // Added support for handling timeout errors separately, dont use this code in production
            // if (err.response) {
            //     // The request was made and the server responded with a status code
            //     // that falls out of the range of 2xx
            //     if (err.response.status === 401) {
            //         apiCallParams.onUnAuthenticated();
            //     }
            //     else if (err.response.status === 403) {
            //         //message.info('You are not authorised to view this page. Please login again.');
            //         apiCallParams.onUnauthorized("Sorry you are not authorised to view this page. Please login again.");
            //     }
            //     else {
            //         apiCallParams.onError(AXIOS_ERROR_WITH_RESPONSE, error.response.status);
            //     }
            // }
            // else if (err.code) {
            //     console.lg(err.code)
            //     // This is a timeout error
            //     if (err.code === 'ECONNABORTED') {
            //         apiCallParams.onTimeout();
            //     }
            //     else {
            //         apiCallParams.onError(AXIOS_ERROR_OTHER_ERROR);
            //     }
            // }
            // else if (err.request) {
            //     // The request was made but no response was received
            //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //     // http.ClientRequest in node.js
            //     apiCallParams.onError(AXIOS_ERROR_NO_RESPONSE);
            // }
            // else {
            //     // Something happened in setting up the request that triggered an Error
            //     apiCallParams.onError(AXIOS_ERROR_INTERNAL);
            // }
        })
}


export function getLogin(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.LOGIN;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function makeForgotPassword(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.FORGOT_PASSWORD;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
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


export function getSignUp(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.SIGN_UP;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getFbSignUp(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.FB_SIGNUP;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getCountriesList(dispatch, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.COUNTRY_LIST;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL, option, dispatch)
}

export function getAirportsList(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AIRPORT.AIRPORT_LIST;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getNearestAirport(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AIRPORT.NEAREST_AIRPORT;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getSavedAirports(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AIRPORT.SAVED_AIRPORT;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getTerminals(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AIRPORT.AIRPORT_TERMINALS;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getTravelTypes(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AIRPORT.TRAVEL_TYPE;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function verifyOtp(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.VERIFY_OTP;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getAllOffers(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.OFFERS.ALL_OFFERS;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getTerminalServingTypes(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.HOMESCREEN.TERMINAL_SERVING_TYPE;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getPriceRangeCurrency(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.HOMESCREEN.CURRENCY_NAME;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getSpecialFoodTypes(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.HOMESCREEN.SPECIAL_FOOD_TYPE;
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


export function getCuisinesList(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.CUISINE.CUISINE_LIST;
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


export function doSignout(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.AUTH.LOGOUT;
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



export function getOutletList(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.OUTLETS.OUTLETS_LIST;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}
export function getOutletFromCusine(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.OUTLETS.OUTLETS_LIST_BY_CUSINE;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getOutletItems(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.OUTLETS.OUTLETS_ITEMS;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}



export function checkOutletAvailability(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.OUTLETS.CHECK_OUTLETS_AVAILABILITY;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function saveCartData(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.OUTLETS.SAVE_CARTDATA;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}



export function getcartDataList(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.OUTLETS.GET_CARTDATA;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getDeliveryMethods(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.OUTLETS.DELIVERY_METHODS;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getBabCouponsList(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.OUTLETS.COUPONS_LIST;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function ratingAndFeedback(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.RATING.RATING_FEEDBACK;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}



export function resendOrderOtp(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER.RESEND_ORDER_OTP;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function placeOrderApi(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER.PLACE_ORDER;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getOrderData(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER.ORDER_DATA;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getResendOtp(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER.RESEND_OTP;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function doRateAndFeedback(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER.RATEANDFEEDBACK;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function doRateAndFeedbackList(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER.RATEANDFEEDBACKLIST;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function generateOtpToNumber(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.VERIFY.GENERATE_OTP_NUMBER;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}
export function generateOtpToEmail(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.VERIFY.GENERATE_OTP_EMAIL;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}
export function verifyNumber(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.VERIFY.VERIFY_NUMBER;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}
export function verifyEmail(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.VERIFY.VERIFY_EMAIL;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getViewReceipt(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER.VIEW_RECEIPT;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getOrderSumaaryData(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER.ORDER_SUMMARY;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getWalletList(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.WALLET.PAST_ACTIVE;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getWalletListForUser(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.WALLET.USER_WALLET;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getWalletAmount(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.WALLET.WALLET_AMOUNT;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getTransactionHistory(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.WALLET.TRANSACTION_HISTORY;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getOrderQueueList(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER_QUEUE.ORDER_LIST;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}

export function getVerifyOrders(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER_QUEUE.VERIFY_ORDER;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getDelieveryConfirmation(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER_QUEUE.CONFIRM_ORDER;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getDelayedCompansationAmount(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER_QUEUE.DELAYED_COMPANSATION;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}


export function getPlaceOrderForBoardingPass(dispatch, data, option = {}) {
    let { url, method } = API.ENDPOINT.ORDER_QUEUE.PLACE_ORDER;
    let URL = `${API_BASE + url}`;
    option.method = method;
    option.payload = data;
    return requestAPI(URL, option, dispatch)
}



