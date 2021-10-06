import * as types from "../constants/types";

export default function layers(state, action) {
    switch (action.type) {
        case types.layer.ADD:
            const nextState = [...state];
            nextState.push(action.payload);
            return nextState;

        case types.layer.SET:
            return [...action.payload];
        
        case types.layers.CHANGE_ORDER: 
            const next = action.payload.direction === 'up' ? -1 : 0,
                layers = [...state],
                currentLayer = layers.filter(({lid}) => lid === action.payload.currentId)[0],
                startIndex = layers.indexOf(currentLayer) + next,
                prevLayer = { ...layers[startIndex] },
                nextLayer = { ...layers[startIndex + 1] };
        
            prevLayer.order_id += 1;
            nextLayer.order_id -= 1;
            layers.splice(startIndex, 2, nextLayer, prevLayer);
            return layers;

        case types.layer.REMOVE:
            return state.filter(({lid}) => lid !== action.payload.id);

        default:
            return state;
    }
}