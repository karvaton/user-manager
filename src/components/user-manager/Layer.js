// import { Component } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { layerSetting, removeLayer } from "../../state/actions/layers";


function Layer({ layer, login, replaceLayer }) {
    const dispatch = useDispatch();
    // const users = useSelector((state) => state.userManager.users);
    // const user = users.filter((user) => user.login === login)[0];
    // const layers = user.layers;
    // const layer = layers.filter((layer) => layer.lid === id)[0];
    const { workspace, name, title, access } = layer;
    const id = layer.lid;

    return (
        <div className={`layer-line ${access}-layer`}>
            <div className="td">{workspace}</div>
            <div className="td" name={name}>
                {title || name}
            </div>
            <div className="td up-layer order-arrow">
                <i
                    className="fa fa-arrow-up"
                    aria-hidden="true"
                    onClick={() => replaceLayer(id, "up")}
                ></i>
            </div>
            <div className="td down-layer order-arrow">
                <i
                    className="fa fa-arrow-down"
                    aria-hidden="true"
                    onClick={() => replaceLayer(id, "down")}
                ></i>
            </div>
            <div className="td set-layer">
                <i
                    className="fa fa-cog"
                    aria-hidden="true"
                    onClick={() => dispatch(layerSetting({...layer, login}))}
                ></i>
            </div>
            <div className="td delete-layer">
                <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => dispatch(removeLayer({ login, id }))}
                ></i>
            </div>
        </div>
    );
}
Layer.propTypes = {
    layer: PropTypes.object,
    login: PropTypes.string,
    replaceLayer: PropTypes.func,
};


export const LayerInfo = () => (
    <div id="add-layers-background" />
);


// function Layer({ layer, login, replaceLayer, setUp }) {
//     return (
//         <LayerRow
//             login={login}
//             key="layer-row"
//             id={lid}
//             name={layer_name}
//             workspace={workspace}
//             title={title}
//             access={access}
//             replaceLayer={replaceLayer}
//             setUpLayer={setUp}
//         />
//     );
// }
// Layer.propTypes = {
//     layer: PropTypes.object,
// }

export default Layer;