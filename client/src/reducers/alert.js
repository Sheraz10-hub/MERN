import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

const intialState = []

export default function(state = intialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_ALERT:
            // state is mutable, we also include any other state that's already there.
            // so we use spread operator so if there already an alert there so we want to copy that
            return [...state, payload ]
            
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);

            // every reducer we create is going to have a default case of just return state. 
        default:
            return state;
    }
}