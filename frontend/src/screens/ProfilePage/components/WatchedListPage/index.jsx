import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {getMovieWatchedList} from '../../../../actions/getMovie';
import {getShowWatchedList} from '../../../../actions/getShow';
import store from '../../../../store'
class PageInfo extends Component{

    componentDidMount(){
        const {getMovieWatchedList,getShowWatchedList,auth}=this.props;
        getMovieWatchedList(auth.user.id);
        getShowWatchedList(auth.user.id);
    }
    renderWatchedListMovie(watchedListMovie){
        const watchedListMovieArray=[];
        if(watchedListMovie){
            watchedListMovie.map(item=>{
            watchedListMovieArray.push(
                <div className=' '>
                  <p>{item.title}</p>
                </div>
            )
        })
        return watchedListMovieArray;
    }
    }
    renderWatchedListShow(watchedListShow){
        const watchedListShowArray=[];
        if(watchedListShow){
            watchedListShow.map(item=>{
                watchedListShowArray.push(
                <div className='  '>
                  <p>{item.name}</p>
                </div>
            )
        })
        return watchedListShowArray;
    }
    }

    render(){
        const {movie,show}=this.props;
        const {watchedListMovie}=movie;
        const {watchedListShow}= show;
        console.log(this.props);
        return(
            <div>
                 <h2>Watched Movies</h2>
                {this.renderWatchedListMovie(watchedListMovie)}
                 <h2>Watched Shows</h2>
                {this.renderWatchedListShow(watchedListShow)}
                {/* <h2> Favorite List</h2>
                {this.renderFavoriteList(favoritelist)} */}
            </div>
        )
    }
}


const mapStateToProps = store => ({
    movie: store.movie,
    auth:store.auth,
    show:store.show,
});


const mapDispatchToProps = {
    getMovieWatchedList,
    getShowWatchedList
  };
  
    
const ConnectWatchList = connect(mapStateToProps,mapDispatchToProps)(PageInfo);

class WatchListPage extends Component{
    render (){
        return(
            <Provider store={store}>
                <ConnectWatchList/>
            </Provider>
        )
    }
}
  

export default WatchListPage;