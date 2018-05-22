import $ from 'jquery';
import {API_ACTION_RECOVERY, API_ENDPOINT} from '../util/constants';

const CONTENT_TYPE = "application/json; charset=utf-8";

export const UPDATE_RECOVERY = 'user:updateRecovery';

export function updateRecovery(initiated, completed, responseText) {
    return {
        type: UPDATE_RECOVERY,
        payload: {
            recovery: {
                initiated: initiated,
                completed: completed,
                responseText: responseText,
            }
        }
    }
}

export function apiInitiateRecovery(username, mail) {
    return dispatch => {
        $.ajax({
            type: 'POST',
            url: API_ENDPOINT + API_ACTION_RECOVERY,
            data: JSON.stringify({username: username, mail: mail}),
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(updateRecovery(true, false));
            },
            error(response) {
                dispatch(updateRecovery(false, false, response.responseText));
            }
        });
    }
}

export function apiCompleteRecovery(token, password) {
    return dispatch => {
        $.ajax({
            type: 'PUT',
            url: API_ENDPOINT + API_ACTION_RECOVERY,
            data: JSON.stringify({token: token, password: password}),
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(updateRecovery(true, true));
            },
            error(response) {
                dispatch(updateRecovery(true, false, response.responseText));
            }
        })
    }
}