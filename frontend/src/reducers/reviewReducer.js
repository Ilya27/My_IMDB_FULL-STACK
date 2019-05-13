import {SET_REVIEW} from '../actions/types';

const initialState = {
    review:'',
}

export default function(state = initialState, action ) {
    switch(action.type) {
            case SET_REVIEW:
            return{
                ...state,
                review:action.payload.review
            }
        default: 
            return state;
    }
}