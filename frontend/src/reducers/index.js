import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux'
import productsReducer from './product-reducer';
import userReducer from './user-reducer';

// combine all reducers into a single object
const allReducers = combineReducers({
    products: productsReducer,
    user: userReducer,
    router: routerReducer
});

export default allReducers