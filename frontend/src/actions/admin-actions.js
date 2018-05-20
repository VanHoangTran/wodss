import $ from 'jquery';
import {API_ACTION_PHASES, API_ACTION_BET, API_ENDPOINT, API_ACTION_GAMES, API_ACTION_TEAMS} from '../util/constants';
import {store} from '../index'
const CONTENT_TYPE = "application/json; charset=utf-8";

export const GET_TEAMS = 'admin:getTeams';

export function setTeams(teams) {
    return {
        type: GET_TEAMS,
        payload: {
            teams: teams
        }
    }
}

export function apiGetTeams(){
    return dispatch => {
        let jwt = store.getState().user.token;
        $.ajax({
            type: 'GET',
            async: false,
            url: API_ENDPOINT + API_ACTION_TEAMS,
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(setTeams(response));
            },
            error(response) {
                if(response.status === 403){
                    store.getState().user.token = null;
                }
            }, 
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + jwt); }
        })
    }
}
