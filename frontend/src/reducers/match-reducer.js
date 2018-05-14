import {UPDATE_MATCH_LIST} from '../actions/match-list-actions';

export default function matchReducer(state = '', {type, payload}) {
    switch (type) {
        case UPDATE_MATCH_LIST:
            return payload.list;
        default:
            return state;
    }
}

