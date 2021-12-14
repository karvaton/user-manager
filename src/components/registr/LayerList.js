import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import Layer from "./Layer";

const styles = {
    layerName: {
        display: "inline-block",
        width: "81%",
    },
    noLayers: {
        fontSize: "10pt",
        color: "grey",
        padding: "26px 65px",
    },
    loader: {
        height: "90px",
        width: "90px",
        borderWidth: "8px",
        position: "relative",
        top: "25%",
    },
};

function AvailableLayerList() {
    const loading = useSelector(state => state.registration.loading);
    const availableList = useSelector(state => state.registration.layers);

    return (
        <>
            <div className="avail-header">
                <span style={styles.layerName}>Назва шару</span>
                <div id="search">
                    <input type="text" id="search-field" className="search" />
                    <div className="close-search">
                        <i className="fa fa-times"></i>
                    </div>
                </div>
                <div className="search-btn">
                    <i className="fa fa-search"></i>
                </div>

                <span className="vis">&#128065; </span>
                <span className="sel"> &#11009; </span>
                <span className="edt">&#9998;</span>
                <hr />
            </div>

            <div name="layers" id="available-layers" className="form-content">
                {loading === "layers" ? (
                    <Loading style={styles.loader} />
                ) : availableList.length ? (
                    availableList.map(({ id, name, title, access }) => (
                        <Layer
                            key={id}
                            id={id}
                            name={name}
                            title={title}
                            access={access}
                        />
                    ))
                ) : (
                    <p style={styles.noLayers}>
                        <i>Немає доступних шарів</i>
                    </p>
                )}
            </div>
        </>
    )
};


export default AvailableLayerList;