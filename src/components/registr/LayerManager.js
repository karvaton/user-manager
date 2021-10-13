import { useDispatch, useSelector } from "react-redux";
import { fetchParams } from "../../state/actions/async/registration";
// import { startLoading } from "../../state/actions/registration";
import Loading from "../common/Loading";

const styles = {
    loader: {
        height: "90px",
        width: "90px",
        borderWidth: "8px",
        position: "relative",
        top: "25%",
    }
}

function LayerManager() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.registration);
    const { loading, layers, activeLayer, entry } = state;
    const layer = layers.filter(({id}) => id === activeLayer)[0];
    const { id, name, title, sublayers, parameters } = layer
    const type = sublayers ? "layergroup" : "layer";
    const params = parameters.map(param => ({ ...param }));
    
    if (!params.length) {
        // dispatch(startLoading("parameters"));
        dispatch(fetchParams(id, entry));
    }

    return (
        <div id="layer-manager" style={{ display: "flex" }}>
            <div id="layer-parameters">
                <p id="manager-title">
                    {sublayers ? (
                        <i>
                            <strong>{title || name}</strong>
                        </i>
                    ) : (
                        <i>{title || name}</i>
                    )} — {type}
                </p>
                <div id="info-title">
                    <p>Назва параметра</p>
                    <p>👁</p>
                </div>
                <div className="layer-info">
                    {loading === "parameters" ? (
                        <Loading style={styles.loader} />
                    ) : (
                        params.map(({ name, title, checked }) => (
                            <div key={name} className="parameter">
                                <div className="paramName">{title}</div>
                                <input
                                    type="checkbox"
                                    className="paramView"
                                    checked={checked}
                                    onChange={() => {}}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default LayerManager;