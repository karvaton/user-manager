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
        
        const { filters, print, available_wms, selectable_wms, editable_wms, parameters } =
            this.props.user;
        const wmsList = [
            ...JSON.parse(available_wms),
            ...JSON.parse(selectable_wms),
            ...JSON.parse(editable_wms),
        ];

        const params = parameters.split("]").reduce((obj, line) => {
            const [id, paramArr = ""] = line.split("[");
            obj[id] = paramArr.split(",");
            return id ? obj : {};
        }, {});

        this.state = {
            wmsList,
            parameters: params,
            filters: JSON.parse(filters.replaceAll("&quot;", '\\"')),
            print,
        };
    }
    render() {
        const {login, name, email} = this.props.user;

        return (
            <div className="list">
                <UserInfo login={login} name={name} email={email}>
                    <LayersInfo
                        wmsLayers={this.state.wmsList}
                        modalWindow={this.props.modalWindow}
                    />
                </UserInfo>
                <Buttons />
            </div>
        );
    }
}
User.propTypes = {
    user: PropTypes.object.isRequired,
    modalWindow: PropTypes.func
};

export default User;