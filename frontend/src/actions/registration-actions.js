import $ from 'jquery';
import {API_ACTION_AUTH, API_ACTION_REGISTER, API_ENDPOINT} from '../util/constants';
import {updateUser} from "./user-actions";

const CONTENT_TYPE = "application/json; charset=utf-8";

export const UPDATE_REGISTRATION = 'user:updateRegistration';

export function updateRegistration(registrationSuccessful, accountActivated, responseText) {
    return {
        type: UPDATE_REGISTRATION,
        payload: {
            registration: {
                successful: registrationSuccessful,
                activated: accountActivated,
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
                dispatch(updateRegistration(true, false));
            },
            error(response) {
                dispatch(updateRegistration(false, false, response.responseText));
            }
        });
    }
}

export function apiActivate(activationToken) {
    return dispatch => {
        $.ajax({
            type: 'PUT',
            url: API_ENDPOINT + API_ACTION_REGISTER,
            data: JSON.stringify({token: activationToken}),
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(updateRegistration(true, true));
            },
            error(response) {
                console.log(response);
                dispatch(updateRegistration(true, false, response.responseText));
            }
        })
    }
}