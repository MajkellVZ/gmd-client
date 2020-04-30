import React, {Fragment, useState} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from "../actions/auth";
import NavBar from "../components/NavBar";
import Alert from "../components/Alert";

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <Fragment>
            <NavBar/>
            <br/>
            <Alert/>
            <div className={'login'}>
                <div className={'row'}>
                    <div className={'col-md-4 offset-md-4 about-us'}>
                        <form onSubmit={e => onSubmit(e)}>
                            <p><label>Email</label>
                            <input type="text"
                                   name="email"
                                   className={'w3-input'}
                                   required={true}
                                   value={email}
                                   onChange={e => onChange(e)}
                            /></p>
                            <p><label>Password</label>
                            <input type="password"
                                   name="password"
                                   className={'w3-input'}
                                   required={true}
                                   minLength="6"
                                   value={password}
                                   onChange={e => onChange(e)}
                            /></p>
                            <input type="submit" value="Login" className={'btn btn-warning'}/>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);