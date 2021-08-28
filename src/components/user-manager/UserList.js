import { Component } from "react";
import { connect } from "react-redux";
import User from "./User";
import { setUsers } from "../../actions/users";


class UserList extends Component {
    componentDidMount() {
        fetch("http://localhost:5000/users")
            .then((response) => {
                return response.json();
            })
            .then((users) => {
                // this.setState(() => ({ users }));
                this.props.setUsers(users);
            });
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
    console.log(store);
    return {
        users: store.users.userList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUsers: (users) => dispatch(setUsers(users)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
