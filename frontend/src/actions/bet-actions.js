import $ from 'jquery';
import {API_ACTION_PHASES, API_ACTION_BET, API_ENDPOINT, API_ACTION_GAMES} from '../util/constants';
import {store} from '../index'
const CONTENT_TYPE = "application/json; charset=utf-8";

export const PUT_BET = 'bets:putBet';
export const SET_ACCOUNT_BETS = 'bets:setAccountBets';

/**
 * Loads all account bets from the API endpoint.
 */
export function apiLoadAccountBets(){
    return dispatch => {
        let jwt = store.getState().user.token;

        let phases = undefined;

        // get all phases from API
        $.ajax({
            type: 'GET',
            async: false,
            url: API_ENDPOINT + API_ACTION_BET,
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(setAccountBets(response));
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

/**
 * Creates a new bet on the API for current user.
 * 
 * @param {*} gameId id of target game
 * @param {*} homeGoals goals of home team
 * @param {*} awayGoals goals of away team
 */
export function apiPutBet(gameId, homeGoals, awayGoals) {
    return dispatch => {
        let jwt = store.getState().user.token;

        // get all phases from API
        $.ajax({
            type: 'PUT',
            async: false,
            url: API_ENDPOINT + API_ACTION_BET,
            contentType: CONTENT_TYPE,
            data: JSON.stringify({
                gameId: gameId,
                homeGoals: homeGoals,
                awayGoals: awayGoals
            }),
            success(response) {
                dispatch(putBet(gameId, homeGoals, awayGoals, 200));
            },
            error(response) {
                if(response.status === 403){
                    store.getState().user.token = null;
                }
                dispatch(putBet(gameId, homeGoals, awayGoals, response.status));
            }, 
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + jwt); }
        })
    }
}


export function putBet(gameId, homeGoals, awayGoals, status) {
    return {
        type: PUT_BET,
        payload: {
            bet: {
                gameId: gameId,
                homeGoals: homeGoals,
                awayGoals: awayGoals,
                apiStatus: status
            }
        }
    }
}

export function setAccountBets(bets) {
    return {
        type: SET_ACCOUNT_BETS,
        payload: {
            bets: bets
        }
    }
}