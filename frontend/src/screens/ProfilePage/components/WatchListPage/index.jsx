import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {getMovieWatchList} from '../../../../actions/getMovie';
import {getShowWatchList} from '../../../../actions/getShow';
import store from '../../../../store';
import {WatchedButton,FavoriteButton,RemoveButton} from '../../../../components/index';
import './style.scss';
import { Link } from 'react-router-dom';
import {AddReview,getReviewList} from '../../../../actions/review'
class PageInfo extends Component{
    constructor() {
        super();
        this.state = {
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })

        
    }
    handleSubmit(e) {
        let title_review=e.target.title;
        e.preventDefault();
        const review = {
            title:e.target.title,
            review:this.state[title_review],
            userId:this.props.auth.user._id||this.props.auth.user.id,
        }
        this.props.AddReview(review);
        this.setState({
            [title_review]:this.state[title_review]
        })
    }


    componentDidMount(){
        const {getMovieWatchList,getShowWatchList,auth,getReviewList,review}=this.props;   
        console.log(review);
        getMovieWatchList(auth.user.id);
        getShowWatchList(auth.user.id);
        getReviewList(auth.user.id);
        if(review.review){
            review.review.map(item=>
                this.setState({ [item.title]:item.review})   
            )
        }
    }

    cut(value){
        var size = 211;
        if(value.length > size){
        return value.slice(0, size) + ' ...';}else{
          return value
        }
    }

    renderWatchListMovie(watchListMovie,review){
        const watchListMovieArray=[];
        if(watchListMovie){
        watchListMovie.map(item=>{
            watchListMovieArray.push(
            <div className='movie_block'>
                <div className='logo'>
                    <Link to={`/movie/${item.id}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt='logo'/></Link>
                </div>
                <div className='info'>
                    <h3>{item.title}</h3>
                    <p>{this.cut(item.overview)}</p>
                    <WatchedButton info={item}/>
                    <FavoriteButton info={item}/>
                    <form className='review_block' onSubmit={ this.handleSubmit }  title={item.title}>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Update Review
                        </button>
                    </div>
                    <div className="review">
                        <textarea
                        type="text"
                        placeholder="Your review"
                        name={item.title}
                        onChange={ this.handleInputChange }
                        value={ this.state[item.title]}
                        autoComplete="new-password"/>   
                    </div>
                </form>
                </div>
                <div className='removeButton'>
                    <RemoveButton info={item} type='movies'  status='watch'/>
                </div>
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
                <div className='show_block'>
                    <div className='logo'>
                        <Link to={`/show/${item.id}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt='logo'/></Link>
                    </div>
                    <div className='info'>
                        <h3>{item.name}</h3>
                        <p>{this.cut(item.overview)}</p>
                        <WatchedButton info={item}/>
                        <FavoriteButton info={item}/>
                        <form className='review_block' onSubmit={ this.handleSubmit }  title={item.name}>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Update Info
                            </button>
                        </div>
                        <div className="review">
                            <textarea
                            type="text"
                            placeholder="Your review"
                            name={item.name}
                            onChange={ this.handleInputChange }
                            value={ this.state[item.name]}
                            autoComplete="new-password"/>   
                        </div>
                    </form>
                    </div>
                    <div className='removeButton'>
                        <RemoveButton info={item} type='shows'  status='watch'/>
                    </div>
                </div>
            )
        })
        return watchListShowArray;
    }
    }

    render(){
        const {movie,show,review}=this.props;
        const {watchListMovie}=movie;
        const {watchListShow}=show;
        console.log(this.state);
        
        return(
            <div className='watchListPage'>
            <div className='watchListPage_movie'>
                <div className='title'>
                    <h2>Movies to watch</h2>
                </div>
                <div className='watchListMovie'>
                    {this.renderWatchListMovie(watchListMovie,review)}
                </div>
            </div>
            <div className='watchListPage_show'>
                <div className='title'>
                    <h2>Shows to watch</h2>
                </div>
                <div className='watchListShow'>
                    {this.renderWatchListShow(watchListShow,review)}
                </div>
            </div>
            </div>
        )
    }
}


const mapStateToProps = store => ({
    movie: store.movie,
    auth:store.auth,
    show:store.show,
    review:store.review,
});


const mapDispatchToProps = {
    getMovieWatchList,
    getShowWatchList,
    AddReview,
    getReviewList
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