import { combineReducers } from "redux";
import manageLayers from './layers';
import manageUsers from './users';

const rootReducer = combineReducers({
    manageUsers,
    manageLayers,
});

export default rootReducer;