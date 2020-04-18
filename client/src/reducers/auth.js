import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initalstate = {
    // token that we get back we store it in local stroage
    token: localStorage.getItem('token'), // look for item called token
    isAuthenticated: null,
    loading: true,
    user: null,
}

export default function(state = initalstate, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            // set token to payload.token
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload, // payload is just a token here
                isauthentication: true,
                loading: false
            }

        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null, 
                isauthentication: false,
                loading: false
            }
    
        default:
            return state;
    }

}