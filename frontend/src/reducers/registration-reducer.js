import {UPDATE_REGISTRATION} from "../actions/registration-actions";

export default function registrationReducer(state = '', {type, payload}) {
    switch (type) {
        case UPDATE_REGISTRATION:
            return payload.registration;
        default:
            return state;
    }
}

