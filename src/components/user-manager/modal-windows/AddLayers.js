import { Component } from "react";

class AddLayers extends Component {
    render() {
        return (
            <>
                <p htmlFor="workspaces">Робоча область</p>
                <select
                    name="workspaces"
                    size="1"
                    className="form-content"
                ></select>
                <p htmlFor="available">Доступні шари</p>
                <div name="layers" id="available">
                    <p className="no-layers">
                        <i>Немає доступних шарів</i>
                    </p>
                </div>
            </>
        );
    }
}

export default AddLayers;