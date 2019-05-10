import axios from 'axios';
import {getShowWatchList} from './getShow'
export const moveShow = (movie) => dispatch => {
    axios.post(`http://localhost:4000/api/movies/updateMovies/List`, movie)
    .then(dispatch (getShowWatchList(movie.userId)))
    .catch(err => {
    }); 
}
