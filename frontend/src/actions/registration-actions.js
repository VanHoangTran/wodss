import $ from 'jquery';
import {API_ACTION_REGISTER, API_ENDPOINT} from '../util/constants';

const CONTENT_TYPE = "application/json; charset=utf-8";

export const UPDATE_REGISTRATION = 'user:updateRegistration';

export function updateRegistration(registrationSuccessful, responseText) {
    return {
        type: UPDATE_REGISTRATION,
        payload: {
            registration: {
                successful: registrationSuccessful,
                responseText: responseText,
            }
        }
    }
}

export function apiRegister(username, password, mail) {
    return dispatch => {
        $.ajax({
            type: 'POST',
            url: API_ENDPOINT + API_ACTION_REGISTER,
            data: JSON.stringify({username: username, password: password, mail: mail}),
            contentType: CONTENT_TYPE,
            success(response) {
                if (response.status === 200) {
                    dispatch(updateRegistration(true, null));
                }
            },
            error(response) {
                if (response.status !== 200) {
                    dispatch(updateRegistration(false, response.responseText));
                }
            }
        });
    }
}