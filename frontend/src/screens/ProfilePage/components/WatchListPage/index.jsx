import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {getMovieWatchList} from '../../../../actions/getMovie';
import {getShowWatchList} from '../../../../actions/getShow';
import store from '../../../../store'
class PageInfo extends Component{

    componentDidMount(){
        const {getMovieWatchList,getShowWatchList,auth}=this.props;
        getMovieWatchList(auth.user.id);
        getShowWatchList(auth.user.id);
    }
    renderWatchListMovie(watchListMovie){
        const watchListMovieArray=[];
        if(watchListMovie){
        watchListMovie.map(item=>{
            watchListMovieArray.push(
                <div className='watchListMOvie'>
                  <p>{item.title}</p>
                </div>
            )
        })
        return watchListMovieArray;
    }
    }
    renderWatchListShow(watchListShow){
        const watchListShowArray=[];
        console.log(watchListShow);
        if(watchListShow){
            watchListShow.map(item=>{
                watchListShowArray.push(
                <div className='watchListShow'>
                  <p>{item.name}</p>
                </div>
            )
        })
        return watchListShowArray;
    }
    }

    render(){
        const {movie,show}=this.props;
        const {watchListMovie}=movie;
        const {watchListShow}=show;
        console.log(this.props);
        return(
            <div>
                 <h2>Movies to watch</h2>
                {this.renderWatchListMovie(watchListMovie)}
                 <h2>Shows to watch</h2>
                {this.renderWatchListShow(watchListShow)}
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
    getMovieWatchList,
    getShowWatchList,
  };
  
    
const ConnectWatchList = connect(mapStateToProps,mapDispatchToProps)(PageInfo);

class WatchedListPage extends Component{
    render (){
        return(
            <Provider store={store}>
                <ConnectWatchList/>
            </Provider>
        )
    }
}
  

export default WatchedListPage;