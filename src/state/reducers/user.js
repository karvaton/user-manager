import * as types from "../constants/types";
import layerReduser from './layers';

export default function user(user, action) {
    switch (action.type) {
        case types.user.SET_LAYERS:
            return user.login !== action.payload.login ?
                user : 
                {
                    ...user,
                    layers: action.payload.ids
                }

        case types.user.SET:
            return {
                ...user,
                print: user.print === "true",
                layerOrder: user.layers.map(({ lid }) => lid)
            }

        case types.layers.CHANGE_ORDER:
            if (user.login !== action.payload.login) {
                return user;
            } else {
                return {
                    ...user,
                    layers: layerReduser(user.layers, action),
                }
            }

        case types.user.PRINT:
            if (user.login !== action.payload) {
                return { ...user };
            } else {
                const print = !user.print;
                return {
                    ...user,
                    print,
                }
            }

        default:
            return user;
    }
}