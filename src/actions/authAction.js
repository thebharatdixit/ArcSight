export const changeAuthState = (isLoggedIn) => {
    if (isLoggedIn || isLoggedIn.isLoggedIn)
        console.log("inside action true")
    else
        console.log("inside action false")

    return {
        type: 'LOG_IN',
        payload: {"isLoggedIn":isLoggedIn}
    }
};








