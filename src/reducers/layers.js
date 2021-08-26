import * as types from "../constants/types";

export default function manageLayers(state = [], action) {
    switch (action.type) {
        case types.layer.ADD:
            const { layer } = action;
            let nextState = [...state];
            nextState.push(layer);
            return nextState;
    
        default:
            return state;
    }
}