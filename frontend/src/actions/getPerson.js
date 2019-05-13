import axios from 'axios';
import {SET_FAVORITE_PERSON} from '../actions/types';
export const getPersonFavoriteList = (id) => dispatch => {
    axios.get('http://localhost:4000/api/persons/getPerson/List',{
        params: {
            userId: id,
            type: "Favorite"}
        })
        .then(data=>{
            dispatch(setFavoriteList(data.data))
        });
    }
    
export const setFavoriteList = (favoritelist)=> {
    console.log(favoritelist);
    
    return {
        type: SET_FAVORITE_PERSON,
        payload: {favoritelist},
    }
}