import { createStore , applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import reducer from './reducer';

const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunkMiddleWare)));

export default store;