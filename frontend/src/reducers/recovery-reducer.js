import {UPDATE_RECOVERY} from "../actions/recovery-actions";

export default function registrationReducer(state = '', {type, payload}) {
    switch (type) {
        case UPDATE_RECOVERY:
            return payload.recovery;
        default:
            return state;
    }
}
