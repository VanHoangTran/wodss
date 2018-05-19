import { LOAD_BETTING_POOLS, DELETE_BETTING_POOL, CREATE_BETTING_POOL } from '../actions/betting-pool-actions';

const initialState = {
    pools: []
}

export default function bettingPoolReducer(state = initialState, {type, payload}) {
    switch (type) {
        case LOAD_BETTING_POOLS:
            debugger;
            return Object.assign({}, state, {
                pools: [...payload.pools]
            })
        case DELETE_BETTING_POOL:
            let currentList = [...state.pools];
            let toDeleteIndex = currentList.findIndex(i => i.name === payload.name);
            currentList.pop(toDeleteIndex);
            return Object.assign({}, state, {
                pools: currentList
            })
        default:
            return state;
    }
}

