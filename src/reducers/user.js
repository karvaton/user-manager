import * as types from "../constants/types";
import layerReduser from './layers';

export default function user(user, {type, payload}) {
    switch (type) {
        case types.user.SET_LAYERS:
            return user.login !== payload.login ?
                user : 
                {
                    ...user,
                    layers: payload.ids
                }

        case types.layers.CHANGE_ORDER:
            user.login === payload.login && console.log(user.layers);
            return user.login !== payload.login ?
                user :
                {
                    ...user,
                    layers: layerReduser(user.layers, payload)
                }

        default:
            return user;
    }
}