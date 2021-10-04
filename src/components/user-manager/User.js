import { useState } from "react";
import PropTypes from 'prop-types';
import LayerList from "./LayerList";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, removeUser } from "../../state/actions/async/user";


function PasswordForm(props) {
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const changePassword = (e) => {
        e.preventDefault();
        return e.target.value;
    }

    const submit = (e) => {
        e.preventDefault();
        dispatch(updateUser(
            props.login, [{ password }]
        ));
        setPassword('');
    }

    return (
        <form name="password">
            Пароль:
            <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={event => setPassword(changePassword(event))} 
            />
            <input 
                type="submit" 
                className="change-password" 
                value="Змінити" 
                onClick={event => submit(event)}
            />
        </form>
    );
}
PasswordForm.propTypes = {
    login: PropTypes.string.isRequired,
}

function UserInfo({ login, name, email, children }) {
    return (
        <div className="query" name="admin">
            <div name={login}>Логін: {login}</div>
            <div name={name}>І'мя: {name}</div>
            <div name={email}>e-mail: {email}</div>
            <div className="wrap-info">
                {children}
            </div>
        </div>
    );
}
UserInfo.propTypes = {
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};


function User(props) {
    const { login, name, email, print } = useSelector(state => state.users.filter(user => user.login === props.login)[0]);
    const dispatch = useDispatch();

    return (
        <div className="list">
            <UserInfo login={login} name={name} email={email}>
                <PasswordForm login={login} />
                <LayerList login={login} />
                <p name="print" className="print">
                    Дозволити друк
                    <input
                        type="checkbox"
                        checked={print}
                        onChange={() => dispatch(updateUser(login, [{print: !print}]))}
                    />
                </p>
            </UserInfo>
            <div className="buttons">
                <button 
                    className="delete-user"
                    onClick={() => dispatch(removeUser(login))}
                >✕</button>
            </div>
        </div>
    );
}
User.propTypes = {
    login: PropTypes.string.isRequired,
};


export default User;