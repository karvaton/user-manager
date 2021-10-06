import * as types from '../constants/types';

export function addLayer(layer) {
    return {
        type: types.layer.ADD,
        payload: {
            layer,
        },
    }
}

export function changeLayer(id, layer) {
    return {
        type: types.layer.CHANGE,
        payload: {
            id,
            layer,
        }
    };
}

export function removeLayer({login, id}) {
    return {
        type: types.layer.REMOVE,
        payload: {
            id, login
        },
    };
}

export function setLayers(list) {
    return {
        type: types.layer.SET,
        payload: [...list],
    };
}

export function changeOrder({login, currentId, direction}) {
    return {
        type: types.layers.CHANGE_ORDER,
        payload: {
            login, 
            direction,
            currentId,
        },
    };
}

export function layerSetting(layer) {
    return {
        type: types.layer.SETTING,
        payload: {
            ...layer
        }
    }
}