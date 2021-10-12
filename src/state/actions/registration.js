import * as types from "../constants/types";

export const startLoading = payload => ({
    type: types.registration.START_LOADING,
    payload,
});

export const clearLayers = () => ({
    type: types.registration.CLEAR_LAYERS,
});