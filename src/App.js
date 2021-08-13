import "./css/style.css";
import Navbar from './components/nav-bar/Navbar';
// import UserManager from "./components/user-manager/user-page";

const App = ({children, auth}) => (
    auth ? (
        <div className="App">
            <div className="background">
                <h1>Адмін</h1>
                <div id="content">
                    <Navbar />
                        {/* <UserManager /> */}
                    {
                        //this.state.page === "users" && 
                        //this.props.
                        children
                    }
                </div>
            </div>
        </div>
    ) : (
        children
    )
);

export default App;
