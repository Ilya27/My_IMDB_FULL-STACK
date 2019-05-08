import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {getMovieFavoriteList} from '../../../../actions/getMovie';
import {getShowFavoriteList} from '../../../../actions/getShow';
import {getPersonFavoriteList} from '../../../../actions/getPerson'
import store from '../../../../store'
class PageInfo extends Component{

    componentDidMount(){
        const {getMovieFavoriteList,getShowFavoriteList,auth, getPersonFavoriteList}=this.props;
        getMovieFavoriteList(auth.user.id);
        getShowFavoriteList(auth.user.id);
        getPersonFavoriteList(auth.user.id)
    }
    renderFavoriteListMovie(favoriteListMovie){
        const favoriteListMovieArray=[];
        if(favoriteListMovie){
            favoriteListMovie.map(item=>{
                favoriteListMovieArray.push(
                <div className='  '>
                  <p>{item.title}</p>
                </div>
            )
        })
        return favoriteListMovieArray;
    }
    }
    renderFavoriteListShow(favoriteListShow){
        const favoriteListShowArray=[];
        if(favoriteListShow){
            favoriteListShow.map(item=>{
                favoriteListShowArray.push(
                <div className='  '>
                  <p>{item.name}</p>
                </div>
            )
        })
        return favoriteListShowArray;
    }
}
    renderFavoriteListPerson(favoriteListPerson){
        const favoriteListPersonwArray=[];
        if(favoriteListPerson){
            favoriteListPerson.map(item=>{
                favoriteListPersonwArray.push(
                <div className='  '>
                  <p>{item.name}</p>
                </div>
            )
        })
        return favoriteListPersonwArray;
    }
    }

    render(){
        const {movie,show,person}=this.props;
        const {favoriteListMovie}=movie;
        const {favoriteListShow}= show;
        const {favoriteListPerson}=person;
        return(
            <div>
                <h2>Favorite Movies</h2>
                {this.renderFavoriteListMovie(favoriteListMovie)}
                <h2>Favorite Shows</h2>
                {this.renderFavoriteListShow(favoriteListShow)}
                <h2>Favorite Stars</h2>
                {this.renderFavoriteListPerson(favoriteListPerson)}
            </div>
        )
    }
}


const mapStateToProps = store => ({
    movie: store.movie,
    auth:store.auth,
    show:store.show,
    person:store.person,
});


const mapDispatchToProps = {
    getMovieFavoriteList,
    getShowFavoriteList,
    getPersonFavoriteList
  };
  
    
const ConnectWatchList = connect(mapStateToProps,mapDispatchToProps)(PageInfo);

class FavoriteListPage extends Component{
    render (){
        return(
            <Provider store={store}>
                <ConnectWatchList/>
            </Provider>
        )
    }
}
  

export default FavoriteListPage;