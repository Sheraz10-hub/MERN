// we are sending request so we need axios
import axios from 'axios';
// import { setAlert } from './alert'; // also need of alert here
import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

// GET current users profile
export const getCurrentProfile = () => async dispatch => {
    console.log("fetching profile-1")
    try {
        // fetching the data as a res
        console.log('fetching profile-2');
        const res = await axios.get('/api/profile/me');
        console.log("Fetching profile-3");
        dispatch({
            type: GET_PROFILE,
            payload: res.data 
        });
        console.log('dispatch')
    } catch (err) {
        console.log('fetching-data-error')
        dispatch({
            type: PROFILE_ERROR,
            // payload is an object of msg and status code 404 or 401 etc
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};