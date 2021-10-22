import { Component } from "react";
import PropTypes from 'prop-types';
import Layer from './Layer';
import { connect } from "react-redux";
import { changeOrder } from "../../state/actions/layers";
import counter from "../../tools/counter";
import scrollSpy from "../../tools/scrollSpy";

class LayerList extends Component {
    static propTypes = {
        name: PropTypes.string,
        layers: PropTypes.arrayOf(PropTypes.object),
    };

    constructor(props) {
        super(props);

        const { layers } = this.props;
        this.state = {
            index: 0,
            afterClass: '',
            layers,
        };
        this.handlerReplaceLayer = this.handlerReplaceLayer.bind(this);
        this.setUpLayer = this.setUpLayer.bind(this);
    }

    componentDidMount() {
        const max = document.getElementsByClassName("tbody").length;
        let index = counter(max);
        this.setState({ index });
        this.getAfterClass()
    }

    handlerReplaceLayer(currentId, direction) {
        const { login, changeOrder } = this.props;
        changeOrder({ login, currentId, direction });
    }

    setUpLayer(id) {
        const [layer] = this.state.list.filter(({ lid }) => lid === id)[0];
        this.props.modalWindow(layer);
    }

    getAfterClass() {
        const scroll = scrollSpy(".tbody", this.state.index);
        const afterClass = scroll === "scroll"
            ? " thead-scrolled"
            : scroll === "scrolled"
            ? " thead-scrolled-down"
            : "";
        this.setState({afterClass});
    }

    render() {
        const layers = this.props.layers.sort(
            (a, b) => a.order_id - b.order_id
        );
        const thClass = this.state.afterClass;

        return (
            <div className="line">
                <div className="typename">Доступні шари:</div>
                <div className="wms">
                    <div className="layer-list">
                        <div className={"thead" + thClass}>
                            <div className="th">Робоча область</div>
                            <div className="th">Назва</div>
                            <div className="th"></div>
                            <div className="th"></div>
                            <div className="th"></div>
                            <div className="th"></div>
                        </div>

                        <div
                            className="tbody"
                            onScroll={() => this.getAfterClass()}
                        >
                            {layers.length ? (
                                layers.map((layer) => (
                                    <Layer
                                        key={layer.lid}
                                        login={this.props.login}
                                        layer={layer}
                                        removeLayer={this.handlerRemoveLayer}
                                        replaceLayer={this.handlerReplaceLayer}
                                        setUp={this.setUpLayer}
                                    />
                                ))
                            ) : (
                                <div className="colspan-6">Відсутні</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <input
                            className="addLayer"
                            name="availableList"
                            type="button"
                            value="Додати шар"
                            onClick={() => this.props.modalWindow("addLayer")}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store, props) => {
    const { layers } = store.userManager.users.filter(({login}) => login === props.login)[0];
    return { layers };
};

const mapDispatchToProps = (dispatch) => ({
    changeOrder: (layers, direction, currentId) => dispatch(changeOrder(layers, direction, currentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LayerList);