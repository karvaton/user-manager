import userReduser from "../user";
import * as userAction from "../../actions/user";
import * as layerAction from "../../actions/layers";

export function set(users) {
    // return users.map(user =>
    //     userReduser(
    //         user,
    //         userAction.setUser(user)
    //     )
    // );
    return [...users];
}

export function remove(users, user) {
    return users.filter(({login}) => login !== user);
}

export function setLayers(users, {ids}) {
    return users.map(user => userReduser(user, userAction.setLayers(ids)));
}

export function changeLayerOrder(users, payload) {
    return users.map(user => userReduser(user, layerAction.changeOrder(payload)));
}