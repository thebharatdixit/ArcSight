export const changeProStatus = (isPro) => {

    return {
        type: 'PRO_USER',
        payload: { proUser: isPro }
    }
};

export const changeCounter = (value) => {

    return {
        type: 'COUNTER_CHANGE',
        payload: { counter: value }
    }
};





