import { Component } from "react";
import PropTypes from 'prop-types';
import Layer, { LayerInfo } from './Layer';

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
            setUp: null
        }
        this.handlerRemoveLayer = this.handlerRemoveLayer.bind(this);
        this.handlerReplaceLayer = this.handlerReplaceLayer.bind(this);
        this.setUpLayer = this.setUpLayer.bind(this);
    }

    handlerRemoveLayer(id) {
        const list = this.state.list.filter(({layerId}) => layerId !== id);
        this.setState({list});
    }

    handlerReplaceLayer(currentId, direction) {
        const next = direction === 'up' ? -1 : 0;
        const list = [...this.state.list];

        const currentLayer = list.filter(({layerId}) => layerId === currentId)[0];
        const startIndex = list.indexOf(currentLayer) + next;

        const prevLayer = list[startIndex],
            nextLayer = list[startIndex + 1];
        
        list.splice(startIndex, 2, nextLayer, prevLayer);
        this.setState({ list });
    }

    setUpLayer(layerId = null) {
        this.setState({setUp: layerId})
    }

    render() {
        const { name } = this.props;
        const { list, setUp } = this.state;

        return (
            <div className="line">
                <div className="typename" name={name}>
                Доступні шари:
                </div>
                <div className="wms">
                    <div className="wms-list">
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
                                    list.map(layer => 
                                        <Layer
                                            key={layer.layerId}
                                            layer={layer}
                                            removeLayer={this.handlerRemoveLayer}
                                            replaceLayer={this.handlerReplaceLayer}
                                            setUp={this.setUpLayer}
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
                {list.filter(({layerId}) => layerId === setUp).map(layer => <LayerInfo key={layer.layerId} layer={layer} />)}
            </div>
        );
    }
}
LayerList.propTypes = {
    name: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.object),
}


const LayersInfo = ({wmsLayers}) => (
    <div className="wrap-info">
        <PasswordForm />
        <LayerList list={wmsLayers} />
    </div>
)
LayersInfo.propTypes = {
    wms_layers: PropTypes.object,
}

export default LayersInfo;