import { useSelector } from "react-redux";
import LayerManager from "./LayerManager";
import UserForm from "./UserForm";

function Registration() {
    const activeLayer = useSelector(state => state.registration.activeLayer);

    return (
        <>
            <UserForm />
            {activeLayer && <LayerManager />}
        </>
    )
}

export default Registration;