import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {getMovieWatchedList} from '../../../../actions/getMovie';
import {getShowWatchedList} from '../../../../actions/getShow';
import store from '../../../../store';
import { Link } from 'react-router-dom';
import {FavoriteButton,RemoveButton} from '../../../../components/index';
import './style.scss';
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
        console.log(e.target.name);
        
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    handleSubmit(e) {
        console.log(e.target.title);
        
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
        const {getMovieWatchedList,getShowWatchedList,auth,getReviewList,review}=this.props;
        getMovieWatchedList(auth.user.id);
        getShowWatchedList(auth.user.id);
        getReviewList(auth.user.id);
        if(review.review){
            review.review.map(item=>{
                console.log(item.title);
                this.setState({ [item.title]:item.review})   
            }
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
      
    renderWatchedListMovie(watchedListMovie){
    const watchedListMovieArray=[];
    if(watchedListMovie){
        watchedListMovie.map(item=>{
        watchedListMovieArray.push(
        <div className='movie_block'>
            <div className='logo'>
                <Link to={`/movie/${item.id}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt='logo'/></Link>
            </div>
            <div className='info'>
                <h3>{item.title}</h3>
                <p>{this.cut(item.overview)}</p>
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
                <RemoveButton info={item} type='movies' status='watched'/>
            </div>
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
            <div className='show_block'>
                <div className='logo'>
                    <Link to={`/show/${item.id}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt='logo'/></Link>
                </div>
                <div className='info'>
                    <h3>{item.name}</h3>
                    <p>{this.cut(item.overview)}</p>
                    <FavoriteButton info={item}/>
                    <form className='review_block' onSubmit={ this.handleSubmit }  title={item.name}>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Update Review
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
                    <RemoveButton info={item} type='shows' status='watched'/>
                </div>
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
        console.log(this.state);
        return(
        <div className='watchedListPage'>
            <div className='watchedListPage_movie'>
                <div className='title'>
                    <h2>Watched Movies</h2>
                </div>
                <div className='watchedListMovie'>
                    {this.renderWatchedListMovie(watchedListMovie)}
                </div>
            </div>
            <div className='watchedListPage_show'>
                <div className='title'>
                    <h2>Watched Shows</h2>
                </div>
                <div className='watchedListShow'>
                    {this.renderWatchedListShow(watchedListShow)}
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
    getMovieWatchedList,
    getShowWatchedList,
    AddReview,
    getReviewList
  };
  
    
const ConnectWatchedList = connect(mapStateToProps,mapDispatchToProps)(PageInfo);

class WatchedListPage extends Component{
    render (){
        return(
            <Provider store={store}>
                <ConnectWatchedList/>
            </Provider>
        )
    }
}
  

export default WatchedListPage;