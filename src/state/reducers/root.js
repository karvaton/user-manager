import { combineReducers } from "redux";
import users from './users';
import modalWindow from "./modalWindow";
import registrationReducer from "./registration";

const userManager = combineReducers({
    users,
    modalWindow,
});

const rootReducer = combineReducers({
    userManager,
    registration: registrationReducer,
});

export default rootReducer;