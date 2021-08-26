import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "../reducers/root";
import thunk from 'redux-thunk';

let store;
export default function configureStore(initialState) {
    if (store) {
        return store;
    }
    store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));
    return store;
}