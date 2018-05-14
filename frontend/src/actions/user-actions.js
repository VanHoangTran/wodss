import $ from 'jquery';
import {API_ACTION_ACCOUNT, API_ACTION_AUTH, API_ENDPOINT} from '../util/constants';

const CONTENT_TYPE = "application/json; charset=utf-8";

export const UPDATE_USER = 'user:updateUser';

export function updateUser(username, token, mail) {
    return {
        type: UPDATE_USER,
        payload: {
            user: {
                username: username,
                token: token,
                mail: mail
            }
        }
    }
}

// performs authorization against api
export function apiAuthenticate(username, password) {
    return dispatch => {
        $.ajax({
            type: 'POST',
            url: API_ENDPOINT + API_ACTION_AUTH,
            data: JSON.stringify({username: username, password: password}),
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(updateUser(username, response.id_token, null));
            },
            error(response) {
                dispatch(updateUser(null, null, null));
            }
        })
    }
}

export function apiLogout() {
    return dispatch => {
        dispatch(updateUser(null, null, null));
    }
}

export function apiGetAccountInformation() {
    return dispatch => {
        $.ajax({
            type: 'GET',
            url: API_ENDPOINT + API_ACTION_ACCOUNT,
            contentType: CONTENT_TYPE,
            success(response) {
                console.log(response);
            },
            error(response) {
                console.log(response);
            }
        })
    }
}