import { UPDATE_CREDENTIALS, SHOW_ERROR} from '../actions/user-actions';

export default function userReducer(state = '', {type, payload}) {
    switch (type) {
        case UPDATE_CREDENTIALS:
            return payload.user;
        case SHOW_ERROR:
            return payload.user;
        default:
            return state;
    }
}

