import {SET_WATCHLIST_SHOW,SET_WATCHED_SHOW,SET_FAVORITE_SHOW } from '../actions/types';

const initialState = {
    watchListShow:[],
    watchedListShow:[],
    favoriteListShow:[],
}

export default function(state = initialState, action ) {
    switch(action.type) {
            case SET_WATCHLIST_SHOW:
            return{
                ...state,
                watchListShow:action.payload.watchlistshow
            }
            case SET_WATCHED_SHOW:
            return{
                ...state,
                watchedListShow:action.payload.watchedlistshow
            }
            case SET_FAVORITE_SHOW:
            return{
                ...state,
                favoriteListShow:action.payload.favoritelistshow
            }
        default: 
            return state;
    }
}