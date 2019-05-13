import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LogoPic  from '../../../../assets/img/logo2.png';
class Logo extends Component {
  render() {
    return (
          <Link to='/'>
            <img src={LogoPic} alt="Logo"/>
          </Link>
    );
  }
}

export default Logo;