// we are sending request so we need axios
import axios from 'axios';
import { setAlert } from './alert'; // also need of alert here
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
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// GET current users profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // send data with axios and getting response
        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Update' : 'Profile Create', 'success'));

        // if i editing it I'm not going to redirect I'm stay on page
        // if i creating it then i want to redirect.

        // redirecting in an action is a little different we cant use the redirect like 
        // we do in the components like return redirect or whatever 
        // so we have to pass in the history object which has push method on it. 
        if(!edit) {
            history.push('/dashboard');
        }

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}