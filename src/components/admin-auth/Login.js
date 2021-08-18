import { Component } from 'react';
import './admin-auth.css';
// import * as auth from '../../backend/authRouter';
// import { history } from '../../history/history';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login(e) {
    //     e.preventDefault();
    //     const {login, password} = this.state;

        // auth.login(login, password)
        //     // .then((res) => console.log(res.length))
        //     .then( res => {
        //         res
        //           ? history.push("/user-manager")
        //           : alert("Неправильний логін або пароль")
        //     }
        // )
    }

    handleChange(e) {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div id="auth-div">
                <form onSubmit={this.login} action="post">
                    <ul className="wrapper">
                        <li className="form-row">
                            <label htmlFor="login">Логін:</label>
                            <input
                                type="text"
                                name="login"
                                onChange={(event) => this.handleChange(event)}
                            />
                        </li>
                        <li className="form-row">
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                name="password"
                                onChange={(event) => this.handleChange(event)}
                            />
                        </li>
                        <li className="form-row">
                            <button type="submit" id="logIn">
                                Увійти
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}

export default Login;