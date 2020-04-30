import React from "react";
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';
import PropTypes from "prop-types";

const cookies = new Cookies();

const NavBar = ({type, auth}) => {
    return (
        <div>
            <nav
                className={type === 'toys' ? "navbar navbar-expand navbar-light gmd-nav-toys" : "navbar navbar-expand navbar-light gmd-nav"}>
                <div className={'container'}>
                    <Link to={'/'}><a className="navbar-brand" href=""
                                      style={type === 'toys' ? {color: 'pink', fontSize: '20px'} : {color: '#00303F', fontSize: '20px'}}>GMD</a></Link>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <div className="navbar-nav">
                            <Link to={'/shop'}><a className="nav-item nav-link" href=""
                                                  style={type === 'toys' ? {color: 'pink', fontSize: '16px'} : {color: '#00303F', fontSize: '16px'}}>SHOP</a></Link>
                        </div>
                        {auth &&
                        <div className="navbar-nav">
                            <Link to={'/dashboard'}><a className="nav-item nav-link" href=""
                                                       style={type === 'toys' ? {color: 'pink', fontSize: '16px'} : {color: '#00303F', fontSize: '16px'}}>DASHBOARD</a></Link>
                        </div>
                        }
                    </div>
                    <Link to={'/cart'}><a href="" className={type === 'toys' ? "notification-toys" : "notification"}>
                        <i className="fa fa-shopping-cart fa-2x"></i>
                        <span
                            className="badge">{cookies.get('quantity') && parseInt(cookies.get('quantity')) > 0 ? cookies.get('quantity') : ''}</span>
                    </a></Link>
                </div>
            </nav>
        </div>
    )
};

NavBar.propTypes = {
    type: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

export default NavBar;