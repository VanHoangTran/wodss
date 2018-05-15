import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import productsReducer from './product-reducer';
import userReducer from './user-reducer';
import registrationReducer from "./registration-reducer";
import matchListReducer from './match-reducer'
import betReducer from './bet-reducer'
import recoveryReducer from "./recovery-reducer";

// combine all reducers into a single object
const allReducers = combineReducers({
    products: productsReducer,
    user: userReducer,
    registration: registrationReducer,
    router: routerReducer,
    matchList: matchListReducer,
    betStore: betReducer,
    recovery: recoveryReducer
});

export default allReducers