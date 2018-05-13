import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import productsReducer from './product-reducer';
import userReducer from './user-reducer';
import registrationReducer from "./registration-reducer";
import matchListReducer from './match-reducer'

// combine all reducers into a single object
const allReducers = combineReducers({
    products: productsReducer,
    user: userReducer,
    registration: registrationReducer,
    router: routerReducer,
    matchList: matchListReducer
});

export default allReducers