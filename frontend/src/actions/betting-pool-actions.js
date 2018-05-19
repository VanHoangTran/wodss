import $ from 'jquery';
import {store} from '../index';
import {API_ACTION_POOLS, API_ENDPOINT} from '../util/constants';
import { EditorFormatListBulleted } from 'material-ui';
const CONTENT_TYPE = "application/json; charset=utf-8";

export const LOAD_BETTING_POOLS = 'pools:load';
export const DELETE_BETTING_POOL = 'pools:delete';
export const CREATE_BETTING_POOL = 'pools:create';
export const UPDATE_BETTING_POOL = 'pools:update';

export const JOIN_ACTION = 'join';
export const LEAVE_ACTION = 'leave';

export function apiLoadAllBettingPools(){
    return dispatch => {
        let jwt = store.getState().user.token;

        $.ajax({
            type: 'GET',
            async: false,
            url: API_ENDPOINT + API_ACTION_POOLS,
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(updatePools(response));
            },
            error(response) {
                if(response.status === 403){
                    window.location = "/logout"
                }
            }, 
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + jwt); }
        })
    }
}

export function apiDeleteGroup(name) {
    return dispatch => {
        let jwt = store.getState().user.token;

        $.ajax({
            type: 'DELETE',
            async: false,
            data: JSON.stringify({name: name}),
            url: API_ENDPOINT + API_ACTION_POOLS,
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(deletePool(name));
            },
            error(response) {
                if(response.status === 403){
                    window.location = "/logout"
                }
            }, 
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + jwt); }
        })
    }
}

export function apiCreateGroup(name) {
    return dispatch => {
        let jwt = store.getState().user.token;

        $.ajax({
            type: 'POST',
            async: false,
            data: JSON.stringify({name: name}),
            url: API_ENDPOINT + API_ACTION_POOLS,
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(addPool(name, false));
            },
            error(response) {
                if(response.status === 403){
                    window.location = "/logout"
                } else if(response.status === 400){
                    dispatch(addPool(name, true));
                }
            }, 
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + jwt); }
        })
    }
}

export function apiUpdateRelation(name, action) {
    return dispatch => {
        let jwt = store.getState().user.token;

        $.ajax({
            type: 'PUT',
            async: false,
            data: JSON.stringify({name: name, action: action}),
            url: API_ENDPOINT + API_ACTION_POOLS,
            contentType: CONTENT_TYPE,
            success(response) {
                dispatch(relationUpdate(false));
            },
            error(response) {
                if(response.status === 403){
                    window.location = "/logout"
                } else if(response.status === 400){
                    dispatch(relationUpdate(true));
                }
            }, 
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + jwt); }
        })
    }
}

export function updatePools(pools) {
    return {
        type: LOAD_BETTING_POOLS,
        payload: {
            pools: pools
        }
    }
}

export function deletePool(name){
    return {
        type: DELETE_BETTING_POOL,
        payload: {
            name: name
        }
    }
}

export function addPool(name, error){
    return {
        type: CREATE_BETTING_POOL,
        payload: {
            name: name,
            error: error
        }
    }
}

export function relationUpdate(error){
    return {
        type: UPDATE_BETTING_POOL,
        payload: {
            error: error
        }
    }
}