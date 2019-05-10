import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class AddButton extends Component {
    handleClick(movie,userId,type) {
        let fullInfo={};
        for (var key in movie) {
            fullInfo[key] = movie[key];
        }
        fullInfo.userId=userId;
        if(type==='persons'){
            fullInfo.type='Favorite';  
        }else{
            fullInfo.type="Want to watch";
        }
        axios.post(`http://localhost:4000/api/${type}/add`, fullInfo)
            .then()
            .catch(err => {
                alert('You have already added this person')
        }); 
    }
    render() {
        const {isAuthenticated,user} = this.props.auth;
        console.log(user);
        
        const authLinks = (
            <ul>
                <button onClick={() =>this.handleClick(this.props.info,user.id,this.props.type)}>CLICK</button>
            </ul>
        )
        const guestLinks = (
            <ul>
                <button  disabled={true}>CLICK</button>
            </ul>
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