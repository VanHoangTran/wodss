import $ from 'jquery';
import {store} from '../index';
import {API_ACTION_POOLS, API_ENDPOINT} from '../util/constants';
const CONTENT_TYPE = "application/json; charset=utf-8";

export const LOAD_BETTING_POOLS = 'pools:load';

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
                    store.getState().user.token = null;
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