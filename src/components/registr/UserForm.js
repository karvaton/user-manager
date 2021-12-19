import { Component } from "react";
import { post } from "../../tools/ajax";
import { connect } from "react-redux";
import { fetchLayerList } from "../../state/actions/async/registration";
import { clearLayers, deactivateLayer, setEntry, startLoading } from "../../state/actions/registration";
import AvailableLayerList from "./LayerList";


const styles = {
    form: {
        flexDirection: "column",
        margin: "0 15px 50px",
    },
    submitButton: {
        width: "250px",
    },
};

const fields = [{
    id: "name",
    text: "Ім'я",
    placeholder: "Введіть ім'я",
}, {
    id: "email",
    text: "E-mail",
    placeholder: "Введіть електронну пошту",
}, {
    id: "login",
    text: "Логін",
    placeholder: "Придумайте логін",
}, {
    id: "password",
    text: "Пароль",
    placeholder: "Придумайте пароль",
}];

const FormField = ({ id, text, placeholder, value, func, type }) => (
    <>
        <label htmlFor={id}>{text}</label>
        <input
            type={(type || id) === "password" ? "password" : "text"}
            id={id}
            className="form-content"
            name={id}
            placeholder={placeholder}
            onChange={(event) => func(event)}
            value={value}
        />
        <p className="message" id={"msg-" + id}></p>
    </>
);

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            login: "",
            password: "",
            workspaceList: [],
            workspace: "",
            dbases: [],
            dbname: "",
            layers: [],
            print: false,
            entry: {},
            status: null,
            dbpass: "",
        };
    }

    componentDidMount() {
        post.json("http://localhost:5000/gs/workspaces")
            .then((res) => res.json())
            .then((workspases) => {
                workspases = workspases || [];
                this.setState(() => ({
                    workspaceList: [...workspases],
                }));
            });
    }

    async createUser() {
        const {
            name,
            email,
            login,
            password,
            print,
            status = null,
        } = this.state;

        let { layers = [], entry } = this.props;
        layers = layers
            .filter(({ access }) => !!access)
            .map((layer) => ({
                ...layer,
                parameters: layer.parameters
                    .filter(({ checked }) => checked)
                    .map(({ name, title }) => ({ name, title })),
            }));
        const user = {
            name,
            email,
            login,
            password,
            layers,
            print,
            entry,
            status,
        };
        // console.log(user);
        let userPost = await post.json("http://localhost:5000/users/", user);
        console.log(await userPost.json());
    }

    input(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState(() => ({
            [name]: value,
        }));
    }

    inputPass(e) {
        e.preventDefault();
        const entry = { ...this.props.entry };
        entry["password"] = e.target.value;
        this.props.setEntry(entry);
    }

    switchSelect(e) {
        e.preventDefault();
        this.props.deactivateLayer();
        this.props.setEntry({});
        const { workspaceList, dbases } = this.state;
        const { value, name } = e.target;

        if (name === "workspaces") {
            const workspace = workspaceList[value - 1] || "";
            this.setState(() => ({ workspace, dbname: "" }));
            this.getDBases(workspace);
        } else if (name === "datastore") {
            const dbname = dbases[value - 1] || "";
            this.setState(() => ({ dbname }));

            if (dbname) {
                this.props.startLoading("layers");
                this.props.getLayers(this.state.workspace, dbname);
                this.getDBparams(this.state.workspace, dbname);
                return;
            } else {
                this.props.setEntry({});
            }
        }
        this.props.clearLayers();
    }

    getDBases(workspace) {
        if (workspace) {
            post.json(`http://localhost:5000/gs/datastores`, { workspace })
                .then((res) => res.json())
                .then((ds) => {
                    ds = ds || [];
                    this.setState(() => ({
                        dbases: [...ds],
                        dbname: "",
                    }));
                });
        } else {
            this.setState(() => ({
                dbases: [],
                dbname: "",
            }));
            this.props.clearLayers();
        }
    }

    async getDBparams(workspace, dataStore) {
        let res = await post.json(`http://localhost:5000/gs/datastore/entry`, {
            workspace,
            dataStore,
        });
        let entry = await res.json();
        this.props.setEntry(entry);
    }

    togglePrint(e) {
        const print = e.target.checked;
        this.setState(() => ({ print }));
    }

    render() {
        const { workspaceList, workspace, dbases, dbname, print } = this.state;
        const {
            entry: { password = "" },
        } = this.props;

        return (
            <div id="form" style={styles.form}>
                {fields.map(({ id, text, placeholder }) => (
                    <FormField
                        key={id}
                        id={id}
                        text={text}
                        placeholder={placeholder}
                        value={this.state[id]}
                        func={this.input}
                    />
                ))}

                <label htmlFor="workspaces">Робоча область</label>
                <select
                    name="workspaces"
                    size="1"
                    className="form-content"
                    value={workspaceList.indexOf(workspace) + 1}
                    onChange={(event) => this.switchSelect(event)}
                >
                    {["", ...workspaceList].map((item, index) => (
                        <option key={index} value={index}>
                            {item}
                        </option>
                    ))}
                </select>

                <label htmlFor="datastore">База даних</label>
                <select
                    name="datastore"
                    size="1"
                    className="form-content"
                    value={dbases.indexOf(dbname) + 1}
                    onChange={(event) => this.switchSelect(event)}
                    disabled={dbases.length === 0}
                >
                    {["", ...dbases].map((item, index) => (
                        <option key={index} value={index}>
                            {item}
                        </option>
                    ))}
                </select>

                {dbname && (
                    <FormField
                        id="dbpass"
                        text="Пароль бази даних"
                        type="password"
                        placeholder="Введіть пароль для бази даних"
                        func={(event) => this.inputPass(event)}
                        value={password}
                    />
                )}

                <label htmlFor="available">Доступні шари</label>

                <AvailableLayerList />

                <div>
                    <label htmlFor="print">
                        <input
                            type="checkbox"
                            name="print"
                            id="print"
                            checked={print}
                            onChange={this.togglePrint}
                        />
                        Дозволити друк
                    </label>
                </div>

                <span className="attantion"></span>
                <input
                    type="button"
                    id="done"
                    name="submit"
                    className="form-btn"
                    value="Зареєструвати користувача"
                    style={styles.submitButton}
                    onClick={this.createUser}
                />
                <p id="done-msg"></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.registration,
});

const mapDispatchToProps = (dispatch) => ({
    getLayers: (ws, ds) => dispatch(fetchLayerList(ws, ds)),
    startLoading: (target) => dispatch(startLoading(target)),
    clearLayers: () => dispatch(clearLayers()),
    setEntry: (entry = {}) => dispatch(setEntry(entry)),
    deactivateLayer: () => dispatch(deactivateLayer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
