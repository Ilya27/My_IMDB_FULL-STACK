import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {getMovieFavoriteList} from '../../../../actions/getMovie';
import {getShowFavoriteList} from '../../../../actions/getShow';
import {getPersonFavoriteList} from '../../../../actions/getPerson'
import store from '../../../../store';
import './style.scss';
import { Link } from 'react-router-dom';
import {RemoveButton} from '../../../../components/index';
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
        const {getMovieFavoriteList,getShowFavoriteList,auth, getPersonFavoriteList,getReviewList,review}=this.props;
        getMovieFavoriteList(auth.user.id);
        getShowFavoriteList(auth.user.id);
        getPersonFavoriteList(auth.user.id);
        getReviewList(auth.user.id);
        if(review.review){
            review.review.map(item=>{
                this.setState({ [item.title]:item.review})   
            })
        }
    }

    cut(value){
        var size = 211;
        if(value.length > size){
        return value.slice(0, size) + ' ...';}else{
          return value
        }
    }

    renderFavoriteListMovie(favoriteListMovie){
        const favoriteListMovieArray=[];
        if(favoriteListMovie){
            favoriteListMovie.map(item=>{
                favoriteListMovieArray.push(
                    <div className='movie_block'>
                        <div className='logo'>
                            <Link to={`/movie/${item.id}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt='logo'/></Link>
                        </div>
                    <div className='info'>
                        <h3>{item.title}</h3>
                        <p>{this.cut(item.overview)}</p>
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
                        <RemoveButton info={item} type='movies'  status='favorite'/>
                    </div>
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
                    <div className='show_block'>
                        <div className='logo'>
                            <Link to={`/show/${item.id}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt='logo'/></Link>
                        </div>
                        <div className='info'>
                            <h3>{item.name}</h3>
                            <p>{this.cut(item.overview)}</p>
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
                            <RemoveButton  info={item} type='shows'  status='favorite'/>
                        </div>
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
                <div className='person_block'>
                    <div className='image'>
                        <Link to={`/show/${item.id}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.profile_path}`} alt='logo'/></Link>
                    </div>
                    <div className='info'>
                        <h3>{item.name}</h3>
                        <p>{this.cut(item.biography)}</p>
                    </div>
                    <div className='removeButton'>
                        <RemoveButton info={item} type='persons' status='favorite'/>
                    </div>
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
        <div className='favoriteListPage'>
             <div className='favoriteListPage_movie'>
                 <div className='title'>
                    <h2>Favorite Movies</h2>
                 </div>
                 <div className='favoriteListMovie'>
                     {this.renderFavoriteListMovie(favoriteListMovie)}
                 </div>
             </div>
             <div className='favoriteListPage_show'>
                 <div className='title'>
                    <h2>Favorite Shows</h2>
                 </div>
                 <div className='favoriteListShow'>
                    {this.renderFavoriteListShow(favoriteListShow)}
                 </div>
             </div>
             <div className='favoriteListPage_person'>
                 <div className='title'>
                    <h2>Favorite Stars</h2>
                 </div>
                 <div className='favoriteListPerson'>
                    {this.renderFavoriteListPerson(favoriteListPerson)}
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
    person:store.person,
    review:store.review,
});


const mapDispatchToProps = {
    getMovieFavoriteList,
    getShowFavoriteList,
    getPersonFavoriteList,
    getReviewList,
    AddReview
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