// import { Component } from "react";
import PropTypes from 'prop-types';
import { Component } from 'react';

const LayerRow = ({id, workspace, name, title, access, removeLayer, replaceLayer, setUpLayer}) => (
    <tr className={`layer-line ${access}-layer`}>
        <td>{workspace}</td>
        <td name={name}>{title || name}</td>
        <td className="up-layer order-arrow">
            <i className="fa fa-arrow-up" aria-hidden="true" onClick={() => replaceLayer(id, 'up')}></i>
        </td>
        <td className="down-layer order-arrow">
            <i className="fa fa-arrow-down" aria-hidden="true" onClick={() => replaceLayer(id, 'down')}></i>
        </td>
        <td className="set-layer">
            <i className="fa fa-cog" aria-hidden="true" onClick={() => setUpLayer(id)}></i>
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


const LayerInfo = () => (
    <div id="add-layer-background"></div>
);


class Layer extends Component {
    render() {
        const { layerId, workspace, layerName, title, access } = this.props.layer;
        const { removeLayer, replaceLayer, setUp } = this.props;

        return (
            <LayerRow
                key="layer-row"
                id={layerId}
                name={layerName}
                workspace={workspace}
                title={title}
                access={access}
                removeLayer={removeLayer}
                replaceLayer={replaceLayer}
                setUpLayer={setUp}
            />
        );
    }
}

export {LayerInfo};
export default Layer;