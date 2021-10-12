import initialState from '../constants/initialState';
import * as types from '../constants/types';

const registrationReducer = (state = initialState.registration, {type, payload}) => {
    switch (type) {
        case types.registration.GET_PARAMS:
            return {
                ...state,
                parameters: payload
            };

        case types.registration.GET_LAYERS:
            return {
                ...state,
                layers: payload,
            }

        case types.registration.CLEAR_LAYERS:
            return {
                ...state,
                layers: [],
            }

        case types.registration.SET_ACTIVE_LAYER:
            return {
                ...state,
                activeLayer: payload,
            }

        case types.registration.RESET_ACTIVE_LAYER:
            return {
                ...state,
                activeLayer: null,
            }
            
        case types.registration.START_LOADING:
            return {
                ...state,
                loading: payload
            }
        
        case types.registration.FINISH_LOADING:
            return {
                ...state,
                loading: false
            }
    
        default:
            return state;
    }
}

export default registrationReducer;