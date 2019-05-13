import axios from 'axios';
import {getShowWatchList,getShowWatchedList,getShowFavoriteList} from './getShow'
export const MoveShowWatched = (show) => dispatch => {
    axios.put(`http://localhost:4000/api/shows/updateShows/Watched`, show)
    .then(
        data=>{
            dispatch(getShowWatchList(data.data.userId));
        }
    )
    .catch(err => {
        alert(err)
    }); 
}


export const MoveShowFavorite = (show) => dispatch => {
    console.log(show);
    axios.put(`http://localhost:4000/api/shows/updateShows/Favorite`, show)
    .then(
        data=>{
            dispatch(getShowWatchedList(data.data.userId));
            dispatch(getShowWatchList(data.data.userId));
        }
    )
    .catch(err => {
        alert(err)
    }); 
}


export const RemoveShow = (movie,type,userId,status) => dispatch =>{
    console.log(status);
    axios.delete(`http://localhost:4000/api/${type}/remove`,{params:movie })
        .then(data=>{
            if(status==="favorite"){
                dispatch(getShowFavoriteList(userId));
            }else if(status==="watched"){
                dispatch(getShowWatchedList(userId));
            }else if(status==="watch"){
                dispatch(getShowWatchList(userId));
            }
        }
        )
    .catch(err => {
        // alert('You have already added this')
    });  
}