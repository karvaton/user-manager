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
            {
                /* loading === 'user' ?
                <Loading />
                : */
                users.map(user => 
                    <User
                        key={user.id}
                        user={user}
                        modalWindow={this.props.modalWindow}
                    />
                )
            }
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
