import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

// I want to be able to dispatch more than one action from our action 
// arrow dispatch and then another arrow with function body and we are able to do this because of that thunk middleware
// for now takes two things msg and the alertType
export const setAlert = (msg, alertType) => dispatch => {
    // Now remember what i told you in act alerts going to look it will have an ID, it'll have a message and have alert type
    // Now for the ID. we want to randomly generate this so we could do this with vanilla javascript

    // for getting universal id: take uuid and it have different versions, we are using version 4
    const id = uuid.v4(); // which gives us random loog string

    // now we want to call SET_ALERT, which is in ./reducer/alert.js
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    })
}