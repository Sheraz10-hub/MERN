import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; // which is middleware
import rootReducer from './reducers'; // we are multiple reducers so we combine in rootreducer

const intialState = {} 

const middleware = [thunk] // this is only middleware

const store = createStore(
    rootReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;