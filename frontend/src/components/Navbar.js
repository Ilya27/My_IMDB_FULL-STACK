import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import './navbar.scss'
class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <div className='authLinks'>
                <Link to={`/profile`}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}}/>
                </Link>
                <div className="link_Logout">
                    <Link href=""  onClick={this.onLogout.bind(this)}>Logout</Link>
                </div>
            </div>
        )
      const guestLinks = (
        <div className='guestLinks'>
            <Link to="/register">Sign Up</Link>
            <Link  to="/login">Sign In</Link>
        </div>
      )
        return(
            <nav>
                <div>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const WrapperNavbar=connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
class NavbarConnect extends Component {
    render() {
        return(
        <WrapperNavbar/>
        )
    }
}

export  default NavbarConnect;