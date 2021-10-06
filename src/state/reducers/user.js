import * as types from "../constants/types";
import layerReduser from './layers';

export default function user(user, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.user.SET_LAYERS:
            return user.login !== payload.login ?
                user : 
                {
                    ...user,
                    layers: payload.ids
                }

        case types.user.SET:
            return {
                ...user,
                layerOrder: user.layers.map(({ lid }) => lid)
            }

        case types.layers.CHANGE_ORDER:
            if (user.login !== payload.login) {
                return user;
            } else {
                return {
                    ...user,
                    layers: layerReduser(user.layers, action),
                }
            }

        case types.user.UPDATE:
            if (user.login !== payload.login) {
                return { ...user };
            } else {
                return {
                    ...user,
                    ...payload
                }
            }

        case types.layer.REMOVE:
            if (user.login !== payload.login) {
                return user;
            } else {
                return {
                    ...user,
                    layers: layerReduser(user.layers, action),
                }
            }

        default:
            return user;
    }
}