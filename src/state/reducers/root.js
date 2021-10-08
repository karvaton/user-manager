import { combineReducers } from "redux";
import users from './users';
import modalWindow from "../reducers/modalWindow";

const userManager = combineReducers({
    users,
    modalWindow,
});

const rootReducer = combineReducers({
    userManager,
});

export default rootReducer;