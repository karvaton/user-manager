import { registration } from "../constants/types";

const setParameters = (state, {type, payload}) => {
    let parameters = [];
    switch (type) {
        case registration.GET_LAYERS:
            return {
                ...state,
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
            parameters = state.parameters.map(parameter => {
                if (parameter.name === payload.name) {
                    return {
                        ...parameter,
                        [payload.key]: payload.value,
                    }
                } else {
                    return parameter;
                }
            })
            
            return {

            }
    
        default:
            return state;
    }
}

export default setParameters;