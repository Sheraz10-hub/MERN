import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from '../actions/types';

const initalstate = {
    // token that we get back we store it in local stroage
    token: localStorage.getItem('token'), // look for item called token
    isAuthenticated: null,
    loading: true,
    user: null,
}

export default function (state = initalstate, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload  // payload include the user, name, email, avatar thats stuff
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            // set token to payload.token
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload, // payload is just a token here
                isauthentication: true,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isauthentication: false,
                loading: false
            };
        default:
            return state;
    }

}