// import { Component } from "react";

// class ModalWindow extends Component {
//     render() {
//         return <div>{this.props.data}</div>;
//     }
// }


const ModalWindows = (props) => (
    <div id="modal-windows-background">
        {/* {(typeof props.window.data === "string" ||
            typeof props.window.data === "object") ? (
                <ModalWindow data={props.window.data} />
            ) : null
        } */}
        <button id="close-modal-window" onClick={() => props.close()}>
            ✖
        </button>
    </div>
);

export default ModalWindows;