import { Component } from "react";
import invariant from "invariant";
import PropTypes from "prop-types";

class Route extends Component {
    static propTypes = {
        path: PropTypes.string,
        component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    }

    render() {
        return invariant(false, "Компонент <Route> лише для налаштувань і не повинен рендеритися")
    }
}

export default Route;