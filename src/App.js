import "./styles/style.css";
import Navbar from './components/nav-bar/Navbar';


const App = ({children, auth}) => (
    auth ? (
        <div className="App">
            <div className="background">
                <h1>Адмін</h1>
                <div id="content">
                    <Navbar />
                    { children }
                </div>
            </div>
        </div>
    ) : (
        children
    )
);

export default App;
