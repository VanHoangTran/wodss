import $ from 'jquery';
import {API_ACTION_ACCOUNT, API_ACTION_AUTH, API_ENDPOINT} from '../util/constants';
import {store} from "../index";

const CONTENT_TYPE = "application/json; charset=utf-8";

export const UPDATE_USER = 'user:updateUser';

export function updateUser(username, token, mail, isAdmin) {
    return {
        type: UPDATE_USER,
        payload: {
            user: {
                username: username,
                token: token,
                mail: mail,
                isAdmin: isAdmin,
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
                dispatch(updateUser(username, response.id_token));
            },
            error(response) {
                dispatch(updateUser());
            }
        })
    }
}

export function apiLogout() {
    return dispatch => {
        dispatch(updateUser());
    }
}

export function apiGetAccountInformation() {
    return dispatch => {
        let jwt = store.getState().user.token;

        $.ajax({
            type: 'GET',
            url: API_ENDPOINT + API_ACTION_ACCOUNT,
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(updateUser(response.username, jwt, response.mail, response.admin));
            },
            error(response) {
                dispatch(updateUser());
            },
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + jwt);
            }
        })
    }
}
