import { LOAD_BETTING_POOLS, DELETE_BETTING_POOL, CREATE_BETTING_POOL } from '../actions/betting-pool-actions';

const initialState = {
    pools: [],
    action: null
}

export default function bettingPoolReducer(state = initialState, {type, payload}) {
    switch (type) {
        case LOAD_BETTING_POOLS:
            return Object.assign({}, state, {
                pools: [...payload.pools],
                action: null
            })
        case DELETE_BETTING_POOL:
            return Object.assign({}, state, {
                action: 'reload'
            })
        case CREATE_BETTING_POOL: 
            return Object.assign({}, state, {
                action: 'reload'
            })
        default:
            return state;
    }
}

