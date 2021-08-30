import * as types from "../constants/types";

export default function user(state, {type, payload}) {
    switch (type) {
        case types.user.SET:
            return {
                ...payload,
                layers: [],
            };
    
        case types.user.SET_LAYERS:
            return state.id !== payload.login ?
                state : {
                    ...state,
                    ids: payload.ids
                }


        default:
            return state;
    }
}