import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {MoveMovieWatched} from '../../actions/moveMovie';
import {MoveShowWatched}  from '../../actions/moveShow';
import { Link } from 'react-router-dom';
import IcoMoon from 'react-icomoon';
class MoveButton extends Component {
    handleClick(info) {
        const {MoveShowWatched,MoveMovieWatched} = this.props;
        console.log(this.props);
        if(info.isShow){
            MoveShowWatched(info)
        }else{
            MoveMovieWatched(info)
        }
    }

    render() {
        return (
            <Link className='watched_link' title="Add to Watched" onClick={() =>this.handleClick(this.props.info)}><span></span><IcoMoon icon="binoculars" /></Link>
        )
    }
}


const mapDispatchToProps = {
    MoveMovieWatched,
    MoveShowWatched,
  };
  
    

const WrapperMoveButton=connect(null,mapDispatchToProps)(withRouter(MoveButton));
class WatchedButton extends Component {
    render() {
        return(
        <WrapperMoveButton info={this.props.info} />
        )
    }
}


export  default WatchedButton;