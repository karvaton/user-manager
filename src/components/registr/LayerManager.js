import { useDispatch, useSelector } from "react-redux";
import { fetchParams } from "../../state/actions/async/registration";
import { startLoading } from "../../state/actions/registration";
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
    const loading = useSelector((state) => state.registration.loading);
    const layer = useSelector((state) => state.registration.activeLayer);
    const parameters = useSelector((state) => state.registration.parameters) || [];
    let { id, name, title, sublayers, params } = layer;
    const type = sublayers ? "layergroup" : "layer";
    params = parameters.map((param) => ({ name: param, title: param, checked: false }));

    const entry = useSelector((state) => state.registration.entry);
    if (!parameters.length) {
        dispatch(startLoading("parameters"));
        dispatch(fetchParams(id, entry));
        // params =  [...parameters] || [];
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
                    )}
                    — {type}
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