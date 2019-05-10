import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {MoveMovie} from '../../actions/moveMovie'
import {getMovieWatchList} from '../../actions/getMovie';
class MoveButton extends Component {
    state={
        title:''
    }
    handleClick(movie) {
        const {MoveMovie,getMovieWatchList,auth} = this.props;
        MoveMovie(movie);
    }


    // static getDerivedStateFromProps(props, state){
    //     return state.name=props.info.title
    // }

    // componentDidUpdate(prevProps, prevState, snapshot){;
    //     // const {getMovieWatchList,getShowWatchList,auth,movie,show}=prevProps;
    //     // if(prevState.title!==this.state.title){
    //     //     getMovieWatchList(auth.user.id)
    //     // }

    // }

    render() {

        return (
            <div>
                <ul>
                    <button onClick={() =>this.handleClick(this.props.info)}>CLICK</button>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
   MoveMovie,
   getMovieWatchList,
  };
  
    

const WrapperMoveButton=connect(mapStateToProps,mapDispatchToProps)(withRouter(MoveButton));
class MoveButtonConnect extends Component {
    render() {
        return(
        <WrapperMoveButton info={this.props.info} />
        )
    }
}


export  default MoveButtonConnect;