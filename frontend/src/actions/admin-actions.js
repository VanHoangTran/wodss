import $ from 'jquery';
import {API_ACTION_GAMES, API_ACTION_TEAMS, API_ENDPOINT} from '../util/constants';
import {store} from '../index'

const CONTENT_TYPE = "application/json; charset=utf-8";

export const GET_TEAMS = 'admin:getTeams';
export const PUT_GAME = 'admin:putGame';

export function setTeams(teams) {
    return {
        type: GET_TEAMS,
        payload: {
            teams: teams
        }
    }
}

export function putGame(gameId, homeId, awayId, homeGoals, awayGoals, apiStatus) {
    return {
        type: PUT_GAME,
        payload: {
            game: {
                gameId: gameId,
                homeId: homeId,
                awayId: awayId,
                homeGoals: homeGoals,
                awayGoals: awayGoals,
                apiStatus: apiStatus
            }
        }
    }
}

export function apiGetTeams() {
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
                if (response.status === 403 || response.status === 0) {
                    store.getState().user.token = undefined;
                }
            },
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + jwt);
            }
        })
    }
}

export function apiPutGame(gameId, homeId, awayId, homeGoals, awayGoals) {
    return dispatch => {
        let jwt = store.getState().user.token;
        $.ajax({
            type: 'PUT',
            async: false,
            url: API_ENDPOINT + API_ACTION_GAMES,
            contentType: CONTENT_TYPE,
            data: JSON.stringify({
                id: gameId,
                homeId: homeId,
                awayId: awayId,
                homeGoals: homeGoals,
                awayGoals: awayGoals,
            }),
            success(response) {
                dispatch(putGame(gameId, homeId, awayId, homeGoals, awayGoals, 200));
            },
            error(response) {
                if (response.status === 403 || response.status === 0) {
                    store.getState().user.token = undefined;
                }
                dispatch(putGame(gameId, homeId, awayId, homeGoals, awayGoals, response.status));
            },
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + jwt);
            }
        })
    }
}