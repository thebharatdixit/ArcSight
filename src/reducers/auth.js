
const initialState = {
    isLoggedIn: false,
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