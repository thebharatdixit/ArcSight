import store from '../store/configureStore';


const initialState = {
  selected: 0,
  tab: "",
  icon: 'menu',
  headerName: 'Home'

};
//            return { ...state, nic: action.payload.nic, thc: action.payload.thc, cbd: action.payload.cbd }

export function setCurrentTab(state = initialState, action) {
  switch (action.type) {
    case 'SELECTION':
   //   console.log('SELECTION Reducer Called.')
      var name = 'Home';
      if (action.payload.selected === 0)
        name = 'Home'
      else if (action.payload.selected === 1)
        name = 'Search'
      else if (action.payload.selected === 2)
        name = 'Offers'
      else if (action.payload.selected === 3)
        name = 'My Orders'
        else if (action.payload.selected === 4)
        name = 'Profile'

      return { ...state, selected: action.payload.selected, icon: 'menu', headerName: name }
    case 'ICON':
  //    console.log('SELECTION Reducer Called.')
      if (action.payload.name !== undefined)
        return { ...state, icon: action.payload.icon, headerName: action.payload.name }
      else
        return { ...state, icon: action.payload.icon }

    default:
      return state;

  }

}

