import * as types from '../constants/types';

export const setUser = (user) => ({
    type: types.user.SET,
    payload: user,
});

export const setLayers = (ids) => ({
    type: types.user.SET_LAYERS,
    payload: ids,
});

export const changePrint = (login) => ({
    type: types.user.PRINT,
    payload: login
});