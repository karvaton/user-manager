import initialState from "../constants/initialState";
import * as types from "../constants/types";
import * as users from "./controllers/users-controller";
import * as userAction from "../actions/user";
import * as layerAction from "../actions/layers";


export default function manageUsers(
    state = initialState.userManager.users,
    { type, payload }
) {
    switch (type) {
        case types.user.DELETE:
            return users.remove(state, payload);

        case types.user.SET:
            return users.set(payload);

        case types.user.SET_LAYERS:
            return users.setUser(state, payload, userAction.setLayers);

        case types.layers.CHANGE_ORDER:
            return users.setUser(state, payload, layerAction.changeOrder);

        case types.user.UPDATE:
            return users.setUser(state, payload, userAction.update);

        case types.layer.REMOVE:
            return users.setUser(state, payload, layerAction.removeLayer);

        default:
            return state;
    }
}
