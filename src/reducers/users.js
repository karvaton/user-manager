import initialState from "../constants/initialState";
import * as types from "../constants/types";

export default function manageUsers(state = initialState.userList, action) {
    switch (action.type) {
        case types.user.DELETE:
            const { user } = action;
            let nextState = state.filter(({login}) => login !== user);
            return nextState;

        default:
            return state;
    }
}
