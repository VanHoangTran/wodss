import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import userReducer from './user-reducer';
import registrationReducer from "./registration-reducer";
import matchListReducer from './match-reducer'
import betReducer from './bet-reducer'
import recoveryReducer from "./recovery-reducer";
import passwordChangeReducer from "./password-change-reducer";
import bettingPoolReducer from "./betting-pool-reducer";
import adminReducer from "./admin-reducer";

// combine all reducers into a single object
const allReducers = combineReducers({
    user: userReducer,
    registration: registrationReducer,
    router: routerReducer,
    matchList: matchListReducer,
    betStore: betReducer,
    recovery: recoveryReducer,
    passwordChange: passwordChangeReducer,
    poolStore: bettingPoolReducer,
    admin: adminReducer,
});

export default allReducers