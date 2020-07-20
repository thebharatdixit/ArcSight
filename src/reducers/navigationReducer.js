import store from '../store/configureStore';


const initialState = {
    count: 0,
    badge: 0,
};
//            return { ...state, nic: action.payload.nic, thc: action.payload.thc, cbd: action.payload.cbd }

export function navigation(state = initialState, action) {
    switch (action.type) {
        case 'COUNT_CHANGE':
            return { ...state, count: action.payload.count }
        case 'BADGE_CHANGE':
            return { ...state, badge: action.payload.badge }
        default:
            return state;

    }

}

