import { Component } from "react";
import { connect } from "react-redux";
import User from "./User";
import { setLayerOrder, setUsers } from "../../actions/users";
import { fetchUsers } from "../../actions/async/fetchUsers";
import { fetchLayers } from "../../actions/async/fetchLayers";


class UserList extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const { users } = this.props;
        return <div id="wrapper">
            {users.map(({id, login}) => 
                <User
                    key={id}
                    login={login}
                />
            )}
        </div>
    }
}

const mapStateToProps = store => {
    const {users, layers, } = store;
    return {users, layers, };
}

const mapDispatchToProps = dispatch => {
    return {
        setUsers: (users) => dispatch(setUsers(users)),
        getUsers: () => dispatch(fetchUsers()),
        getLayers: () => dispatch(fetchLayers()),
        setLayers: (login, layers) => dispatch(setLayerOrder(login, layers)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
