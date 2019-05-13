import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IcoMoon from 'react-icomoon';
class AddButton extends Component {
    handleClick(info,userId,type) {
        let fullInfo={};
        for (var key in info) {
            fullInfo[key] = info[key];
        }
        fullInfo.userId=userId;
        if(type==='shows'){
            fullInfo.isShow=true;
        }
        if(type==='persons'){
            fullInfo.type='Favorite';  
        }else{
            fullInfo.type="Want to watch";
        }
        console.log(fullInfo);
        axios.post(`http://localhost:4000/api/${type}/add`, fullInfo)
            .then()
            .catch(err => {
                alert('You have already added this')
        });    
    }
    checkIcon(type){
        if(type==='persons'){
            return <IcoMoon  className='star-full' icon="star-full" /> 
        }else{
            return <IcoMoon icon="bookmark" />
        }
    }

    render() {
        const {isAuthenticated,user} = this.props.auth;
        
        const authLinks = (
            <Link title="Add to your watchlist" className='authLinks' onClick={() =>this.handleClick(this.props.info,user.id,this.props.type)}><span></span>{this.checkIcon(this.props.type)}</Link>
        )
        const guestLinks = (
            <Link title="Sign in to add to your watchlist " className='guestLinks'>{this.checkIcon(this.props.type)}</Link>
        )

        return (
            <div>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const WrapperAddButton=connect(mapStateToProps,null)(withRouter(AddButton));
class AddButtonConnect extends Component {
    render() {
        return(
        <WrapperAddButton info={this.props.info} type={this.props.type}/>
        )
    }
}


export  default AddButtonConnect;