import { combineReducers } from "redux";
import users from './users';
import modalWindow from "../reducers/modalWindow";

const rootReducer = combineReducers({
    users,
    modalWindow,
});

export default rootReducer;