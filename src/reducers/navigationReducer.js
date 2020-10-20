import store from '../store/configureStore';


const initialState = {
    count: 0,
    badge: 0,
    proUser: false,
    counter: 0,
};
//            return { ...state, nic: action.payload.nic, thc: action.payload.thc, cbd: action.payload.cbd }

export function navigation(state = initialState, action) {
    console.log()
    switch (action.type) {
        case 'COUNT_CHANGE':
            return { ...state, count: action.payload.count }
        case 'BADGE_CHANGE':
            return { ...state, badge: action.payload.badge }
        case 'COUNTER_CHANGE':
            return { ...state, counter: action.payload.counter }
        case 'PRO_USER':
            return { ...state, proUser: action.payload.proUser }
        default:
            return state;

    }

}

