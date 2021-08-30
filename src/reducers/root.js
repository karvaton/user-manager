import { combineReducers } from "redux";
// import manageLayers from './layers';
import users from './users';
import layers from './layers';

const rootReducer = combineReducers({
    users,
    layers,
});

export default rootReducer;