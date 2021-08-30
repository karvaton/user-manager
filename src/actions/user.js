import * as types from '../constants/types';

export function setUser(user) {
    return {
        type: types.user.SET,
        payload: user,
    }
}

export function setLayers(ids) {
    return {
        type: types.user.SET_LAYERS,
        payload: ids,
    }
}