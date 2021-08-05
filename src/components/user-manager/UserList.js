import { Component } from "react";
// import { query } from "../../backend/db";
import DATA from "../../data/users";
import User from "./User";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        const users = [...DATA];
        // client.connect();
        // client.query(query.getUsers, (err, res) => {
        //     console.log(err ? err.stack : res.rows);
        //     client.end();
        // })
        // console.log(query.getUsers);
        this.setState({users});
    }

    render() {
        const userList = this.state.users;
        return <div id="wrapper">
            {userList.map(({ id, login, name, email, status, available_wms, selectable_wms, editable_wms, parameters, filters, print }) => {
                console.log();
                return (
                    <User
                        key={id}
                        email={email}
                        login={login}
                        name={name}
                        wmsList={[
                            ...JSON.parse(available_wms),
                            ...JSON.parse(selectable_wms),
                            ...JSON.parse(editable_wms),
                        ]}
                        filters={filters}
                        parameters={parameters}
                        print={print}
                        status={status}
                    />
                );
            })}
        </div>
    }
}

export default UserList;
