import {GET_IMPORTANT_PRODUCTS, FAIL_IMPORTANT_PRODUCTS} from "../actions/types";

const initialState = {
    important_products: [],
    loading: true,
    errors: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_IMPORTANT_PRODUCTS:
            return {
                ...state,
                important_products: payload,
                loading: false
            };
        case FAIL_IMPORTANT_PRODUCTS:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}