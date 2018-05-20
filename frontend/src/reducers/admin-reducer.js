import {GET_TEAMS} from "../actions/admin-actions";

const initialState = {
    teams: [],
};

export default function adminReducer(state = initialState, {type, payload}) {
    switch (type) {
        case GET_TEAMS:
            return Object.assign({}, state, {
                teams: payload.teams,
            });
        default:
            return state;
    }
}

