import { setUsers } from "../users";

export function fetchUsers() {
    return dispatch => {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(users => dispatch(setUsers(users)));
    }
}