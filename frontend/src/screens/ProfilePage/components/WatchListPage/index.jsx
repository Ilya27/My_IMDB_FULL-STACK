import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {getMovieWatchList} from '../../../../actions/getMovie';
import {getShowWatchList} from '../../../../actions/getShow';
import store from '../../../../store'
import {MoveButtonConnect} from '../../../../components/index'
class PageInfo extends Component{
    state={
        render:''
    }
    componentDidMount(){
        const {getMovieWatchList,getShowWatchList,auth,movie,show}=this.props;
        getMovieWatchList(auth.user.id);
        // getShowWatchList(auth.user.id);
    }


    // componentDidUpdate(prevProps, prevState, snapshot){
    //     // const {getMovieWatchList,getShowWatchList,auth,movie,show}=prevProps;
    //     // getMovieWatchList(auth.user.id);
    // }

    static getDerivedStateFromProps(props, state){
        console.log("getDerivedStateFromProps");
        console.log(props);
        
    
    }

    renderWatchListMovie(watchListMovie){
        const watchListMovieArray=[];
        if(watchListMovie){
        watchListMovie.map(item=>{
            watchListMovieArray.push(
                <div className='watchListMOvie'>
                  <p>{item.title}</p>
                  <MoveButtonConnect info={item}/>
                </div>
            )
        })
        return watchListMovieArray;
    }
    }
    renderWatchListShow(watchListShow){
        const watchListShowArray=[];
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