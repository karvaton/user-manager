import * as types from "../constants/types";

export default function layers(state = [], {type, payload}) {
    switch (type) {
        case types.layer.ADD:
            const nextState = [...state];
            nextState.push(payload);
            return nextState;

        case types.layer.SET:
            return [...payload];
        
        case types.layers.CHANGE_ORDER: 
            console.log(state);
            const next = payload.direction === 'up' ? -1 : 0,
                layers = [...state],
                currentLayer = layers.filter(({lid}) => lid === payload.currentId)[0],
                startIndex = layers.indexOf(currentLayer) + next,
                prevLayer = layers[startIndex],
                nextLayer = layers[startIndex + 1];
        
            // console.log(layers);
            layers.splice(startIndex, 2, nextLayer, prevLayer);
            // console.log(layers);
            return layers;

        default:
            return state;
    }
}