import axios from 'axios';
import {
    GET_PRODUCTS,
    FAIL_PRODUCTS,
    GET_PRODUCT,
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCTS_ALL,
    GET_PRODUCTS_BY_NAME_CATEGORY
} from "../actions/types";
import {setAlert} from "./alert";

const API_URL = 'https://gmd-server.xyz/api';
// const API_URL = 'http://localhost:5000/api';

export const getProducts = () => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/products`);

        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const getProductsAdmin = (page = 1) => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/products/admin?page=` + page);

        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const getProduct = (id) => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/products/` + id);

        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const getProductsByCategory = (category) => async dispatch => {
    try {
        // const res = await axios.get('http://localhost:5000/api/filter/category/' + category);

        dispatch({
            type: GET_PRODUCTS_BY_CATEGORY,
            payload: category
            // payload: res.data
        });
    } catch (e) {
        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const getProductsAll = () => async dispatch => {
    try {
        dispatch({
            type: GET_PRODUCTS_ALL,
        });
    } catch (e) {
        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const filterProducts = (search_term, page = 1) => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/filter?search_term=${search_term}&page=${page}`);

        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const insertProduct = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post(`${API_URL}/products`, formData, config);
        dispatch(setAlert(res.data, 'success'));
    } catch (e) {
        const errors = e.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const updateProduct = (id, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put(`${API_URL}/products/`+id, formData, config);
        dispatch(setAlert(res.data, 'success'));
    } catch (e) {
        const errors = e.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const deleteProducts = (id) => async dispatch => {
    try {
        const res = await axios.delete(`${API_URL}/products/${id}`);
        dispatch(setAlert(res.data, 'success'));
    } catch (e) {
        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const makeImportant = id => async dispatch => {
    try {
        const res = await axios.put(`${API_URL}/products/important/${id}`);
        dispatch(setAlert(res.data, 'success'));
    } catch (e) {
        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const makeUnimportant = id => async dispatch => {
    try {
        const res = await axios.put(`${API_URL}/products/unimportant/${id}`);
        dispatch(setAlert(res.data, 'success'));
    } catch (e) {
        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const filterProductsNameCategory = (name, category) => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/filter/name/category?name=${name}&category=${category}`);

        dispatch({
            type: GET_PRODUCTS_BY_NAME_CATEGORY,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: FAIL_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};