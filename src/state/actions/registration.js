import {registration} from "../constants/types";

export const startLoading = payload => ({
    type: registration.START_LOADING,
    payload,
});

export const clearLayers = () => ({
    type: registration.CLEAR_LAYERS,
});

export const activateLayer = (payload) => ({
    type: registration.SET_ACTIVE_LAYER,
    payload,
});

export const deactivateLayer = () => ({
    type: registration.RESET_ACTIVE_LAYER,
});

export const changeParameter = (payload) => ({
    type: registration.CHANGE_PARAMS,
    payload,
});