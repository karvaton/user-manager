import userReduser from "../user";
import * as userAction from "../../actions/user";


export function set(users) {
    return users.map(user => userReduser(user, userAction.setUser(user)));
}

export function remove(users, payload) {
    const prevState = [...users];
    const nextState = users.filter(({login}) => login !== payload);
    if (prevState.length === nextState.length) {
        alert(payload?.message || "Не вдалося створити користувача");
    }
    return nextState;
}

export function setUser(users, payload, action) {
    return users.map((user) =>
        userReduser(user, action(payload))
    );
}