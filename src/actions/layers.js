import * as types from '../constants/types';

export function addLayer(layer) {
    return {
        type: types.layer.ADD,
        layer
    }
}

export function changeLayer(id, layer) {
    return {
        type: types.layer.CHANGE,
        id,
        layer,
    };
}

export function removeLayer(id) {
    return {
        type: types.layer.REMOVE,
        id,
    };
}
