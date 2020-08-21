let API = {
    ENDPOINT: {
        // BASE: 'https://edctestapi.klientotech.com',
        // BASE: 'https://projects.klientotech.com:9002/staging72/bookabite_new/api/',
       // BASE: 'https://cloud.klientotech.com:9002/staging72/bookabite_staging/api/',
          BASE: "http://arc.softwaresolutions.website/",
        AUTH: {
            LOGIN: { url: 'api/v1/login', method: 'POST' },
            SIGN_UP: { url: 'api/v1/signup', method: 'POST' },
            CREATE_LIST: { url: 'api/v1/create-listing', method: 'POST' },
            FB_SIGNUP: { url: 'Traveller/facebookSignUpLogin', method: 'POST' },
            COUNTRY_LIST: { url: 'Traveller/countryList', method: 'GET' },
            FORGOT_PASSWORD: { url: 'api/v1/forgot-password', method: 'POST' },
            VERIFY_OTP: { url: 'Traveller/verifyOTP', method: 'POST' },
            RESET_PASSWORD: { url: 'Traveller/resetTravellerPassword', method: 'POST' },
            LOGOUT: { url: 'api/v1/logout', method: 'GET' },
        },
        PASSWORD: {
            CHANGE_PASSWORD: { url: 'Traveller/changePassword', method: 'POST' },
        },
        CHAT: {
            FETCH_CHAT: { url: 'api/v1/fetch-chat', method: 'POST' },
            SEND_CHAT: { url: 'api/v1/send-message', method: 'POST' }
        },
        PROFILE: {
            FETCH_PROFILE: { url: 'api/v1/user/profile', method: 'POST' },
        },
        ADD_LISTINGS: {
            FETCH_AMINITIES: { url: 'api/v1/amenities', method: 'GET' },
        },
        

        SITES_DETAIL: {
            SITE: { url: '/api/sites/', method: 'GET' }
        },
        

    },

};
export default Object.assign({}, API);