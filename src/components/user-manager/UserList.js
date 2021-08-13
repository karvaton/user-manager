import { Component } from "react";
// import DATA from "../../data/users";
import User from "./User";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/users")
            .then((response) => {
                return response.json();
            })
            .then((users) => {
                this.setState(() => ({ users }));
            });
    }

    render() {
        const userList = this.state.users;
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

export default UserList;
