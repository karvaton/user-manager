import userReduser from "../user";
import * as userAction from "../../actions/user";

export function set(users) {
    return users.map(item => userReduser(users, userAction.setUser(item)));
}

export function remove(users, user) {
    return users.filter(({login}) => login !== user);
}

export function setLayers(users, {ids}) {
    return users.map(user => userReduser(user, ids));
}