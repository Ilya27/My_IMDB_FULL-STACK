import axios from 'axios';
import { GET_ERRORS} from './types';
export const addMovie = (movie) => dispatch => {
    axios.post('http://localhost:4000//api/movies/add', movie)
            .then()
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}