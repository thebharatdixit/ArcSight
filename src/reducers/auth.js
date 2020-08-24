
const initialState = {
    isLoggedIn: undefined,
};

export function auth(state = initialState, action) {
    switch (action.type) {
        case "LOG_IN": {
            let isLoggedIn = action.payload.isLoggedIn;
            console.log("LOG_IN : " + JSON.stringify(isLoggedIn))
            return { ...state, isLoggedIn }
        }
        default:
            return state;
    }
}