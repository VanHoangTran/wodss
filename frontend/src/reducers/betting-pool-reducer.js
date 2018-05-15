import { LOAD_BETTING_POOLS } from '../actions/betting-pool-actions';

const initialState = {
    pools: []
}

export default function betReducer(state = initialState, {type, payload}) {
    switch (type) {
        case LOAD_BETTING_POOLS:
            return Object.assign({}, state, {
                pools: [...payload.pools]
            })
        default:
            return state;
    }
}

