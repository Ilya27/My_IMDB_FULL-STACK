import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {MoveMovieFavorite} from '../../actions/moveMovie';
import {MoveShowFavorite} from '../../actions/moveShow'
import { Link } from 'react-router-dom';
import IcoMoon from 'react-icomoon';
class MoveButton extends Component {
    handleClick(info) {
        const {MoveMovieFavorite,MoveShowFavorite} = this.props;
        console.log(this.props);
        if(info.isShow){
            MoveShowFavorite(info)
        }else{
            MoveMovieFavorite(info)
        }
    
    }

    render() {
        return (
            <div>
                <ul>
                    <Link className='favorite_link' title="Add to Favorite" onClick={() =>this.handleClick(this.props.info)}><span></span><IcoMoon icon="star-full" /></Link>
                </ul>
            </div>
        )
    }
}


const mapDispatchToProps = {
    MoveMovieFavorite,
    MoveShowFavorite,
  };
  
    

const WrapperMoveButton=connect(null,mapDispatchToProps)(withRouter(MoveButton));
class FavoriteButton extends Component {
    render() {
        return(
        <WrapperMoveButton info={this.props.info} />
        )
    }
}


export  default FavoriteButton;