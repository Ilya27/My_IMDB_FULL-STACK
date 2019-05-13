import axios from 'axios';
import {SET_REVIEW} from '../actions/types';
export const AddReview = (review) => dispatch => {
    axios.put(`http://localhost:4000/api/reviews/add`, review)
    .then(
        data=>{
            dispatch(getReviewList(data.data.userId));
        }
    )
    .catch(err => {
        alert(err)
    }); 
}



export const getReviewList = (id) => dispatch => {
    console.log(id);
    axios.get('http://localhost:4000/api/reviews/get',{
        params: {userId: id,}
       })
       .then(data=>{
           dispatch(setReviewList(data.data))
       });
   }
   
       

export const setReviewList = (review)=> {
   return {
       type: SET_REVIEW,
       payload: {review},
   }
}