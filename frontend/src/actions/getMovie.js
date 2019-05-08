import axios from 'axios';
import {SET_WATCHLIST,SET_FAVORITE,SET_WATCHED } from '../actions/types';
export const getMovieWatchList = (id) => dispatch => {
    console.log(id);
    axios.get('http://localhost:4000/api/movies/getMovies/List',{
        params: {
        userId: id,
        type: "Want to watch"}
      })
      .then(data=>{
          dispatch(setWatchList(data.data))
        });
    }

export const getMovieFavoriteList = (id) => dispatch => {
    axios.get('http://localhost:4000/api/movies/getMovies/List',{
        params: {
            userId: id,
            type: "Favorite"}
        })
        .then(data=>{
            dispatch(setFavoriteList(data.data))
        });
    }
    
        
        

 export const getMovieWatchedList = (id) => dispatch => {
     console.log(id);
     
     axios.get('http://localhost:4000/api/movies/getMovies/List',{
         params: {
            userId: id,
            type: "Watched"}
        })
        .then(data=>{
            console.log(data.data);
            dispatch(setWatchedList(data.data))
        });
    }
    
        

export const setWatchedList = (watchedlist)=> {
    return {
        type: SET_WATCHED,
        payload: {watchedlist},
    }
}
export const setFavoriteList = (favoritelist)=> {
    return {
        type: SET_FAVORITE,
        payload: {favoritelist},
    }
}
export const setWatchList = (watchlist)=> {
    return {
        type: SET_WATCHLIST,
        payload: {watchlist},
    }
}

