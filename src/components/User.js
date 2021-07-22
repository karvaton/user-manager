import { Component } from "react";
import PropTypes from 'prop-types';
import LayersInfo from "./LayersInfo";

const Buttons = () => (
    <div className="buttons">
        <button className="delete-user">✕</button>
    </div>
);

const UserInfo = ({ login, name, email, children }) => (
    <div className="query" name="admin">
        <div name={login}>Логін: {login}</div>
        <div name={name}>І'мя: {name}</div>
        <div name={email}>e-mail: {email}</div>
        {children}
    </div>
);
UserInfo.propTypes = {
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};


class User extends Component {
    constructor(props) {
        super(props);

        const {available_wms, selectable_wms, editable_wms, filters, print} = this.props;
        const parameters = this.props.parameters.split(']').reduce( (obj, line) => {
            const [id, paramArr = ''] = line.split('[');
            obj[id] = paramArr.split(',');
            return id ? obj : {};
        }, {});

        this.state = {
            wms_layers: {
                available: JSON.parse(available_wms),
                selectable: JSON.parse(selectable_wms),
                editable: JSON.parse(editable_wms),
            },
            layersHash: [],
            parameters,
            filters: JSON.parse(filters.replaceAll("&quot;", '\\"')),
            print,
        };
    }
    render() {
        const {login, name, email} = this.props;
        return <div className="list">
            <UserInfo 
                login={login}
                name={name}
                email={email}
            >
                <LayersInfo wms_layers={this.state.wms_layers}/>
            </UserInfo>
            <Buttons />
        </div>
    }
}
User.propTypes = {
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    available_wms: PropTypes.string,
    selectable_wms: PropTypes.string.isRequired,
    editable_wms: PropTypes.string.isRequired,
    parameters: PropTypes.string.isRequired,
    filters: PropTypes.string.isRequired,
    print: PropTypes.bool.isRequired,
};

export default User;