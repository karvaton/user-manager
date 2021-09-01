import { setUsers } from "../users";

export function fetchUsers() {
    return async dispatch => {
        let userRes = await fetch("http://localhost:5000/users");
        const layerRes = await fetch(`http://localhost:5000/layers`);
        const users = await userRes.json();
        const layers = await layerRes.json();
        const usersData = users.map(user => {
            const layerList = layers.filter(({login}) => login === user.login);
            return {
                ...user,
                layers: layerList
            }
        });
        dispatch(setUsers(usersData));
    }
}