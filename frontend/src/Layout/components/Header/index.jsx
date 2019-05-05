import React, { Component } from 'react';
import Menu from './components/Menu';
import './style.scss';
import { Provider } from 'react-redux';
import store from '../../../store';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../../setAuthToken';
import { setCurrentUser, logoutUser } from '../../../actions/authentication';
import Navbar from '../../../components/Navbar';


if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}


  class Header extends Component {
  render() {
    console.log(store);
    return (
        <header className='header'> 
          <Menu/>
            <Provider store = { store }>
              <Navbar />
            </Provider>
        </header>
    );
  }
}

export default Header;