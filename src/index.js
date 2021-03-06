import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';

import App from './App';
import UserManager from './components/user-manager/user-page';
import Registration from './components/registr/registration';
import Edits from './components/edits-manager/Edits';
import Login from './components/admin-auth/Login';
import { history, navigate } from './history/history';
import Router from './components/router/router';
import Route from "./components/router/route";

import configureStore from "./state/store/configureStore";
import initialState from "./state/constants/initialState";

import reportWebVitals from './reportWebVitals';


const store = configureStore(initialState);

export const renderApp = (state, callback = () => {}) => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <Router {...state}>
                    <Route path="" component={App}>
                        <Route path="/admin-auth" component={Login} />
                        <Route path="/register-user" component={Registration} />
                        <Route path="/user-manager" component={UserManager} />
                        <Route path="/edits-manager" component={Edits} />
                    </Route>
                </Router>
            </Provider>
        </React.StrictMode>
        , document.getElementById("root"),
        callback
    );
}

let state = {
    location: window.location.pathname,
    auth: true
}

if (state.location === '/') {
        state.location = "/user-manager"
    navigate(state.location);
}

history.listen( ({location}) => {
    state = Object.assign({}, state, {
        location: 
        location.pathname 
    });
    renderApp(state);
});

renderApp(state);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (module.hot) {
    module.hot.accept();
}
