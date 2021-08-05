import { Component } from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        const pageName = (e.target.id).slice(0, -5);
        this.props.onChange(pageName);
    }

    render() {
        return (
            <div id="sidebar">
                <ul id="navigation">
                    <li className="list">
                        <a href="../" target="_blank">
                            Головна сторінка
                            <i className="fa fa-external-link"
                                aria-hidden="true"
                            ></i>
                        </a>
                    </li>
                    <li className="list"
                        onClick={(event) => this.handleClick(event)}
                    >
                        <span id="register-page">Реєстрація користувачів</span>
                    </li>
                    <li className="list"
                        onClick={(event) => this.handleClick(event)}
                    >
                        <span id="users-page">Адміністрування користувачів</span>
                    </li>
                    <li className="list"
                        onClick={(event) => this.handleClick(event)}
                    >
                        <span id="edition-page">Адміністрування змін</span>
                    </li>
                    <li className="list">
                        <a href="../php/exit.php">Вийти</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Navbar;