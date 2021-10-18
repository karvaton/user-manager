import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParams } from "../../state/actions/async/registration";
// import { startLoading } from "../../state/actions/registration";
import { changeLayer, changeParameter } from "../../state/actions/registration";
import Loading from "../common/Loading";
import Parameter from "./Parameter";

const styles = {
    loader: {
        height: "90px",
        width: "90px",
        borderWidth: "8px",
        position: "relative",
        top: "25%",
    },
    saveContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },
    title: {
        flex: 1,
    },
    edit: {
        display: 'inline',
        margin: 0,
        backgroundColor: "#fff0",
        color: "#6b8bc5",
        transform: 'rotate(180deg)',
    },
};

function LayerManager() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.registration);
    const { loading, layers, activeLayer, entry } = state;
    const layer = layers.filter(({id}) => id === activeLayer)[0];
    const { id, name, title, sublayers, parameters } = layer;
    const type = sublayers ? "layergroup" : "layer";
    const params = parameters.map(param => ({ ...param }));
    const [changes, toggleChanges] = useState(false);
    const [layerLabel, changeLabel] = useState(title || name);
    const [activeInput, changeTitle] = useState(false);
    const [prevVal, setPrev] = useState(name);

    function handlerChangeParam(param) {
        dispatch(changeParameter(id, param));
    }

    function saveChanges(isSave) {
        if (isSave) {
            setPrev(layerLabel);
            dispatch(changeLayer({layer: id, title: layerLabel}));
        } else {
            setPrev(prevVal);
            changeLabel(title || name);
        }
        toggleChanges(false);
        changeTitle(false);
    }
    
    if (!params.length) {
        // dispatch(startLoading("parameters"));
        dispatch(fetchParams(id, entry));
    }

    return (
        <div id="layer-manager" style={{ display: "flex" }}>
            <div id="layer-parameters">
                <p id="manager-name">
                    {sublayers ? (
                        <i>
                            <strong>{name}</strong>
                        </i>
                    ) : (
                        <i>{name}</i>
                    )}
                    {` — ${type}`}
                </p>
                <div id="manager-title" style={{ display: "flex" }}>
                    Підпис шару:
                    {!activeInput ? (
                        [
                            <span key="layer-title" style={styles.title}>
                                {title || name}
                            </span>,
                            <button
                                key="change-layer-title"
                                style={ styles.edit }
                                onClick={() => changeTitle(true)}
                            >
                                &#10000;
                            </button>,
                        ]
                    ) : (
                        <input
                            value={layerLabel}
                            style={styles.title}
                            onChange={(e) => {
                                changeLabel(e.target.value);
                                toggleChanges(true);
                            }}
                        />
                    )}
                </div>
                <div id="info-title">
                    <p>Назва параметра</p>
                    <p>👁</p>
                </div>
                <div className="layer-info">
                    {loading === "parameters" ? (
                        <Loading style={styles.loader} />
                    ) : (
                        params.map(({ name, title, checked }) => (
                            <Parameter
                                key={name}
                                name={name}
                                title={title}
                                checked={checked}
                                changeParameter={handlerChangeParam}
                            />
                        ))
                    )}
                </div>
            </div>
            {activeInput && (
                <div className="dialog-buttons" style={styles.saveContainer}>
                    <button
                        className="cancel-btn"
                        onClick={() => saveChanges(false)}
                    >
                        Скасувати
                    </button>
                    <button
                        className="ok-btn"
                        onClick={() => saveChanges(true)}
                        disabled={!changes}
                    >
                        Зберегти
                    </button>
                </div>
            )}
        </div>
    );
}

export default LayerManager;