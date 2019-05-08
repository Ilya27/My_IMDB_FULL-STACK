import React, { Component } from 'react';
import './App.css';
import {Header,Footer} from './Layout/index.js'
import {Router, Route,Switch} from 'react-router-dom';
import history from './components/history';
import { WrapperSearchForm } from './components';
import { MoviesPage,TvShowsPage,MainWrapper,PeoplePage,WrapperSearchPage,ProfilePage,WrapperPage} from './screens';
import Register from './components/Register.js';
import LoginPage from './components/Login';
import { Provider } from 'react-redux';
import store from './store'

class App extends Component {
  render() {
    return (
      <Router history = {history}>
        <div className="App">
          <Header/>
            <WrapperSearchForm/>
              <Switch>
                <Route path="/" exact component={MainWrapper} />
                <Route path="/movie/"  component={MoviesPage} />
                <Route path="/show/"  component={TvShowsPage} />
                <Route path="/person/"  component={PeoplePage} />
                <Route path="/search/"  component={WrapperSearchPage} />
                <Route path="/profile/"  component={WrapperPage} />
                <Provider store = { store }>
                  <Route exact path="/register/" component={ Register } history={history} />
                  <Route exact path="/login/" component={ LoginPage } history={history} />
                </Provider>
            </Switch>
            <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
