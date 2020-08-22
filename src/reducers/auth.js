
const initialState = {
    isLoggedIn: {"isLoggedIn": undefined},
};

export function auth(state = initialState, action) {
    switch (action.type) {
        case "LOG_IN": {
            let isLoggedIn = action.payload;
            return { ...state, isLoggedIn }
        }
        default:
            return state;
    }
}