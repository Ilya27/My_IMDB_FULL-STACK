import {SET_FAVORITE_PERSON } from '../actions/types';

const initialState = {
    favoriteListPerson:[],
}

export default function(state = initialState, action ) {
    switch(action.type) {
            case SET_FAVORITE_PERSON:
            return{
                ...state,
                favoriteListPerson:action.payload.favoritelist
            }
        default: 
            return state;
    }
}