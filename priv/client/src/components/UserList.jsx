import React, { Component } from 'react';

class UserList extends Component {

    constructor(props) {
        super();
        // TODO: to remove
        var userForTest = [
            { key: 0, name: 'nathan'},
            { key: 1, name: 'ayla'},
            { key: 2, name: 'thib'}
        ]

        this.state = { users: userForTest }
    }

    render () {
        return (
            <ul>
                {this.state.users.map( user => (
                    <li key={user.key}>{user.name}</li>
                ))}
            </ul>
        );
    }
}

export default UserList;
