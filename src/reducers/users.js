import initialState from "../constants/initialState";
import * as types from "../constants/types";

export default function manageUsers(state = initialState.userList, action) {
    switch (action.type) {
        case types.user.DELETE:
            const { user } = action;
            let users = state.filter(({login}) => login !== user);
            return users;

        case (types.user.SET):
            const { userList } = action;
            return userList;

        default:
            return state;
    }
}
