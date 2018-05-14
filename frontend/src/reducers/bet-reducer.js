import {PUT_BET} from '../actions/match-list-actions';

export default function matchReducer(state = '', {type, payload}) {
    switch (type) {
        case PUT_BET:
            return payload.bet;
        default:
            return state;
    }
}

