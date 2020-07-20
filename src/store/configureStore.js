import { createStore, applyMiddleware } from 'redux';
import reducer from './../reducers';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const configureStore = ()=> {
    let store = createStore(reducer,applyMiddleware(thunkMiddleware, logger));
    return store;
}

const store = configureStore();

export default store;