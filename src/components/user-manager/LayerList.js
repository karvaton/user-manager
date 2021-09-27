import { Component } from "react";
import PropTypes from 'prop-types';
import Layer from './Layer';
import { connect } from "react-redux";
import { changeOrder } from '../../actions/layers';
// import Loading from '../common/Loading';
// import { connect } from "react-redux";


class LayerList extends Component {
    constructor(props) {
        super(props);

        const { layers } = this.props;
        this.state = {
            layers
        }
        this.handlerRemoveLayer = this.handlerRemoveLayer.bind(this);
        this.handlerReplaceLayer = this.handlerReplaceLayer.bind(this);
        this.setUpLayer = this.setUpLayer.bind(this);
        // this.openAddLayersWindow = this.openAddLayersWindow.bind(this);
    }

    handlerRemoveLayer(id) {
        const list = this.state.list.filter(({layerId}) => layerId !== id);
        this.setState({list});
    }

    handlerReplaceLayer(currentId, direction) {
        const { login, changeOrder } = this.props;
        changeOrder({login, currentId, direction});
    }

    setUpLayer(id) {
        const [layer] = this.state.list.filter(({lid}) => lid === id);
        this.props.modalWindow(layer);
    }

    render() {
        const layers = this.props.layers.sort((a, b) => a.order_id - b.order_id);

        return (
            <div className="line">
                <div className="typename">
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
                                {layers.length ?
                                    layers.map((layer, index) => 
                                        <Layer
                                            key={layer.order_id}
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
                    <div>
                        <input 
                            className="addLayer" 
                            name="availableList" 
                            type="button" 
                            value="Додати шар" 
                            onClick={ () => this.props.modalWindow('addLayer') } 
                        />
                    </div>
                </div>
            </div>
        );
    }
}
LayerList.propTypes = {
    name: PropTypes.string,
    layers: PropTypes.arrayOf(PropTypes.object),
}

const mapStateToProps = (store, state) => {
    const { layers } = store.users.filter(({login}) => login === state.login)[0];
    return { layers };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeOrder: (layers, direction, currentId) => dispatch(changeOrder(layers, direction, currentId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayerList);