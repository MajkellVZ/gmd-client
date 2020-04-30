import {
    GET_PRODUCTS,
    FAIL_PRODUCTS,
    GET_PRODUCT,
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCTS_ALL,
    GET_PRODUCTS_BY_NAME_CATEGORY
} from "../actions/types";

const initialState = {
    products2: [],
    products: [],
    product: null,
    loading: true,
    errors: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products2: payload,
                products: payload,
                loading: false
            };
        case GET_PRODUCTS_BY_NAME_CATEGORY:
            return {
                ...state,
                products: payload,
                loading: false
            };
        case GET_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                // products: payload,
                products: {
                    data: state.products2.data.filter(product => product.category === payload)
                },
                loading: false
            };
        case GET_PRODUCTS_ALL:
            return {
                ...state,
                products: state.products2,
                loading: false
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false
            };
        case FAIL_PRODUCTS:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}