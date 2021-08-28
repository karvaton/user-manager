import initialState from "../constants/initialState";
import * as types from "../constants/types";

export default function manageUsers(state = initialState, action) {
    switch (action.type) {
        case types.user.DELETE:
            const { user } = action;
            let users = state.userList.filter(({login}) => login !== user);
            return {
                ...state,
                userList: [...users]
            };

        case (types.user.SET):
            const { userList } = action;
            return {
                ...state,
                userList
            }

        default:
            return state;
    }
}
