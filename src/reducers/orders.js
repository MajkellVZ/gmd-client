import {FAIL_ORDERS, GET_ORDERS, ORDER_SUCCESS, ORDER_NO_SUCCESS} from "../actions/types";

const initialState = {
    orders: [],
    order: null,
    loading: true,
    errors: null,
    order_success: false
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
        case ORDER_SUCCESS:
            return {
                ...state,
                order_success: true,
                loading: false
            }
        case ORDER_NO_SUCCESS:
            return {
                ...state,
                order_success: false,
                loading: false
            }
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