import axios from 'axios';
import {GET_IMPORTANT_PRODUCTS, FAIL_IMPORTANT_PRODUCTS} from "../actions/types";

const API_URL = 'http://165.227.251.127/api';
// const API_URL = 'http://localhost:5000/api';

export const getImportantProducts = () => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/filter/important`);

        dispatch({
            type: GET_IMPORTANT_PRODUCTS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: FAIL_IMPORTANT_PRODUCTS,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};