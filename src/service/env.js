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
            FORGOT_PASSWORD: { url: 'Traveller/forgotPassword', method: 'POST' },
            VERIFY_OTP: { url: 'Traveller/verifyOTP', method: 'POST' },
            RESET_PASSWORD: { url: 'Traveller/resetTravellerPassword', method: 'POST' },
            LOGOUT: { url: 'api/v1/logout', method: 'POST' },
        },
        PASSWORD: {
            CHANGE_PASSWORD: { url: 'Traveller/changePassword', method: 'POST' },
        },
        AIRPORT: {
            AIRPORT_LIST: { url: 'Traveller/airportList', method: 'POST' },
            NEAREST_AIRPORT: { url: 'Traveller/nearestAirportAccordingToLatAndLong', method: 'POST' },
            SAVED_AIRPORT: { url: 'Traveller/useAirportListByTraveller', method: 'POST' },
            AIRPORT_TERMINALS: { url: 'Traveller/airportTerminal', method: 'POST' },
            TRAVEL_TYPE: { url: 'Traveller/travelTypeList', method: 'POST' },
            SAVEFCMTOKEN: { url: 'Traveller/saveFCMTokenAndDeviceId', method: 'POST' },
        },
        OFFERS: {
            ALL_OFFERS: { url: 'Traveller/vendorOutletOffers', method: 'POST' },
        },
        WALLET: {
            PAST_ACTIVE: { url: 'Traveller/amountAssignToUserWallet', method: 'POST' },
            USER_WALLET: { url: 'Traveller/amountAssignToUserWalletThatAirport', method: 'POST' },
            WALLET_AMOUNT: { url: 'Traveller/remainingAmountToUserWalletThatAirport', method: 'POST' },
            TRANSACTION_HISTORY: { url: 'Traveller/walletTransactionHistory', method: 'POST' },
        },
        PROFILE: {
            PROFILE_DETAILS: { url: 'Traveller/profileDetail', method: 'POST' },
            UPLOAD_PROFILEIMG: { url: 'Traveller/updateProfileImage', method: 'POST' },
            EDIT_PROFILE: { url: 'Traveller/profileUpdate', method: 'POST' },

        },

        HOMESCREEN: {
            TERMINAL_SERVING_TYPE: { url: 'Traveller/servingTypeByTravelType', method: 'POST' },
            CURRENCY_NAME : { url: 'Traveller/priceRangeCurrency', method: 'POST' },
            SPECIAL_FOOD_TYPE: { url: 'Traveller/specialFoodType', method: 'POST' },
            NOTIFICATION_LIST: { url: 'Traveller/notificatinList', method: 'POST' },
            HOME_DATA: { url: 'Traveller/Home', method: 'POST' },

        },

        SITES_DETAIL: {
            SITE: { url: '/api/sites/', method: 'GET' }
        },
        CUISINE: {
            CUISINE_LIST: { url: 'Traveller/cuisinesList', method: 'POST' },
            SEARCH_OUTLET_ITEMS: { url: 'Traveller/outletAndItemList', method: 'POST' },

        },
        OUTLETS: {
            OUTLETS_LIST_BY_CUSINE: { url: 'Traveller/outletListByDish', method: 'POST' },
            OUTLETS_LIST: { url: 'Traveller/outletListWithCuisines', method: 'POST' },
            OUTLETS_ITEMS: { url: 'Traveller/outletItems', method: 'POST' },
            CHECK_OUTLETS_AVAILABILITY: { url: 'Traveller/checkOutletAvailability', method: 'POST' },
            SAVE_CARTDATA: { url: 'Traveller/saveCartData', method: 'POST' },
            GET_CARTDATA: { url: 'Traveller/cartDataList', method: 'POST' },
            COUPONS_LIST: { url: 'Traveller/babPromotionList', method: 'POST' },
            DELIVERY_METHODS: { url: 'Traveller/deliveryMethod', method: 'POST' },
        },
        RATING: {
            RATING_FEEDBACK: { url: 'Traveller/ratingAndFeedback', method: 'POST' },
        },
        ORDER: {
            RESEND_ORDER_OTP: { url: 'Traveller/resendOrderOTP', method: 'POST' },
            PLACE_ORDER: { url: 'Traveller/placeOrder', method: 'POST' },
            ORDER_DATA: { url: 'Traveller/userPastAndUpcomingOrderDetails', method: 'POST' },
            RESEND_OTP: { url: 'Traveller/resendOrderOTP', method: 'POST' },
            RATEANDFEEDBACK: { url: 'Traveller/ratingAndFeedback', method: 'POST' },
            RATEANDFEEDBACKLIST: { url: 'Traveller/outletUserFeedback', method: 'POST' },
            VIEW_RECEIPT: { url: 'Traveller/viewReceipt', method: 'POST' },
            ORDER_SUMMARY: { url: 'Traveller/orderSummaryDetails', method: 'POST' },

        },
        VERIFY: {
            GENERATE_OTP_NUMBER: { url: 'Traveller/generateOTPToMobileNumber', method: 'POST' },
            GENERATE_OTP_EMAIL: { url: 'Traveller/generateOTPToEmailId', method: 'POST' },
            VERIFY_NUMBER: { url: 'Traveller/verifyMobileNumber', method: 'POST' },
            VERIFY_EMAIL: { url: 'Traveller/verifyEmailId', method: 'POST' },

        },
        ORDER_QUEUE: {
            ORDER_LIST: { url: 'Outlet/orderList', method: 'POST' },
            VERIFY_ORDER: { url: 'Outlet/verifyOrder', method: 'POST' },
            CONFIRM_ORDER: { url: 'Outlet/confirmOrderDelivery', method: 'POST' },
            DELAYED_COMPANSATION: { url: 'Outlet/travelerScanBoardingPassCheckDelayedCompenstation', method: 'POST' },
            PLACE_ORDER: { url: 'Outlet/placeOrder', method: 'POST' },
        },

    },

};
export default Object.assign({}, API);