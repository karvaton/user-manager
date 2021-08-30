import initialState from "../constants/initialState";
import * as types from "../constants/types";
import * as users from "./controllers/users-controller";


export default function manageUsers(state = initialState.users, {type, payload}) {
    switch (type) {
        case types.user.DELETE:
            return users.remove(state, payload)

        case (types.user.SET):
            return users.set(payload);
        
        case (types.user.SET_LAYERS):
            return users.setLayers(state, payload);

        default:
            return state;
    }
}
