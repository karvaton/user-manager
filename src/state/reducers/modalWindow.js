import initialState from "../constants/initialState";
import * as types from "../constants/types";

export default function modalWindows(
    state = initialState.userManager.modalWindow,
    { type, payload }
) {
    switch (type) {
        case types.layer.SETTING:
            return {
                ...payload,
            }

        case 'CLOSE':
            return null;

        default:
            return state;
    }
}
