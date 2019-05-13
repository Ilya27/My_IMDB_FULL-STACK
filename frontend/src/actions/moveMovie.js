import axios from 'axios';
import {getMovieWatchList,getMovieWatchedList,getMovieFavoriteList} from './getMovie'
export const MoveMovieWatched = (movie) => dispatch => {
    axios.put(`http://localhost:4000/api/movies/updateMovies/Watched`, movie)
    .then(data=>{
        console.log(data.data.userId);
        dispatch(getMovieWatchList(data.data.userId));
    }
        )
    .catch(err => {
        alert(err)
    }); 
}


export const MoveMovieFavorite = (movie) => dispatch => {
    axios.put(`http://localhost:4000/api/movies/updateMovies/Favorite`, movie)
    .then(data=>{
        console.log(data.data.userId);
        dispatch(getMovieWatchList(data.data.userId));
        dispatch(getMovieWatchedList(data.data.userId));
    }
        )
    .catch(err => {
        alert(err)
    }); 
}



export const RemoveMovie = (movie,type,userId,status) => dispatch =>{
    console.log(status);
    axios.delete(`http://localhost:4000/api/${type}/remove`,{params:movie })
        .then(data=>{
            if(status==="favorite"){
                dispatch(getMovieFavoriteList(userId));
            }else if(status==="watched"){
                dispatch(getMovieWatchedList(userId));
            }else if(status==="watch"){
                dispatch(getMovieWatchList(userId));
            }
        }
        )
    .catch(err => {
    });  
}