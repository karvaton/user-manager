import * as types from "../constants/types";

export function setUsers(users) {
    return {
        type: types.user.SET,
        userList: [...users]
    };
}
