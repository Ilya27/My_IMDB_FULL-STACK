import axios from 'axios';
import {getMovieWatchList} from './getMovie'
export const MoveMovie = (movie) => dispatch => {
    axios.put(`http://localhost:4000/api/movies/updateMovies/List`, movie)
    .then(data=>{
        console.log(data.data.userId);
        dispatch(getMovieWatchList(data.data.userId));
    }
        )
    .catch(err => {
        alert(err)
    }); 
}
