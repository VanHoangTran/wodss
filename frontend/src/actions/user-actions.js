import $ from 'jquery';
import base64 from 'base-64';
import {API_ENDPOINT, API_AUTH_ACTION} from '../util/constants';

export const UPDATE_USER = 'user:updateUser';

export function updateUser(username, authenticated) {
    return {
        type: UPDATE_USER,
        payload: {
            user: { 
                username: username, 
                authenticationState: { 
                    authenticated: authenticated,
                    sessionCreated: authenticated === true ? Date.now() : null
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
            headers: {
                'Authorization': 'Basic ' + base64.encode(username + ':' + password)
            },
            success(data) {
                dispatch(updateUser(username, true));
            },
            error(response) {
                dispatch(updateUser(null, false));
                $('#username, #password').val('');
                $('#loginForm').removeClass().addClass('shake animated')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass();
                });
            }
        });
    }
}