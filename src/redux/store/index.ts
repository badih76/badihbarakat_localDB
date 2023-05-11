import { createStore, combineReducers } from 'redux';
import reducer from './reducer';

// const rootReducer = combineReducers({ 
//     cake: cakeReducer, 
//     iceCream: iceCreamReducer});
const store = createStore(reducer);

export default store;