import {SET_WATCHLIST,SET_WATCHED,SET_FAVORITE } from '../actions/types';

const initialState = {
    watchListMovie:[],
    watchedListMovie:[],
    favoriteListMovie:[],
}

export default function(state = initialState, action ) {
    switch(action.type) {
            case SET_WATCHLIST:
            return{
                ...state,
                watchListMovie:action.payload.watchlist
            }
            case SET_WATCHED:
            return{
                ...state,
                watchedListMovie:action.payload.watchedlist
            }
            case SET_FAVORITE:
            return{
                ...state,
                favoriteListMovie:action.payload.favoritelist
            }
        default: 
            return state;
    }
}