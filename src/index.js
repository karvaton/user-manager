import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import UserManager from './components/user-manager/user-page'
import { history, /* navigate */ } from './history/history';
import Router from './components/router/router';
import Route from "./components/router/route";

import reportWebVitals from './reportWebVitals';


export const renderApp = (state, callback = () => {}) => {
    ReactDOM.render(
        <Router {...state}>
            <Route path="" component={App} >
                <Route path="/register-user" component={UserManager} />
                <Route path="/user-manager" component={UserManager} />
                <Route path="/edits-manager" component={UserManager} />
            </Route>
        </Router>,
        document.getElementById('root'),
        callback
    )
}

let state = {
    location: window.location.pathname,
}

history.listen( location => {
    state = Object.assign({}, state, {
        location: location.pathname
    });
    renderApp(state);
});

renderApp(state);

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (module.hot) {
    module.hot.accept();
}
