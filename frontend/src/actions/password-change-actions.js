import $ from 'jquery';
import {API_ACTION_ACCOUNT, API_ENDPOINT} from '../util/constants';
import {store} from "../index";

const CONTENT_TYPE = "application/json; charset=utf-8";

export const UPDATE_PASSWORD = 'user:updatePassword';

export function updatePassword(successful, responseText) {
    return {
        type: UPDATE_PASSWORD,
        payload: {
            passwordChange: {
                successful: successful,
                responseText: responseText,
                responseTime: new Date(),
            }
        }
    }
}

export function apiChangePassword(newPassword) {
    return dispatch => {
        let jwt = store.getState().user.token;

        $.ajax({
            type: 'PUT',
            url: API_ENDPOINT + API_ACTION_ACCOUNT,
            data: JSON.stringify({newPassword: newPassword}),
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(updatePassword(true));
            },
            error(response) {
                dispatch(updatePassword(false, response.responseText));
            },
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + jwt);
            }
        })
    }
}
