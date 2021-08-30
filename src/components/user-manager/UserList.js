import { Component } from "react";
import { connect } from "react-redux";
import User from "./User";
import { setUsers } from "../../actions/users";
import { fetchUsers } from "../../actions/async/fetchUsers";


class UserList extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const userList = this.props.users;
        return <div id="wrapper">
            {userList.map(item => {
                console.log();
                return (
                    <User
                        key={item.id}
                        user={item}
                        modalWindow={this.props.modalWindow}
                    />
                );
            })}
        </div>
    }
}

const mapStateToProps = store => {
    const users = [...store.users];
    return {users};
}

const mapDispatchToProps = dispatch => {
    return {
        setUsers: (users) => dispatch(setUsers(users)),
        getUsers: () => dispatch(fetchUsers()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
