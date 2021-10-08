import { Component } from "react";
import Tunel from "../common/tunel";
import Loading from "../common/Loading";
import Layer from "./Layer";
import { post } from "../../tools/ajax";

const styles = {
    form: {
        flexDirection: "column",
        margin: "0 15px",
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
        borderWidth: '8px',
        position: 'relative',
        top: '25%',
    },
};

const fields = [
    {
        id: 'name',
        text: "Ім'я",
        placeholder: "Введіть ім'я"
    },
    {
        id: 'email',
        text: 'E-mail',
        placeholder: "Введіть електронну пошту"
    },
    {
        id: 'login',
        text: 'Логін',
        placeholder: "Придумайте логін"
    },
    {
        id: 'password',
        text: 'Пароль',
        placeholder: "Придумайте пароль"
    },
];


function toDouble(input) {
    let output = "", i = 0;
    for (i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2) + " ";
    }
    return output;
}

function codeStr(text) {
    let input = toDouble(text).split(/\s/).join("");
    let str = parseInt(input, 2).toString(36);
    let twoZero = str.indexOf("00");
    return str.slice(0, twoZero);
}


const FormField = ({ id, text, placeholder, value, func, type }) => (
    <Tunel>
        <label htmlFor={id}>{text}</label>
        <input
            type={(type || id) === "password" ? "password" : "text"}
            id={id}
            className="form-content"
            name={id}
            placeholder={placeholder}
            onChange={event => func(event)}
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
            availableList: [],
            layers: [],
            loading: false,
            print: false,
            entry: {},
            status: null
        };
        this.input = this.input.bind(this);
        this.switchSelect = this.switchSelect.bind(this);
        this.fetchGroups = this.fetchGroups.bind(this);
        this.fetchLayers = this.fetchLayers.bind(this);
        this.getSublayers = this.getSublayers.bind(this);
        this.getLayerData = this.getLayerData.bind(this);
        this.getLayerList = this.getLayerList.bind(this);
        this.addLayerHandler = this.addLayerHandler.bind(this);
        this.removeLayerHandler = this.removeLayerHandler.bind(this);
        this.createUser = this.createUser.bind(this);
        this.togglePrint = this.togglePrint.bind(this);
        this.getDBparams = this.getDBparams.bind(this);
    }

    async createUser() {
        const { name, email, login, password, layers = [], print, entry, status = null } = this.state;
        const user = { name, email, login, password, print, entry, status };
        let userPost = await post.json("http://localhost:5000/users/", user);
        let layersPost = await post.json("http://localhost:5000/layers/" + login, layers);
        console.log(await userPost.json());
        console.log(await layersPost.json());
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
        const password = e.target.value;
        const entry = this.state.entry;
        entry.password = password;
        this.setState(() => ({
            entry
        }));
    }

    async switchSelect(e) {
        e.preventDefault();
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
                let res = await this.getLayerList(this.state.workspace, dbname);

                let entry = await this.getDBparams(
                    this.state.workspace,
                    dbname
                );
                this.setState(() => ({
                    loading: false,
                    availableList: res,
                    entry,
                }));
            } else {
                this.setState(() => ({
                    availableList: [],
                    entry: {},
                }));
            }
        }
    }

    getDBases(ws) {
        if (ws) {
            fetch(`http://localhost:5000/geoserver/workspaces/${ws}/datastores`)
                .then((res) => res.json())
                .then((json) =>
                    json?.dataStores.dataStore?.map(({ name }) => name)
                )
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
                availableList: [],
            }));
        }
    }

    async getDBparams(ws, ds) {
        let res = await fetch(
            `http://localhost:5000/geoserver/workspaces/${ws}/datastores/${ds}`
        );
        let json = await res.json();
        let entryKeys = ["host", "port", "database", "user", "schema"];
        return json.dataStore.connectionParameters.entry
            .filter((item) => entryKeys.includes(item["@key"]) && item["$"])
            .reduce((entryObj, entry) => {
                entryObj[entry["@key"]] = entry["$"];
                return entryObj;
            }, {});
    }

    async getLayerList(ws, ds) {
        this.setState(() => ({ loading: true }));
        let layers = await this.fetchLayers(ws, ds);
        let layergroups = await this.fetchGroups(ws);
        return [...layergroups, ...layers];
    }

    async fetchGroups(ws) {
        let res = await fetch(
            `http://localhost:5000/geoserver/workspaces/${ws}/layergroups`
        );
        let json = await res.json();
        let groups = json?.layerGroups.layerGroup?.map(async ({ name }) => {
            let group = await this.getSublayers(ws, name);
            return group.layerGroup;
        });

        if (groups && groups.length) {
            groups = await Promise.all(groups);

            return groups.map(
                ({ bounds, name, title, publishables }, index) => {
                    let idCode = index.toString(36);
                    return {
                        id: ("g" + codeStr(name) + idCode).slice(0, 16 - idCode.length),
                        name,
                        title,
                        sublayers: publishables.published.map(({ name }) => name),
                        bbox: bounds,
                    }
                }
            );
        } else {
            return [];
        }
    }

    async getSublayers(ws, group) {
        const res = await fetch(
            `http://localhost:5000/geoserver/workspaces/${ws}/layergroups/${group}`
        );
        const json = await res.json();
        return json;
    }

    async fetchLayers(ws, ds) {
        let res = await fetch(
            `http://localhost:5000/geoserver/workspaces/${ws}/datastores/${ds}/featuretypes`
        );
        let json = await res.json();
        let layers = json?.featureTypes?.featureType?.map(async ({ name }) => {
            let info = {}; // await this.getLayerData(ws, ds, name);
            let id = "l" + name;
            return info ? { name, id, ...info } : { name, id };
        });

        if (layers && layers.length) {
            layers = await Promise.all(layers);

            return layers.filter((item) => !!item);
        } else {
            return [];
        }
    }

    async getLayerData(ws, ds, layerId) {
        const res1 = await fetch(
            `http://localhost:5000/geoserver/workspaces/${ws}/layers/${layerId}`
        );
        const res2 = await fetch(
            `http://localhost:5000/geoserver/workspaces/${ws}/datastores/${ds}/featuretypes/${layerId}`
        );
        const json1 = await res1.json();
        const json2 = await res2.json();
        const layer = json1.layer;
        const feature = json2.featureType;

        if (!(layer && feature)) return;
        let { defaultStyle, styles } = layer;

        if (styles) {
            styles = styles.style
                .filter((item) => item !== "null")
                .map(({ name }) => ({ name }));
            styles.unshift({
                name: defaultStyle.name,
                isDefault: true,
            });
        }
        let { title, srs, latLonBoundingBox } = feature;
        return {
            title,
            styles,
            srs,
            bbox: latLonBoundingBox,
        };
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
            entry: {password},
            availableList,
            loading,
            print,
        } = this.state;

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
                        func={this.input}
                        value={password}
                        onChange={(event) => {}}
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
                    {loading ? (
                        <Loading style={styles.loader} />
                    ) : availableList.length ? (
                        availableList.map(
                            ({ name, title, id, styles, sublayers }) => (
                                <Layer
                                    key={id}
                                    id={id}
                                    name={name}
                                    title={title}
                                    styles={styles}
                                    sublayers={sublayers}
                                    addLayer={this.addLayerHandler}
                                    removeLayer={this.removeLayerHandler}
                                />
                            )
                        )
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

export default UserForm;