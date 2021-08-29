// import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root';

let store;
export default function configureStore(initialState) {
    if (!store) {
        const createdStore = createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(thunk),
                window.devToolsExtension()
            )
        );
        store = createdStore;
    }
    return store;
};