import $ from 'jquery';
import {API_AUTH_ACTION, API_ENDPOINT} from '../util/constants';

export const UPDATE_USER = 'user:updateUser';

export function updateUser(username, authenticated, token) {
    return {
        type: UPDATE_USER,
        payload: {
            user: {
                username: username,
                authenticationState: {
                    authenticated: authenticated,
                    token: token
                }
            }
        }
    }
}

// performs authorization against api
export function apiAuthenticate(username, password) {
    return dispatch => {
        $.ajax({
            type: 'POST',
            url: API_ENDPOINT + API_AUTH_ACTION,
            data: JSON.stringify({username: username, password: password}),
            contentType: "application/json; charset=utf-8",
            success(data) {
                dispatch(updateUser(username, true, data.id_token));
            },
            error(response) {
                dispatch(updateUser(null, false, null));
            }
        });
    }
}