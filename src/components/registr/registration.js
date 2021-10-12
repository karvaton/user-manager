import { useSelector } from "react-redux";
import Tunel from "../common/tunel";
import LayerManager from "./LayerManager";
import UserForm from "./UserForm";

function Registration() {
    const activeLayer = useSelector(state => state.registration.activeLayer);

    return (
        <Tunel>
            <UserForm />
            {activeLayer && <LayerManager />}
        </Tunel>
    )
}

export default Registration;