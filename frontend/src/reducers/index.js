import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import movieReducer from'./movieReducer';
import showReducer from './showReducer';
import personReducer from './personReducer'
import reviewReducer from './reviewReducer';
export default combineReducers({
    movie:movieReducer,
    errors: errorReducer,
    auth: authReducer,
    show:showReducer,
    person:personReducer,
    review:reviewReducer,
});