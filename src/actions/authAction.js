

export const changeAuthState = (isLoggedIn) => {
    if (isLoggedIn)
        console.log("inside action true")
    else
        console.log("inside action false")

    return {
        type: 'LOG_IN',
        payload: { isLoggedIn }
    }
};

export const changeProtocolState = (protocol) => {
    return {
        type: 'PROTOCOL',
        payload: { protocol }
    }
};

export const changeToLogoutState = ({ isLoggedIn, protocol }) => {
    return {
        type: 'LOGOUT_STATE',
        payload: { isLoggedIn, protocol }
    }
};








