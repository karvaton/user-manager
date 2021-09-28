import * as types from "../constants/types";

export function setUsers(users) {
    return {
        type: types.user.SET,
        payload: [...users]
    };
}

export function setLayerOrder(login, ids) {
    return {
        type: types.user.SET_LAYERS,
        payload: {
            login,
            ids: [...ids],
        }
    }
}