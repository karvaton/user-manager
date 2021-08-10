import RouterLink from '../router/Link';

const Navbar = () => (
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
                //onClick={(event) => this.handleClick(event)}
            >
                <RouterLink to="register-user">
                    <span>Реєстрація користувачів</span>
                </RouterLink>
            </li>
            <li className="list"
                //onClick={(event) => this.handleClick(event)}
            >
                <RouterLink to="user-manager">
                    <span>Адміністрування користувачів</span>
                </RouterLink>
            </li>
            <li className="list"
                //onClick={(event) => this.handleClick(event)}
            >
                <RouterLink to="edits-manager">
                    <span>Адміністрування змін</span>
                </RouterLink>
            </li>
            <li className="list">
                <a href="../php/exit.php">Вийти</a>
            </li>
        </ul>
    </div>
);

export default Navbar;