import { useDispatch } from "react-redux";
import AddLayers from "./AddLayers";
import LayerSetting from "./LayerSetting";

const ModalWindow = ({ done, cancel, children }) => (
    <div className="modal-window" id="set-layer" name="test2">
        {children}
        <div className="modal-buttons">
            <input type="button" value="Скасувати" className="cancel_add ready-btn" onClick={cancel} />
            <input type="button" value="Готово" className="done_add ready-btn" onClick={done} />
        </div>
    </div>
);


function ModalWindows({window}) {
    const dispatch = useDispatch();
    const close = dispatch({ type: "CLOSE" });

    return (
        <div id="modal-windows-background">
            <ModalWindow cancel={() => close}>
                {typeof window === "string" ? (
                    <AddLayers />
                ) : (
                    <LayerSetting layer={window} />
                )}
            </ModalWindow>
            <button id="close-modal-window" onClick={() => close()}>
                ✖
            </button>
        </div>
    );
}


export default ModalWindows;