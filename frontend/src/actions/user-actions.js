import $ from 'jquery';
import base64 from 'base-64'
import {API_ENDPOINT} from '../constants';
export const UPDATE_CREDENTIALS = 'user:updateCredentials';
export const SHOW_ERROR = 'user:showError'; 

// update user state (username, password) on login
export function updateCredentials(username, password) {
    return {
        type: UPDATE_CREDENTIALS,
        payload: {
            user: {
                username: username,
                password: base64.encode(password)
            }
        }
    }
}

export function showError() {
    return {
        type: SHOW_ERROR,
        payload: {
            user: 'ERROR!'
        }
    }
}

export function apiAuthenticate(username, password) { 
    return dispatch => {
        $.ajax({
            url: API_ENDPOINT,
            success() {
                console.log('SUCCESS');
            },
            error() {
                console.log('ERROR');

                dispatch(showError());
            }
        });
    }
}