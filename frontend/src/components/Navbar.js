import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        console.log(user);
        const authLinks = (
            <ul>
            <Link to={`/profile`}>
            <img src={user.avatar} alt={user.name} title={user.name}
                className="rounded-circle"
                style={{ width: '25px', marginRight: '5px'}}/>
            </Link>
                <Link href="" className="nav-link" onClick={this.onLogout.bind(this)}>Logout</Link>
            </ul>
        )
      const guestLinks = (
        <ul>
            <li>
                <Link to="/register">Sign Up</Link>
            </li>
            <li>
                <Link  to="/login">Sign In</Link>
            </li>
        </ul>
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