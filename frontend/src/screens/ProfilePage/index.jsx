import React, { Component } from 'react';
import {WatchListPage,WatchedListPage,FavoriteListPage} from './components/index'
import { Route,Switch,Link} from "react-router-dom";
import { Provider } from 'react-redux';
import {store} from '../../store/store'
// const mapStateToProps = (state) => ({
//     auth: state.auth
// })

// const WrapperInfoPage=connect(mapStateToProps,null)(withRouter(WatchListPage));

class  WrapperPage extends Component {
  render() {
    let root = this.props.match.url;
    return (
      <Provider store = {store}>
        <div className='search_page'>
            <div className='search_page__select_block'>
                <div className='link'><Link to={`${root}/info_page`}>Info Page</Link></div>
                <div className='link'><Link to={`${root}/watch_list`}>Watch List</Link></div>
                <div className='link'><Link to={`${root}/watched_list`}>Watched List</Link></div>
                <div className='link'><Link to={`${root}/favorite_list`}>Favorite List</Link></div>
            </div>
            <Switch>
                <Route path={`${root}/watch_list`} component={WatchListPage}/>
                <Route path={`${root}/watched_list`} component={WatchedListPage}/>
                <Route path={`${root}/favorite_list`} component={FavoriteListPage}/>
            </Switch>
        </div>
      </Provider>
    )
  }
  
}

export default WrapperPage;