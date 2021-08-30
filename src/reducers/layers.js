import * as types from "../constants/types";

export default function layers(state = [], {type, payload}) {
    switch (type) {
        case types.layer.ADD:
            const nextState = [...state];
            nextState.push(payload);
            return nextState;

        case types.layer.SET:
            return [...payload];
    
        default:
            return state;
    }
}