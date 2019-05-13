import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store from '../../../../store';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import {UpdateInfo} from '../../../../actions/updateInfo'
import './style.scss'
class PageInfo extends Component{
    constructor() {
        super();
        this.state = {
            name: '',
            password_new: '',
            password_old: '',
            password_confirm: '',
            errors: {},
            file: '',
            imagePreviewUrl: '',
            infoAbout:'',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(e) {
        
        this.setState({
            [e.target.name]: e.target.value
        })


    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            password_new:this.state.password_new,
            password_old: this.state.password_old,
            password_confirm: this.state.password_confirm,
            imagePreviewUrl:this.state.imagePreviewUrl,
            infoAbout:this.state.infoAbout,
            _id:this.props.auth.user._id||this.props.auth.user.id,
        }
        this.props.UpdateInfo(user);
        this.setState({password_new:'',
        password_old:'',
        password_confirm:'',
        infoAbout:this.state.infoAbout
        })
    }

    componentDidMount(){
        this.setState({name:this.props.auth.user.name,
        infoAbout:this.props.auth.user.infoAbout})   
    }

    
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({_id:nextProps.auth.user._id});
    if(nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
}
    render(){
        const { errors } = this.state;
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} alt='img'/>);
        } else {
          $imagePreview = ( <img src={this.props.auth.user.avatar} alt='img'/>);
        }
        return(
            <form className='info_page' onSubmit={ this.handleSubmit }>
                <div>
                    <div className="imgPreview">
                        {$imagePreview}
                    </div>
                    <div className='changePassword'>
                    <h2> Change Password </h2>
                    <div className="form-group">
                        <input
                     type="password"
                        placeholder="Old Password"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password_old
                        })}
                        name="password_old"
                        onChange={ this.handleInputChange }
                        value={ this.state.password_old }
                        autoComplete="new-password"
                        />
                        {errors.password_old && (<div className="invalid-feedback">{errors.password_old}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="New Password"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password_new
                        })}
                        name="password_new"
                        onChange={ this.handleInputChange }
                        value={ this.state.password_new}
                        autoComplete="new-password"
                        />
                        {errors.password_new && (<div className="invalid-feedback">{errors.password_new}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Confirm Password"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password_confirm
                        })}
                        name="password_confirm"
                        onChange={ this.handleInputChange }
                        value={ this.state.password_confirm }
                        autoComplete="new-password"
                        />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Update Info
                        </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="login">
                    <h2>Your Login</h2>
                        <input
                        title='You can change your login'
                        type="text"
                        placeholder="Login"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.login
                        })}
                        name="name"
                        onChange={ this.handleInputChange }
                        value={ this.state.name}
                        autoComplete="new-password"
                        />
                        {errors.login && (<div className="invalid-feedback">{errors.login}</div>)}
                    </div>
                    <div className="additionalInfo">
                        <textarea
                        type="text"
                        placeholder="Info about you"
                        name="infoAbout"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.login
                        })}
                        onChange={ this.handleInputChange }
                        value={ this.state.infoAbout}
                        autoComplete="new-password"/>   
                    </div>
                </div>
                </form>
        )
    }
}

const mapStateToProps = store => ({
    auth:store.auth,
    errors:store.errors,
});


const mapDispatchToProps = {
    UpdateInfo,
  };
  
    
const ConnectPageInfo = connect(mapStateToProps,mapDispatchToProps)(PageInfo);

class WrapperPageInfo extends Component{
    render (){
        return(
            <Provider store={store}>
                <ConnectPageInfo/>
            </Provider>
        )
    }
}
  


export default WrapperPageInfo;