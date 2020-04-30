import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../actions/auth";
import {Link} from "react-router-dom";
import NavBar from "../components/NavBar";

const Dashboard = ({logout, auth}) => {
    return (
        <div>
            <NavBar auth={auth.isAuthenticated}/>
            <div className={'dashboard'}>
                <Link to={'/orders'}><a href={''} className={'btn btn-yellow btn-dashboard'}><i className={'fa fa-shopping-cart fa-lg fa-2x'}></i><br/>Orders</a></Link>
                <Link to={'/products'}><a href={''} className={'btn btn-yellow btn-dashboard'}><i className={'fa fa-archive fa-lg fa-2x'}></i><br/>Products</a></Link>
                <button onClick={logout} className={'btn btn-danger btn-dashboard'}><i className={' fa fa-sign-out fa-lg fa-2x'}></i><br/>Dil</button>
            </div>
        </div>
    )
};

Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Dashboard);