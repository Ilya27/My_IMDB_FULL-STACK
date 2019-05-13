import axios from 'axios';
import {getPersonFavoriteList} from './getPerson'
export const RemovePerson = (movie,type,userId,status) => dispatch =>{
    axios.delete(`http://localhost:4000/api/${type}/remove`,{params:movie })
        .then(data=>{
            dispatch(getPersonFavoriteList(userId));
        }
        )
    .catch(err => {
        // alert('You have already added this')
    });  
}