import { registration } from "../constants/types";

const setParameters = (state, {type, payload}) => {
    let parameters = [];
    switch (type) {
        case registration.GET_LAYERS:
            return {
                ...state,
                name: state.name.toString(),
                title: '',
                access: null,
                parameters,
            }
            
        case registration.GET_PARAMS:
            if (payload.layer === state.id) {
                return {
                    ...state,
                    parameters: payload.data,
                };
            } else {
                return state;
            }

        case registration.CHANGE_PARAMS:
            if (payload.id === state.id) {
                parameters = state.parameters.map(parameter => {
                    if (parameter.name === payload.name) {
                        return {
                            ...parameter,
                            [payload.key]: payload.value,
                        }
                    } else {
                        return parameter;
                    }
                });
                return {
                    ...state,
                    parameters,
                }
            } else {
                return state;
            }

        case registration.CHANGE_LAYER:
            if (payload.id === state.id) {
                return {
                    ...state,
                    ...payload
                };
            } else {
                return state;
            }
    
        default:
            return state;
    }
}

export default setParameters;