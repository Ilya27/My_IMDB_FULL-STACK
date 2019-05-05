import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import history  from '../../../../../components/history';
import{OurProgressRing,OurPagination} from '../../../../../components/index'
class Page extends Component{
    state={
        activePage: '',
    }

    componentDidMount(){
      const {fetchInfo,type,state}=this.props;
      fetchInfo(type,state,1);
    }

    handlePageChange= pageNumber=>{
      const {fetchInfo,type,state}=this.props;
      this.setState({activePage: pageNumber});
      fetchInfo(type,state,pageNumber);
      history.push(`/${type}/${state}/&page=${pageNumber}`);
    }

    cut(value){
      var size = 215;
      if(value.length > size){
      return value.slice(0, size) + ' ...';}else{
        return value
      }
    }


    render() {
        let index=0;
        const {movies}=this.props;
           
        return(
        <div>
          <div className='movies_popular'>
          {
            movies.map(item => (
            <div className={`movie_popular movie_${index++}`} key={item.id}>
              <Link to={`/movie/${item.id}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt='movie_picture'/></Link>
              <div className='info_popular'>
                <h2>{item.title}</h2>
                <p>{item.release_date}</p> 
                <p>{this.cut(item.overview)}</p>
                <div className='container_circle'>
                  <OurProgressRing progress={item.vote_average}/>
                </div>
              </div>
            </div>))
          }
          </div>
          <OurPagination handlePageChange = {this.handlePageChange} activePage={this.state.activePage}/>
        </div>);
    }
}

export default Page;