import {GET_TEAMS, PUT_GAME} from "../actions/admin-actions";

const initialState = {
    teams: [],
    game: null,
};

export default function adminReducer(state = initialState, {type, payload}) {
    switch (type) {
        case GET_TEAMS:
            return Object.assign({}, state, {
                teams: payload.teams,
            });
        case PUT_GAME:
            return Object.assign({}, state, {
                game: payload.game,
            });
        default:
            return state;
    }
}

