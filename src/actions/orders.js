import axios from 'axios';
import {FAIL_ORDERS, GET_ORDERS, ORDER_NO_SUCCESS, ORDER_SUCCESS} from "./types";
import {setAlert} from "./alert";

const API_URL = 'https://gmd-server.xyz/api';
// const API_URL = 'http://localhost:5000/api';

export const buy = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await axios.post(`${API_URL}/orders`, formData, config);
        // dispatch(setAlert(res.data, 'success'));
        dispatch({
            type: ORDER_SUCCESS
        })
    } catch (e) {
        const errors = e.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: FAIL_ORDERS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const getOrders = (page = 1) => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/orders?page=` + page);

        dispatch({
            type: GET_ORDERS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FAIL_ORDERS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const filterOrders = (search_term, page = 1) => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/filter/orders?search_term=${search_term}&page=${page}`);

        dispatch({
            type: GET_ORDERS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FAIL_ORDERS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const deleteOrders = id => async dispatch => {
    try {
        const res = await axios.delete(`${API_URL}/orders/${id}`);
        dispatch(setAlert(res.data, 'success'));
        getOrders();
    } catch (e) {
        dispatch({
            type: FAIL_ORDERS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const closeSuccessModal = () => async dispatch => {
    dispatch({
        type: ORDER_NO_SUCCESS
    })
}



