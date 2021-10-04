import * as types from '../constants/types';

export const setUser = (user) => ({
    type: types.user.SET,
    payload: user,
});

export const setLayers = (ids) => ({
    type: types.user.SET_LAYERS,
    payload: ids,
});

export const update = user => ({
    type: types.user.UPDATE,
    payload: user
});

export const deleteUser = (login) => ({
    type: types.user.DELETE,
    payload: login,
});