import React, { Component } from 'react';

import classes from './Users.module.css';
import userImg from '../../assets/images/users/user.jpg';

class Users extends Component {
    render() {
        return (
            <div className={classes.Users}>
                {this.props.users.map(user => (
                    <div key={user._id}>
                        <img src={userImg} alt="Dmitry Ivaniuk"/>
                        <span>{user.firstName}</span>
                    </div>
                ))}
            </div>
        );
    }
}

export default Users;
