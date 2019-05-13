import axios from 'axios';
import { setCurrentUser } from './authentication';
import {GET_ERRORS} from './types'
export const UpdateInfo = (user) => dispatch => {
    axios.put('http://localhost:4000/api/users/update', user)
    .then(
        data=>{
            console.log(data.data);
            dispatch(setCurrentUser(data.data));
        }
    )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

