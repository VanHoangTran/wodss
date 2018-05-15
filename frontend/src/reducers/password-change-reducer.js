import {UPDATE_PASSWORD} from '../actions/password-change-actions';

export default function userReducer(state = '', {type, payload}) {
    switch (type) {
        case UPDATE_PASSWORD:
            return payload.passwordChange;
        default:
            return state;
    }
}