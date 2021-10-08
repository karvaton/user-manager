import UserList from "./UserList";
import ModalWindows from "./modal-windows/ModalWindows";
import { useSelector } from "react-redux";


function UserManager() {
    const modalWindow = useSelector(state => state.userManager.modalWindow);

    return [
        <UserList key="user-list" />,
        modalWindow && (
            <ModalWindows
                key="modal-window"
                window={modalWindow}
            />
        ),
    ];
}

export default UserManager;