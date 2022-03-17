import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { authReducer } from "../reducers/authReducer";
import { requestReducer } from "../reducers/requestReducer";
import { loadingReducer } from '../reducers/loadingReducer';
import { notesReducer } from '../reducers/notesReducer';
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
    auth: authReducer,
    req:requestReducer,
    loading:loadingReducer,
    entries:notesReducer
})
export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);