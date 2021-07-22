import { Component } from "react";
import PropTypes from 'prop-types';
import {LayerRow} from './Layer';

const PasswordForm = () => (
    <form name="password">
        Пароль:
        <input type="password" name="password"/>
        <input type="submit" className="change-password" value="Змінити"/>
    </form>
)

class LayerList extends Component {
    constructor(props) {
        super(props);
        const {list} = this.props;
        this.state = {
            list,
        }
        this.handlerRemoveLayer = this.handlerRemoveLayer.bind(this);
        this.handlerReplaceLayer = this.handlerReplaceLayer.bind(this);
    }

    handlerRemoveLayer(id) {
        const list = this.state.list.filter(({layerId}) => layerId !== id)
        this.setState({list});
    }

    handlerReplaceLayer(current, direction) {
        const layerList = this.state.list;
        const currentObj = layerList.filter(({layerId}) => layerId === current)[0],
            list = [...layerList];

        let prevObj, nextObj, prevIndex;
        if (direction === 'up') {
            nextObj = {...currentObj};
            prevIndex = layerList.indexOf(currentObj) - 1;
            prevObj = layerList[prevIndex];
        } else {
            prevObj = {...currentObj};
            prevIndex = layerList.indexOf(currentObj);
            nextObj = layerList[prevIndex + 1];
        }
                
        list.splice(prevIndex, 2, nextObj, prevObj);
        // console.log(prevIndex, nextObj);
        this.setState({list});
    }

    render() {
        const { name } = this.props;
        const list = this.state.list;

        return (
            <div className="line">
                <div className="typename" name={name}>
                    {name === "available"
                        ? "Вибрані "
                        : name === "selectable"
                        ? "Доступні "
                        : "Редаговані "}
                    шари:
                </div>
                <div className="wms">
                    <div className="wms-list" name={name + "List"}>
                        <table className="layer-list">
                            <thead>
                                <tr>
                                    <th>Робоча область</th>
                                    <th>Назва</th>
                                    <th colSpan="4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length ?
                                    list.map(({ layerId, layerName, workspace, title }) => 
                                        <LayerRow 
                                            key={layerId}
                                            id={layerId}
                                            name={layerName} 
                                            workspace={workspace}
                                            title={title}
                                            removeLayer={this.handlerRemoveLayer}
                                            replaceLayer={this.handlerReplaceLayer}
                                        />
                                    )

                                    : <tr className="layer-line">
                                        <td colSpan="3">Відсутні</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
LayerList.propTypes = {
    name: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.object),
}


const LayersInfo = ({wms_layers}) => (
    <div className="wrap-info">
        <PasswordForm />
        {Object.keys(wms_layers).map(layerType => <LayerList key={layerType} name={layerType} list={wms_layers[layerType]} />)}
    </div>
)
LayersInfo.propTypes = {
    wms_layers: PropTypes.object,
}

export default LayersInfo;