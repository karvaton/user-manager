import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParams } from "../../state/actions/async/registration";
import { startLoading } from "../../state/actions/registration";
import { activateLayer, changeLayer, changeParameter } from "../../state/actions/registration";
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
        padding: "0 4px",
    },
    edit: {
        display: "inline",
        margin: 0,
        backgroundColor: "#fff0",
        color: "#6b8bc5",
        transform: "rotate(180deg)",
    },
    center: {
        textAlign: "center",
    },
    titleInput: {
        border: "none",
        backgroundColor: "#edeef1",
        marginBottom: '3px',
        padding: '2px 4px',
        fontSize: '11pt',
    },
};

function LayerManager() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.registration);
    const { loading, layers, activeLayer, entry } = state;
    const titleEditing = activeLayer.editing;
    const layer = layers.filter(({id}) => id === activeLayer.id)[0];
    const { id, name, title, sublayers, parameters } = layer;
    const params = parameters.map(param => ({ ...param }));
    
    const [changes, toggleChanges] = useState(false);
    const [layerLabel, changeLabel] = useState('');

    function saveChanges(isSave) {
        dispatch(activateLayer(activeLayer.id));
        if (isSave) {
            dispatch(changeLayer({ id, title: layerLabel }));
        }
        changeLabel('');
        toggleChanges(false);
    }
    
    useEffect(() => {
        if (!params.length) {
            dispatch(startLoading("parameters"));
            dispatch(fetchParams(id, entry));
        }
    });

    return (
        <div id="layer-manager" style={{ display: "flex" }}>
            <div id="layer-parameters">
                <p 
                    id="manager-name"
                    style={styles.center}
                    className="option-active"
                >
                    <b>
                        <i>{name}</i>
                    </b>
                </p>
                <div id="layer-type">
                    Тип: {sublayers ? "група шарів" : "шар"}
                </div>
                <div id="manager-title" style={{ display: "flex" }}>
                    Підпис:
                    {!titleEditing ? (
                        [
                            <span key="layer-title" style={styles.title}>
                                {title || name}
                            </span>,
                            <button
                                key="change-layer-title"
                                style={styles.edit}
                                onClick={() => dispatch(
                                    activateLayer(activeLayer.id, true)
                                )}
                            >
                                &#10000;
                            </button>,
                        ]
                    ) : (
                        <input
                            value={layerLabel || title || name}
                            style={{ ...styles.title, ...styles.titleInput }}
                            onChange={(e) => {
                                changeLabel(e.target.value);
                                toggleChanges(true);
                            }}
                            autoFocus
                        />
                    )}
                </div>
                <div id="info-title">
                    <p>Назва параметра</p>
                    <p>&#128065;</p>
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
                                changeParameter={(param) => dispatch(changeParameter(id, param))}
                            />
                        ))
                    )}
                </div>
            </div>
            {titleEditing && (
                <form className="dialog-buttons" style={styles.saveContainer}>
                    <button
                        className="cancel-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            saveChanges(false);
                        }}
                    >
                        Скасувати
                    </button>
                    <button
                        className="ok-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            saveChanges(true);
                        }}
                        disabled={!changes}
                    >
                        Зберегти
                    </button>
                </form>
            )}
        </div>
    );
}

export default LayerManager;