import { Component } from "react";
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


class ModalWindows extends Component {
    constructor(props) {
        super(props);

        this.state = {
            complete: false
        }
        this.finish = this.finish.bind(this);
    }

    finish() {
        this.setState( () => ({complete: true}));
        // this.props.close();
    }

    render() {
        const { close, window } = this.props;
        const { complete } = this.state;
        return (
            <div id="modal-windows-background">
                <ModalWindow done={this.finish} cancel={close} >
                    {typeof window === "string" ? (
                        <AddLayers />
                    ) : (
                        <LayerSetting layer={window} accept={complete} done={close} />
                    )}
                </ModalWindow>
                <button id="close-modal-window" onClick={() => close()}>
                    ✖
                </button>
            </div>
        );
    }
}

export default ModalWindows;