import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class AddButton extends Component {
    handleClick(movie,userId) {
        let fullInfo={};
        for (var key in movie) {
            fullInfo[key] = movie[key];
        }
        fullInfo.userId=userId;
        fullInfo.type="Want to watch";
        console.log('HII');
        
        axios.post('http://localhost:4000/api/shows/add', fullInfo)
            .then()
            .catch(err => {
                alert('You have already added this show')
        }); 
    }
    render() {
        const {isAuthenticated,user} = this.props.auth;
        console.log(user);
        
        const authLinks = (
            <ul>
                <button onClick={() =>this.handleClick(this.props.info,user.id)}>CLICK</button>
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
class AddButtonConnectShow extends Component {
    render() {
        return(
        <WrapperAddButton info={this.props.info}/>
        )
    }
}


export  default AddButtonConnectShow;