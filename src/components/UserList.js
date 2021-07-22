import { Component } from "react";
import DATA from "../data/users";
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
        this.setState({users});
    }

    render() {
        const userList = this.state.users;

        return <div id="wrapper">
            {userList.map(({id, login, name, email, status, available_wms, selectable_wms, editable_wms, parameters, filters, print, db_conn}) => {
                return <User 
                    key={id} 
                    email={email} 
                    login={login}
                    name={name}
                    available_wms={available_wms}
                    selectable_wms={selectable_wms}
                    editable_wms={editable_wms}
                    filters={filters}
                    parameters={parameters}
                    print={print}
                />
            })}
        </div>
    }
}

export default UserList;
