import React, {useEffect} from 'react';
import './App.css';
import Home from "./views/Home";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from "./components/routing/PrivateRoute";
import Page404 from "./components/Page404";
import Shop from "./views/Shop";
import Login from "./views/Login";
import {Provider} from 'react-redux';
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import Product from "./views/Product";
import Products from "./views/Products";
import Cart from "./views/Cart";
import Orders from "./views/Order";
import Dashboard from "./views/Dashboard";
import ProductEdit from "./views/ProductEdit";
import Media from "./views/Media";
import CookieConsent, { Cookies } from "react-cookie-consent";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <div className="App">
            <Provider store={store}>
                <CookieConsent
                    buttonText="Kuptoj"
                    style={{ background: "#d4d4dc" }}
                    buttonStyle={{ background: "#feda6a", color: "#1F3044", fontSize: "14px" }}>
                    Kjo faqe web-i perdor cookies per te permirsuar eksperiencen e perdoruesit
                </CookieConsent>
                <Router>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/shop" component={Shop}/>
                        <Route path="/product/:id" component={Product}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/cart" component={Cart}/>
                        <PrivateRoute path="/dashboard" component={Dashboard}/>
                        <PrivateRoute path="/products" component={Products}/>
                        <PrivateRoute path="/edit/product/:id" component={ProductEdit}/>
                        <PrivateRoute path="/media/product/:id" component={Media}/>
                        <PrivateRoute path="/orders" component={Orders}/>
                        <Route path="*" component={Page404}/>
                    </Switch>
                </Router>
                <Footer/>
            </Provider>
        </div>
    );
};

export default App;
