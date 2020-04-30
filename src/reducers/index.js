import {combineReducers} from "redux";
import alert from './alert';
import auth from "./auth";
import important_products from "./important_products";
import media from "./media";
import products from "./products";
import orders from "./orders";

export default combineReducers({
    alert, auth, important_products, media, products, orders
});