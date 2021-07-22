// import { Component } from "react";
import PropTypes from 'prop-types';

const LayerRow = ({id, workspace, name, title, removeLayer, replaceLayer}) => (
    <tr className="layer-line">
        <td>{workspace}</td>
        <td name={name}>{title || name}</td>
        <td className="up-layer order-arrow">
            <i className="fa fa-arrow-up" aria-hidden="true" onClick={() => replaceLayer(id, 'up')}></i>
        </td>
        <td className="down-layer order-arrow">
            <i className="fa fa-arrow-down" aria-hidden="true" onClick={() => replaceLayer(id, 'down')}></i>
        </td>
        <td className="set-layer">
            <i className="fa fa-cog" aria-hidden="true"></i>
        </td>
        <td className="delete-layer">
            <i className="fa fa-minus" aria-hidden="true" onClick={() => removeLayer(id)}></i>
        </td>
    </tr>
);
LayerRow.propTypes = {
    id: PropTypes.string.isRequired,
    workspace: PropTypes.string,
    name: PropTypes.string.isRequired,
    title: PropTypes.string, 
    removeLayer: PropTypes.func.isRequired
}

export {LayerRow};