import {createStore, applyMiddleware, compose} from 'redux';
import {orderReducer} from '../Reducers/orderReducer';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(orderReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;