import {ACTION_TYPES} from './constants';
import axios from 'axios'

export const NowPlayingMovies = nowPlayingMovies => ({
    type: ACTION_TYPES.SET_PLAYING_FILMS,
    payload: {nowPlayingMovies},
});

export const NowPlayingShows = nowPlayingShows => ({
    type: ACTION_TYPES.SET_PLAYING_SHOWS,
    payload: {nowPlayingShows},
});

export const NextEpisodeToAir = nextEpisodeToAir => ({
    type: ACTION_TYPES.SET_NEXT_EPISODE_TO_AIR,
    payload: {nextEpisodeToAir},
});

export const getMovies = movies => ({
    type: ACTION_TYPES.GET_MOVIES,
    payload: {movies},
});

export const getShows = shows => ({
    type: ACTION_TYPES.GET_SHOWS,
    payload: {shows},
});

export const getPersons = persons => ({
    type: ACTION_TYPES.GET_PERSONS,
    payload: {persons},
});


export const getSearchInfo = search_info => ({
    type: ACTION_TYPES.SEARCH_INFO,
    payload: {search_info},
})





export const fetchNowPlayingMovies = () => dispatch => {
    fetch(`http://localhost:4000/upcoming_movies`)
        .then(data => data.json())
        .then(data => {
            dispatch(NowPlayingMovies(data))
    });
};


export const fetchNowPlayingTVShows =  () => dispatch => {
    let arr=[];
    let count=0;
    fetch(`http://localhost:4000/upcoming_shows`)
    .then(data => data.json())
    .then(data => {
        dispatch(NowPlayingShows(data))
    })
};

export const fetchInfo =  (type,state,activePage) => dispatch => {
    console.log(type);
    fetch(`http://localhost:4000/${type}/${state}/${activePage}`)
    .then(data=>data.json())
    .then(data=>{
        if(type==='movie')
        {
            dispatch(getMovies(data.results))
        }else if(type==='tv'){
            dispatch(getShows(data.results))
        }
        else{
            dispatch(getPersons(data.results))
        }
    })
}


export const searchInfo = (value) => dispatch => {
    fetch(`http://localhost:4000/${value}`)
    .then(data=>data.json())
    .then(data=>{dispatch(getSearchInfo(data))})
}




