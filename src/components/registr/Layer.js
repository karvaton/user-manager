import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { activateLayer, changeLayer, deactivateLayer } from "../../state/actions/registration";


const style = {
    aciTreePush: {
        marginRight: '5px',
        transition: '.1s'
    },
    sublayers: {
        display: 'none',
        justifyContent: 'space-between'
    }
};


class Layer extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string,
        // style: PropTypes.arrayOf(PropTypes.object),
        // sublayers: PropTypes.array,
    }

    constructor(props) {
        super(props);

        this.state = {
            style: props.styles,
            display: false,
        }
        this.toggleLayer = this.toggleLayer.bind(this);
        this.setLayer = this.setLayer.bind(this);
    }

    toggleLayer(e) {
        const { id } = this.props;
        let { access } = this.props;

        if (e.target.name !== access) {
            access = e.target.name;
        } else {
            access = null;
        }
        this.props.changeLayer({id, access});
        this.setLayer(access);
    }

    setLayer(access) {
        if (access === "selectable" || access === "editable") {
            let { id, activeLayer } = this.props;
            if (!activeLayer?.editing) {
                this.props.activate(id);
            } else {
                alert(`Зaвершіть редагування шару ${activeLayer.id}`);
            }
        } else {
            this.props.deactivate();
        }
    }

    render() {
        const { id, name, sublayers, styles, access, activeLayer } = this.props;
        const { display } = this.state;
        const activeClass = activeLayer?.id === id ? " option-active" : '';

        return (
            <div id={id} className={"option" + activeClass} onClick={() => this.setLayer(access)}>
                <div>
                    {(sublayers || styles) && (
                        <span
                            className="aciTreePush"
                            style={{
                                ...style.aciTreePush,
                                transform: display ? 'rotate(90deg)' : ''
                            }}
                            onClick={() => this.toggleSublayers()}
                        >
                            &gt;
                        </span>
                    )}
                    {sublayers ? (
                        <b className="layer-group">{name}</b>
                    ) : (
                        <p className="lyr-name">{name}</p>
                    )}
                    <div className="radio">
                        <input
                            type="checkbox"
                            name="visible"
                            className="switcher vis-ch"
                            checked={access === "visible"}
                            onChange={this.toggleLayer}
                        />
                        <input
                            type="checkbox"
                            name="selectable"
                            className="switcher sel-ch"
                            checked={access === "selectable"}
                            onChange={this.toggleLayer}
                        />
                        <input
                            type="checkbox"
                            name="editable"
                            className="switcher edt-ch"
                            checked={access === "editable"}
                            onChange={this.toggleLayer}
                        />
                    </div>
                </div>
                {sublayers && (
                    <ul
                        className="sublayer"
                        style={{
                            ...style.sublayers,
                            display: display ? "block" : "none",
                        }}
                    >
                        {sublayers.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
                {styles && (
                    <ul className="styles">
                        {styles.map(({ name, isDefault }, index) => (
                            <li
                                key={index}
                                style={{
                                    ...style.sublayers,
                                    display: display ? "block" : "none",
                                }}
                            >
                                {isDefault ? (
                                    <b title="за замовчуванням">{name}</b>
                                ) : name}
                                <div className="radio">
                                    <input
                                        type="radio"
                                        name={id}
                                        className="switcher"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    activate: (layer) => dispatch(activateLayer(layer)),
    deactivate: () => dispatch(deactivateLayer()),
    changeLayer: (layer) => dispatch(changeLayer(layer)),
});

export default connect(null, mapDispatchToProps)(Layer);