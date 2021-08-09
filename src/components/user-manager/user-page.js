import { Component } from "react";
import UserList from "./UserList";
import ModalWindows from "./ModalWindows";

class UserManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalWindow: {
                open: false,
                window: null,
            },
        };
        this.closeModalWindow = this.closeModalWindow.bind(this);
        this.openModalWindow = this.openModalWindow.bind(this);
    }

    openModalWindow(data) {
        const options = {
            open: true,
            window: data,
        };
        document.body.style.overflow = "hidden";
        this.setState({ modalWindow: options });
    }

    closeModalWindow() {
        const options = {
            open: false,
            window: null,
        };
        document.body.style.overflow = "";
        this.setState({ modalWindow: options });
    }

    render() {
        const { modalWindow } = this.state;

        return [
            <UserList key="user-list" modalWindow={this.openModalWindow} />,
            modalWindow.open && (
                <ModalWindows 
                    key="modal-window"
                    close={this.closeModalWindow}
                    window={ window }
                />
            )
        ];
    }
}

export default UserManager;