import { Component } from "react";
import PropTypes from 'prop-types';
import LayerList from "./LayerList";


const PasswordForm = () => (
    <form name="password">
        Пароль:
        <input type="password" name="password" />
        <input type="submit" className="change-password" value="Змінити" />
    </form>
);

const UserInfo = ({ login, name, email, children }) => (
    <div className="query" name="admin">
        <div name={login}>Логін: {login}</div>
        <div name={name}>І'мя: {name}</div>
        <div name={email}>e-mail: {email}</div>
        <div className="wrap-info">
            {children}
        </div>
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
        
        const { print } = this.props.user;

        this.state = {
            print,
        };
    }
    render() {
        const {login, name, email} = this.props.user;

        return (
            <div className="list">
                <UserInfo login={login} name={name} email={email}>
                    <PasswordForm />
                    <LayerList
                        login={login}
                        modalWindow={this.props.modalWindow}
                    />
                </UserInfo>
                <div className="buttons">
                    <button className="delete-user">✕</button>
                </div>
            </div>
        );
    }
}
User.propTypes = {
    user: PropTypes.object.isRequired,
    modalWindow: PropTypes.func
};

export default User;