import { PUT_BET, SET_ACCOUNT_BETS, DELETE_BET } from '../actions/bet-actions';

export const RELOAD_BET = 'reload';

const initialState = {
    bets: [],
    lastAdded: {},
    lastDeleted: {}
}

export default function betReducer(state = initialState, {type, payload}) {
    switch (type) {
        case PUT_BET:
            return Object.assign({}, state, {
                lastDeleted: {}, 
                lastAdded: {},
                bets: [
                    ...state.bets,
                    {
                        id: -1,
                        gameId: payload.bet.gameId,
                        homeGoals: payload.bet.homeGoals,
                        awayGoals: payload.bet.awayGoals
                    }
                ],
                lastAdded: {
                    gameId: payload.bet.gameId,
                    homeGoals: payload.bet.homeGoals,
                    awayGoals: payload.bet.awayGoals,
                    apiStatus: payload.bet.apiStatus
                }
            })
        case SET_ACCOUNT_BETS:
            return Object.assign({}, state, {
                bets: [...payload.bets]
            })
        case DELETE_BET:
            return Object.assign({}, state, {
                lastDeleted: {
                    gameId: payload.gameId,
                    success: payload.success
                }
            })
        default:
            return state;
    }
}

