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








