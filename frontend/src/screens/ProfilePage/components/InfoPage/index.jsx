import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
class InfoPage extends Component{
    state={
        movies:[],
    }
    componentDidMount(){
        axios.get('http://localhost:4000/api/movies/getMovies',{
            params: {
              userId: this.props.auth.user.id
            }
          })
            .then(data=>this.setState({movies:data.data}))
            .catch(err => {
        }); 
    }

    renderMovies(){
        console.log(this.state.movies);
        if(this.state.movies){
            return (this.state.movies.map(item=>(
                <div>
                    <p>{item.title}</p>
                    <Link to={`/movie/${item.id}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt='picture'/></Link>
                </div>
            )))
            
        }
    }
    render(){
        return(
            <div>
                {this.renderMovies()}
            </div>
        )
    }
}

export default InfoPage;