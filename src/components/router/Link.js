import React from 'react';
import { navigate } from '../../history/history';
import PropTypes from 'prop-types';

const Link = ({to, children}) => (
    React.cloneElement(
        React.Children.only(children), {
            onClick: () => navigate(to)
        }
    )
)
Link.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string
}

export default Link;