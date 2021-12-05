import initialState from '../constants/initialState';
import { registration } from '../constants/types';
import setParams from './paramsReducer';

const registrationReducer = (state = initialState.registration, {type, payload}) => {
    switch (type) {
        case registration.GET_PARAMS:
            return {
                ...state,
                layers: state.layers.map((layer) =>
                    setParams(layer, { type, payload })
                ),
            };

        case registration.CHANGE_PARAMS:
            return {
                ...state,
                layers: state.layers.map((layer) =>
                    setParams(layer, { type, payload })
                ),
            };

        case registration.GET_LAYERS:
            console.log(payload);
            return {
                ...state,
                layers: [...payload]//.map((layer) => setParams(layer, { type })),
            };

        case registration.CHANGE_LAYER:
            return {
                ...state,
                layers: state.layers.map((layer) =>
                    setParams(layer, { type, payload })
                ),
            };

        case registration.CLEAR_LAYERS:
            return {
                ...state,
                layers: [],
            }

        case registration.SET_ACTIVE_LAYER:
            return {
                ...state,
                activeLayer: payload,
            }

        case registration.RESET_ACTIVE_LAYER:
            return {
                ...state,
                activeLayer: null,
            }
            
        case registration.START_LOADING:
            return {
                ...state,
                loading: payload
            }
        
        case registration.FINISH_LOADING:
            return {
                ...state,
                loading: false
            }

        case registration.SET_ENTRY:
            return {
                ...state,
                entry: payload
            }
    
        default:
            return state;
    }
}

export default registrationReducer;