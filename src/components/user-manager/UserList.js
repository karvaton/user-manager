import { Component } from "react";
import { connect } from "react-redux";
import User from "./User";
import { setLayerOrder, setUsers } from "../../state/actions/users";
import { fetchUsers } from "../../state/actions/async/user";


class UserList extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const { users } = this.props;

        return <div id="wrapper">
            {users.map(({id, ...user}) => 
                <User
                    key={id}
                    user={{id, ...user}}
                />
            )}
        </div>
    }
}

const mapStateToProps = store => ({
    users: store.userManager.users,
});

const mapDispatchToProps = dispatch => ({
    setUsers: (users) => dispatch(setUsers(users)),
    getUsers: () => dispatch(fetchUsers()),
    // getLayers: () => dispatch(fetchLayers()),
    setLayers: (login, layers) => dispatch(setLayerOrder(login, layers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
