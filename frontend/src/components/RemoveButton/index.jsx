import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IcoMoon from 'react-icomoon';
import {RemoveMovie} from '../../actions/moveMovie';
import {RemoveShow} from '../../actions/moveShow';
import {RemovePerson} from '../../actions/movePerson';
class RemoveButton extends Component {
    handleClick(info,userId,type) {
        const{RemoveMovie,RemoveShow,RemovePerson}=this.props;
        let fullInfo={};
        for (var key in info) {
            fullInfo[key] = info[key];
        }
        if(type==='shows'){
            RemoveShow(fullInfo,type,userId,this.props.status);
        }else if(type==='persons'){
            RemovePerson(fullInfo,type,userId,this.props.status);
        }else{
            RemoveMovie(fullInfo,type,userId,this.props.status);
        }

    }


    render() {
        const {user} = this.props.auth;
        return (
                <Link title="Remove this item" className='removeButton' onClick={() =>this.handleClick(this.props.info,user.id,this.props.type)}><span></span><IcoMoon icon="cross" /></Link>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    RemoveMovie,
    RemovePerson,
    RemoveShow
  };
  

const WrapperAddButton=connect(mapStateToProps,mapDispatchToProps)(withRouter(RemoveButton));
class RemoveButtonConnect extends Component {
    render() {
        return(
        <WrapperAddButton info={this.props.info} type={this.props.type} status={this.props.status}/>
        )
    }
}


export  default RemoveButtonConnect;