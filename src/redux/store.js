import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cart';
import { currencyReducer } from './reducers/currency';

const reducers = combineReducers({
    cart: cartReducer,
    currency: currencyReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;