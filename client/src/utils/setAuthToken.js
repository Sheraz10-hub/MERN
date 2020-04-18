/** its just going be a function that takes a token
 if the token is there then its going to add it to headers
 if not its gonna delete it from the headers
*/

// we are not making a requset with axios we just we are adding a global header.
import axios from 'axios';

const setAuthToken = token => {
    // the token we pass it, it comes from localstorage
    if(token) {
        // if token then set global header
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;

/**
    So reason we are doing this is so that when we have a token which you we're just going 
    to send it with every request instead of picking and choosing which request
    to send it with
 */