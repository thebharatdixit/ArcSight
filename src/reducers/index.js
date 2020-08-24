import { combineReducers } from 'redux'
// import { event } from './event';
import { splashFunction } from './splashReducer';
import { setCurrentTab } from './homeReducer';
import { navigation } from './navigationReducer';
import { auth } from './auth';

const rootReducer = combineReducers({
  splash: splashFunction,
  home: setCurrentTab,
  navigation,
  auth
})

export default rootReducer;