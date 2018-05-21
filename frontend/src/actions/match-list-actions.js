import $ from 'jquery';
import {API_ACTION_PHASES, API_ACTION_BET, API_ENDPOINT, API_ACTION_GAMES} from '../util/constants';
import {store} from '../index'
const CONTENT_TYPE = "application/json; charset=utf-8";

export const UPDATE_MATCH_LIST = 'matchlist:updateList';

/**
 * Loads available game phases and their games.
 *  - first gets all phases
 *  - then gets games per phase
 *  - combines both data into store prop
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
export function apiLoadMatchList() {
    return dispatch => {
        let jwt = store.getState().user.token;

        let phases = undefined;
        // get all phases from API
        $.ajax({
            type: 'GET',
            async: false,
            url: API_ENDPOINT + API_ACTION_PHASES,
            contentType: CONTENT_TYPE,
            success(response) {
                phases = response;
            },
            error(response) {
                if(response.status === 403 || response.status === 0){
                    window.location = "/logout"
                }
            }, 
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + jwt); }
        })

        // add games to phase
        for(var index in phases) {
            let id = phases[index].id;
            let name = phases[index].name;

            $.ajax({
                type: 'GET',
                async: false,
                url: API_ENDPOINT + API_ACTION_GAMES + '?phaseId=' + id,
                contentType: CONTENT_TYPE,
                success(response) {
                    phases[index].games = response;
                },
                error(response) {
                    if(response.status === 403 || response.status === 0){
                        window.location = "/logout"
                    }
                }, 
                beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + jwt); }
            })
        }

        // save data into store
        phases = phases === undefined ? null : phases;
        dispatch(updateMatchList(phases));
    }
}

export function updateMatchList(list) {
    return {
        type: UPDATE_MATCH_LIST,
        payload: {
            list: list
        }
    }
}