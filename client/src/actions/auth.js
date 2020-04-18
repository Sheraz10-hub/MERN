// where we make our http request
import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register User
// as we send http request so we use async
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        // sending data in this case
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // preparing data to send
    const body = JSON.stringify({ name, email, password })

    try {
        // making a post request, post request m
        // so that will get the response
        const res = await axios.post('./api//users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            // payload is gonna be data that we get back in this case it is token, 
            // as we known we get token on a successful response
            payload: res.data
        })

    } catch (err) {

        // remember if user forget like name, email or something we're gonna get an array of errors from our backend
        // so i want to show an alert for each error.
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: REGISTER_FAIL
        })
    }

}  
