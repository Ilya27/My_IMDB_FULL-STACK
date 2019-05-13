import axios from 'axios';
import {SET_WATCHLIST_SHOW,SET_FAVORITE_SHOW,SET_WATCHED_SHOW } from '../actions/types';
export const getShowWatchList = (id) => dispatch => {
    axios.get('http://localhost:4000/api/shows/getShows/List',{
        params: {
        userId: id,
        type: "Want to watch"}
      })
      .then(data=>{
          dispatch(setWatchListShow(data.data))
        });
    }

export const getShowFavoriteList = (id) => dispatch => {
    axios.get('http://localhost:4000/api/shows/getShows/List',{
        params: {
            userId: id,
            type: "Favorite"}
        })
        .then(data=>{
            dispatch(setFavoriteList(data.data))
        });
    }
    
        
        

 export const getShowWatchedList = (id) => dispatch => {
     axios.get('http://localhost:4000/api/shows/getShows/List',{
         params: {
            userId: id,
            type: "Watched"}
        })
        .then(data=>{
            dispatch(setWatchedList(data.data))
        });
    }
    
        

export const setWatchedList = (watchedlistshow)=> {
    return {
        type: SET_WATCHED_SHOW,
        payload: {watchedlistshow},
    }
}
export const setFavoriteList = (favoritelistshow)=> {
    return {
        type: SET_FAVORITE_SHOW,
        payload: {favoritelistshow},
    }
}
export const setWatchListShow = (watchlistshow)=> {
    return {
        type: SET_WATCHLIST_SHOW,
        payload: {watchlistshow},
    }
}

