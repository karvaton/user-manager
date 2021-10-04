import userReduser from "../user";
import * as userAction from "../../actions/user";
import * as layerAction from "../../actions/layers";

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

export function setLayers(users, {ids}) {
    return users.map(user => userReduser(user, userAction.setLayers(ids)));
}

export function changeLayerOrder(users, payload) {
    return users.map(user => userReduser(user, layerAction.changeOrder(payload)));
}

export function update(users, payload) {
    return users.map(user => userReduser(user, userAction.update(payload)));
}