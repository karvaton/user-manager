import { combineReducers } from "redux";
import manageLayers from './layers';
import manageUsers from './users';

const rootReducer = combineReducers({
    users: manageUsers,
    layers: manageLayers,
});

export default rootReducer;