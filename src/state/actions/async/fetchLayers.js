import { setLayers } from "../layers";

export function fetchLayers() {
    return (dispatch) => {
        fetch(`http://localhost:5000/layers`)
            .then((res) => res.json())
            .then((users) => dispatch(setLayers(users)));
    };
}
