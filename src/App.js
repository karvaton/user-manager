import "./css/style.css";
import { Component } from "react";
import Navbar from './components/nav-bar/Navbar';
import UserManager from "./components/user-manager/user-page";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: "users",

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
                        {this.state.page === "users" && (
                            <UserManager />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
