import { Component } from "react";
import Tunel from "../../common/tunel";

class LayerSetting extends Component {
    constructor(props) {
        super(props);
        
        const { title, parameters } = props.layer;
        this.state = {
            title,
            parameters,
            availableParams: [],
        }
    }

    rename(e) {
        const title = e.target.value;
        this.setState(() => ({title}));
    }

    shouldComponentUpdate({accept, done}) {
        accept && console.log(this.props.layer);
        done();
        return true;
    }

    render() {
        const { workspace, layer_name, } = this.props.layer;
        const { title, } = this.state;
        return (
            <Tunel>
                <div id="layer-settings">
                    <p>Робоча область</p>
                    <div name="workspace">{workspace}</div>
                    <p>Назва шару</p>
                    <div className="layer-name">{layer_name}</div>
                    <p>Підпис шару</p>
                    <input
                        className="layer-title"
                        name="g5"
                        value={title || layer_name}
                        onChange={event => this.rename(event)}
                    />
                    <p>Створити фільтр</p>
                    <div className="filter"></div>
                    <p>Параметри</p>
                    <div name="parameters">{this.state.availableParams}</div>
                </div>
                <div>Вибрати всі</div>
            </Tunel>
        );
    }
}

export default LayerSetting;