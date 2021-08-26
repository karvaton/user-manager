import { Component } from "react";
import Tunel from "../common/tunel";

const styles = {
    form: {
        flexDirection: 'column',
        margin: '0 15px'
    },
    layerName: {
        display: 'inline-block',
        width: '81%'
    },
    noLayers: {
        fontSize: '10pt',
        color: 'grey',
        padding: '26px 65px'
    },
    submitButton: {
        width: '250px'
    }
}


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
]


const FormField = ({ id, text, placeholder, value, func }) => (
    <Tunel>
        <label htmlFor={id}>{text}</label>
        <input
            type="text"
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
            name: '',
            email: '',
            login: '',
            password: '',
            workspaceList: [''],
            workspace: '',
            dbases: [''],
            dbname: '',
            dbpass: '',
            layers: []
        }
        this.input = this.input.bind(this);
        this.switchSelect = this.switchSelect.bind(this);
    }

    input(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState(() => ({
            [name]: value
        }));
    }

    switchSelect(e) {
        e.preventDefault();
        const { workspaceList, dbases } = this.state;
        const {value, name} = e.target;

        if (name === 'workspaces') {
            this.setState(() => ({
                workspace: workspaceList[value]
            }));
            this.getDBases(workspaceList[value]);
        
        } else if (name === "datastore") {
            this.setState(() => ({
                dbname: dbases[value]
            }));
        }
    }

    getDBases(ws) {
        fetch(`http://localhost:5000/geoserver/workspaces/${ws}/datastores`)
            .then((res) => res.json())
            .then((json) => json?.dataStores.dataStore?.map(({ name }) => name))
            .then((ds) => {
                ds = ds || [];
                this.setState(() => ({
                    dbases: ['', ...ds],
                }));
                // console.log(ds);
            });
    }

    componentDidMount() {
        fetch("http://localhost:5000/geoserver/workspaces")
        .then(res => res.json())
        .then(json => json?.workspaces.workspace.map(({ name }) => name))
        .then(workspases => {
            workspases = workspases || [];
            this.setState(() => ({
                workspaceList: ['', ...workspases]
            }));
        });
    }

    render() {
        const {workspaceList, workspace, dbases, dbname, dbpass, layers} = this.state;

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
                    value={workspaceList.indexOf(workspace)}
                    onChange={(event) => this.switchSelect(event)}
                >
                    {workspaceList.map((item, index) => (
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
                    value={dbases.indexOf(dbname)}
                    onChange={(event) => this.switchSelect(event)}
                    disabled={!dbases.length}
                >
                    {dbases.map((item, index) => (
                        <option key={index} value={index}>
                            {item}
                        </option>
                    ))}
                </select>

                <FormField
                    id="dbpass"
                    text="Пароль бази даних"
                    placeholder="Введіть пароль для бази даних"
                    func={this.input}
                    value={dbpass}
                />

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

                <div name="layers" id="available" className="form-content">
                    {layers.length ? (
                        layers.map((item) => <div>{item}</div>)
                    ) : (
                        <p style={styles.noLayers}>
                            <i>Немає доступних шарів</i>
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="print">
                        <input type="checkbox" name="print" id="print" />
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
                />
                <p id="done-msg"></p>
            </div>
        );
    }
}

export default UserForm;