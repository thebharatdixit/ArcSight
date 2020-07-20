import { SELECTION, TAB_TYPE} from '../constants/index'

export const setCurrentTab = (tab) => {
    return {
        type: SELECTION, payload: { selected: tab }
    }

}

export const tabType = (value, status, nic, cbd, thc) => {
    console.log('TAB SELECTED : ' + value);
    return {
        type: TAB_TYPE, payload: { tab: value }
    }
}


