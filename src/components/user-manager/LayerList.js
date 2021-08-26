import { Component } from "react";
import PropTypes from 'prop-types';
import Layer from './Layer';
import Loading from '../common/Loading';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {removeLayer} from '../../actions/layers'

class LayerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            loading: true,
        }
        this.handlerRemoveLayer = this.handlerRemoveLayer.bind(this);
        this.handlerReplaceLayer = this.handlerReplaceLayer.bind(this);
        this.setUpLayer = this.setUpLayer.bind(this);
        // this.openAddLayersWindow = this.openAddLayersWindow.bind(this);
    }

    componentDidMount() {
        const { login } = this.props;
        fetch(`http://localhost:5000/users/${login}/layers`)
            .then((res) => {
                return res.json();
            })
            .then((list) => {
                this.setState(() => ({ list, loading: false }));
            })
            .catch(err => console.log(err));
    }

    handlerRemoveLayer(id) {
        const list = this.state.list.filter(({layerId}) => layerId !== id);
        this.setState({list});
    }

    handlerReplaceLayer(currentId, direction) {
        const next = direction === 'up' ? -1 : 0,
              list = [...this.state.list],
              currentLayer = list.filter(({lid}) => lid === currentId)[0],
              startIndex = list.indexOf(currentLayer) + next,
              prevLayer = list[startIndex],
              nextLayer = list[startIndex + 1];
        
        list.splice(startIndex, 2, nextLayer, prevLayer);
        this.setState({ list });
    }

    setUpLayer(id) {
        const [layer] = this.state.list.filter(({lid}) => lid === id);
        this.props.modalWindow(layer);
    }

    render() {
        const { name } = this.props;
        const { list, loading } = this.state;

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
                                {loading ? 
                                    <tr>
                                        <td colSpan="6">
                                            <Loading />
                                        </td>
                                    </tr>
                                 : 
                                    (list.length ?
                                        list.map(layer => 
                                            <Layer
                                                key={layer.lid}
                                                layer={layer}
                                                removeLayer={this.removeLayer}
                                                replaceLayer={this.handlerReplaceLayer}
                                                setUp={this.setUpLayer}
                                            />
                                        )

                                        : <tr className="layer-line">
                                            <td colSpan="3">Відсутні</td>
                                        </tr>
                                    )
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
    list: PropTypes.arrayOf(PropTypes.object),
}

export default LayerList;