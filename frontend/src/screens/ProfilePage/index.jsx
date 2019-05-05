import React, { Component } from 'react';
import {InfoPage} from './components/index'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../../store'



const mapStateToProps = (state) => ({
    auth: state.auth
})

const WrapperInfoPage=connect(mapStateToProps,null)(withRouter(InfoPage));
class ProfilePage extends Component{
    render()
    {
        return(
        <Provider store={store}>
             <WrapperInfoPage></WrapperInfoPage>
        </Provider>
        )
    }
}

export default ProfilePage;