import { Component } from "react";
import Tunel from "../../common/tunel";

class LayerSetting extends Component {
    constructor(props) {
        super(props);
        
        const { title, parameters, access } = props.layer;
        this.state = {
            access,
            title,
            parameters,
            availableParams: [],
        }
    }

    rename(e) {
        const title = e.target.value;
        this.setState(() => ({title}));
    }

    changeAccess(e) {
        const access = e.target.value;
        this.setState(() => ({access}));
    }

    // shouldComponentUpdate({accept, done}) {
    //     accept && console.log(this.props.layer);
    //     done();
    //     return true;
    // }

    render() {
        const { workspace, layer_name, } = this.props.layer;
        const { title, access, } = this.state;
        return (
            <Tunel>
                <div id="layer-settings">
                    <p>Робоча область</p>
                    <div name="workspace">{workspace}</div>
                    <p>Назва шару</p>
                    <div className="layer-name">{layer_name}</div>
                    <p>Тип доступу</p>
                    <select
                        className="access-type"
                        value={access}
                        onChange={(event) => this.changeAccess(event)}
                    >
                        <option value="visible">Видимий</option>
                        <option value="selectable">Доступний</option>
                        <option value="editable">Редогований</option>
                    </select>
                    <p>Підпис шару</p>
                    <input
                        className="layer-title"
                        value={title || layer_name}
                        onChange={(event) => this.rename(event)}
                    />
                    {/* <p>Створити фільтр</p>
                    <div className="filter"></div> */}
                    {["selectable", "editable"].includes(access) && (
                        <Tunel>
                            <p>Параметри</p>
                            <div name="parameters" className="parameters">
                                {this.state.availableParams}
                            </div>
                        </Tunel>
                    )}
                </div>
                <div>Вибрати всі</div>
            </Tunel>
        );
    }
}

export default LayerSetting;