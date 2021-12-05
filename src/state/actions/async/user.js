import { setUsers } from "../users";
import { deleteUser, update } from "../user";
import { setLayers } from "../layers";


export function fetchLayers() {
    return (dispatch) => {
        fetch(`http://localhost:5000/layers`)
            .then((res) => res.json())
            .then((users) => dispatch(setLayers(users)));
    };
}

export function fetchUsers() {
    return async (dispatch) => {
        const result = await fetch("http://localhost:5000/users/layers");
        const usersData = await result.json();
        dispatch(setUsers(usersData));
    };
}

export function updateUser(login, fields) {
    return (dispatch) => {
        fetch(`http://localhost:5000/users/${login}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({fields}),
        })
        .then(res => res.json())
        .then(json => dispatch(
            update(json)
        ));
    };
}

export function removeUser(login) {
    return (dispatch) => {
        fetch(`http://localhost:5000/users/${login}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(json => dispatch(
            deleteUser(json.login)
        ));
    }
}
