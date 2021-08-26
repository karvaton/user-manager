import * as types from '../constants/types';

function addLayer(layer) {
    return {
        type: types.layer.ADD,
        layer
    }
}

function changeLayer(id, layer) {
    return {
        type: types.layer.CHANGE,
        id,
        layer
    }
}

function removeLayer(id) {
    return {
        type: types.layer.REMOVE,
        id
    }
}

export {
    addLayer,
    changeLayer,
    removeLayer
}