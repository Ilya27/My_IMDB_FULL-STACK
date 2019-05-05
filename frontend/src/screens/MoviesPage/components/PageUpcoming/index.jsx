import React, { Component } from 'react';
import { fetchInfo} from '../../../../store/action';
import { Provider, connect } from 'react-redux';
import {store} from '../../../../store/store';
import Page from './components/page';
import './style.scss';

const mapStateToProps = store => ({
  movies: store.movies,
});

const mapDispatchToProps = {
  fetchInfo,
};

const PageUpcoming = connect(mapStateToProps, mapDispatchToProps)(Page);


class WrraperPageUpcoming extends Component{
  render(){
    let type=this.props.match.url.toLowerCase().split('/')[1]
    let state=this.props.match.url.toLowerCase().split('/')[2];
    return(
      <Provider store = {store} >
        <PageUpcoming type={type} state={state}/>
      </Provider>
      )
    }
}

export default WrraperPageUpcoming;