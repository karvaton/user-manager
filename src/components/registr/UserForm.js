import { Component } from "react";
import Tunel from "../common/tunel";
import Loading from "../common/Loading";
import Layer from "./Layer";
import { post } from "../../tools/ajax";
import { connect } from "react-redux";
import { fetchLayerList } from "../../state/actions/async/registration";
import { clearLayers, deactivateLayer, setEntry, startLoading } from "../../state/actions/registration";

const styles = {
    form: {
        flexDirection: "column",
        margin: "0 15px 50px",
    },
    layerName: {
        display: "inline-block",
        width: "81%",
    },
    noLayers: {
        fontSize: "10pt",
        color: "grey",
        padding: "26px 65px",
    },
    submitButton: {
        width: "250px",
    },
    loader: {
        height: "90px",
        width: "90px",
        borderWidth: "8px",
        position: "relative",
        top: "25%",
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
    <Tunel>
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
    </Tunel>
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
            dbpass: '',
        };
        this.input = this.input.bind(this);
        this.switchSelect = this.switchSelect.bind(this);
        this.addLayerHandler = this.addLayerHandler.bind(this);
        this.removeLayerHandler = this.removeLayerHandler.bind(this);
        this.createUser = this.createUser.bind(this);
        this.togglePrint = this.togglePrint.bind(this);
        this.getDBparams = this.getDBparams.bind(this);
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
        let {
            layers = [],
            entry,
        } = this.props;
        layers = layers.filter(({access}) => !!access).map(layer => ({
                ...layer,
                parameters: layer.parameters
                    .filter(({ checked }) => checked)
                    .map(({ name, title }) => ({ name, title })
                ),
            })
        );
        const user = { name, email, login, password, layers, print, entry, status };
        // console.log(user);
        let userPost = await post.json("http://localhost:5000/users/", user);
        console.log(await userPost.json());
    }

    addLayerHandler(layer) {
        const { layers, workspace } = this.state;
        layer.workspace = workspace;
        layers.push(layer);
        this.setState(() => ({ layers }));
    }

    removeLayerHandler(layerId) {
        const layerList = this.state.layers;
        const layers = layerList.filter(({ id }) => id !== layerId);
        this.setState(() => ({ layers }));
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
        const entry = {...this.props.entry};
        entry['password'] = e.target.value;
        this.props.setEntry(entry);
    }

    switchSelect(e) {
        e.preventDefault();
        this.props.deactivateLayer();
        this.props.setEntry({});
        const { workspaceList, dbases } = this.state;
        const { value, name } = e.target;

        if (name === "workspaces") {
            let workspace = workspaceList[value - 1] || "";
            this.setState(() => ({ workspace }));
            this.getDBases(workspace);
        
        } else if (name === "datastore") {
            let dbname = dbases[value - 1] || "";
            this.setState(() => ({ dbname }));

            if (dbname) {
                this.props.startLoading('layers');
                this.props.getLayers(this.state.workspace, dbname); 
                this.getDBparams(
                    this.state.workspace,
                    dbname
                );
            } else {
                this.props.clearLayers();
                this.props.setEntry();
            }
        }
    }

    getDBases(ws) {
        if (ws) {
            fetch(`http://localhost:5000/geoserver/workspaces/${ws}/datastores`)
                .then((res) => res.json())
                .then((json) =>
                    json?.dataStores.dataStore?.map(({ name }) => name)
                ).then((ds) => {
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

    async getDBparams(ws, ds) {
        let res = await fetch(
            `http://localhost:5000/geoserver/workspaces/${ws}/datastores/${ds}`
        );
        let json = await res.json();
        let entryKeys = ["host", "port", "database", "user", "schema"];
        const entry = json.dataStore.connectionParameters.entry
            .filter((item) => entryKeys.includes(item["@key"]) && item["$"])
            .reduce((entryObj, entry) => {
                entryObj[entry["@key"]] = entry["$"];
                return entryObj;
            }, {});
        this.props.setEntry(entry);
    }

    componentDidMount() {
        fetch("http://localhost:5000/geoserver/workspaces")
            .then((res) => res.json())
            .then((json) => json?.workspaces.workspace?.map(({ name }) => name))
            .then((workspases) => {
                workspases = workspases || [];
                this.setState(() => ({
                    workspaceList: [...workspases],
                }));
            });
    }

    togglePrint(e) {
        const print = e.target.checked;
        this.setState(() => ({ print }));
    }

    render() {
        const {
            workspaceList,
            workspace,
            dbases,
            dbname,
            print,
        } = this.state;
        const { loading, entry: {password = ''} } = this.props;
        const availableList = this.props.layers || [];

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
                        func={event => this.inputPass(event)}
                        value={password}
                    />
                )}

                <label htmlFor="available">Доступні шари</label>

                <div className="avail-header">
                    <span style={styles.layerName}>Назва шару</span>
                    <div id="search">
                        <input
                            type="text"
                            id="search-field"
                            className="search"
                        />
                        <div className="close-search">
                            <i className="fa fa-times"></i>
                        </div>
                    </div>
                    <div className="search-btn">
                        <i className="fa fa-search"></i>
                    </div>

                    <span className="vis">&#128065; </span>
                    <span className="sel"> &#11009; </span>
                    <span className="edt">&#9998;</span>
                    <hr />
                </div>

                <div
                    name="layers"
                    id="available-layers"
                    className="form-content"
                >
                    {loading === "layers" ? (
                        <Loading style={styles.loader} />
                    ) : availableList.length ? (
                        availableList.map(({ id }) => (
                            <Layer key={id} id={id} />
                        ))
                    ) : (
                        <p style={styles.noLayers}>
                            <i>Немає доступних шарів</i>
                        </p>
                    )}
                </div>

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
