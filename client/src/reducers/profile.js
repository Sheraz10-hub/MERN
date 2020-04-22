import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE
} from '../actions/types';

const initialstate = {
    profile: null, // singular profile (by default null)
    profiles: [],  // all profiles data
    repos: [],     // list of developers
    loading: true,
    error: {}     // error object if any error in the request
}

export default function (state = initialstate, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,  // current state
                profile: payload, // payload is here current user
                loading: false
            }

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload, // payload is here error msg and status code 
                loading: false
            }

        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
            
        default:
            return state;
    }
}