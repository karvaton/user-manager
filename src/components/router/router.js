import React, { Component } from "react";
import PropTypes from "prop-types";
import enroute from 'enroute';
import invariant from 'invariant';

class Router extends Component {
    static propTypes = {
        children: PropTypes.object,
        location: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.routes = {};
        this.addRoutes(props.children);
        this.router = enroute(this.routes);
    }

    cleanPath(path) {
        return path.replace(/\/\//g, '/');
    }

    addRoute(element, parent) {
        const { component, path, children } = element.props;

        invariant(component, `У маршруту ${path} відсутня властивість "path"`);
        invariant(typeof path === 'string', `Маршрут ${path} це не рядок`);

        const render = (params, renderProps) => {
            const finalProps = Object.assign({ params }, this.props, renderProps);

            const children = React.createElement(component, finalProps);
            return parent ? parent.render(params, { children }) : children;
        }

        const route = this.normalizeRoute(path, parent);

        if (children) {
            this.addRoutes(children, { route, render });
        }
        this.routes[this.cleanPath(route)] = render;
    }

    normalizeRoute(path, parent) {
        if (path[0] === '/') {
            return path;
        }

        if (parent == null) {
            return path;
        }

        return `${parent.route}/${path}`;
    }

    addRoutes(routes, parent) {
        React.Children.forEach(routes, route => this.addRoute(route, parent));
    }

    render() {
        const { location } = this.props;
        invariant(location, 'Потрібно передати розташування <Router> для роботи');
        return this.router(location);
    }
}

export default Router;