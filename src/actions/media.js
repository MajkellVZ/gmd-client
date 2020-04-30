import axios from 'axios';
import {GET_IMAGE, FAIL_IMAGE, GET_IMAGES} from "../actions/types";
import {setAlert} from "./alert";

const API_URL = 'http://165.227.251.127/api';
// const API_URL = 'http://localhost:5000/api';

export const getImages = (id) => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/media/product/${id}`);

        dispatch({
            type: GET_IMAGES,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: FAIL_IMAGE,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const getImage = (id) => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/media/single_image/product/${id}`);

        dispatch({
            type: GET_IMAGE,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: FAIL_IMAGE,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
};

export const createMedia = (id, formData) => async dispatch => {
    try {
        const data = new FormData();

        for (var x = 0; x < formData.media.length; x++) {
            console.log(formData.media[x]);
            data.append('photos', formData.media[x])
        }

        const res = await axios.post(`${API_URL}/media/${id}`, data);

        res.data.forEach(msg => {
            dispatch(setAlert(msg, 'success'));
        })

    } catch (e) {
        dispatch({
            type: FAIL_IMAGE,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

export const deleteMedia = (id) => async dispatch => {
    try {
        await axios.delete(`${API_URL}/media/${id}`);

        dispatch(setAlert('Imazhi u fshi', 'success'));
    } catch (e) {
        dispatch({
            type: FAIL_IMAGE,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};
