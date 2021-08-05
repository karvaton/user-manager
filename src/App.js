import "./css/style.css";
import { Component } from "react";
import UserList from './components/user-manager/UserList';
import Navbar from './components/nav-bar/Navbar';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: "users"
        }
        this.changePage = this.changePage.bind(this);
    }

    changePage(page) {
        this.setState({page});
    }

    render() {
        return (
            <div className="App">
                <div className="background">
                    <h1>Адмін</h1>
                    <div id="content">
                        <Navbar onChange={this.changePage} />
                        {this.state.page === "users" && <UserList />}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
