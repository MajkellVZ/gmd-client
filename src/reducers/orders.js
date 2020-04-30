import {FAIL_ORDERS, GET_ORDERS} from "../actions/types";

const initialState = {
    orders: [],
    order: null,
    loading: true,
    errors: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: payload,
                loading: false
            };
        case FAIL_ORDERS:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}