import {GET_IMAGE, FAIL_IMAGE, GET_IMAGES} from "../actions/types";

const initialState = {
    medias: [],
    media: null,
    loading: true,
    errors: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_IMAGES:
            return {
                ...state,
                medias: payload,
                loading: false
            };
        case GET_IMAGE:
            return {
                ...state,
                media: payload,
                loading: false
            };
        case FAIL_IMAGE:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}