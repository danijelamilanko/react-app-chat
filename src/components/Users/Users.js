import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Users.module.css';
import userImg from '../../assets/images/users/user.jpg';

class Users extends Component {
    render() {
        return (
            <div className={classes.Users}>
                {this.props.users.map(user => (
                    <div key={user.id}>
                        <img src={userImg} alt="Dmitry Ivaniuk"/>
                        <span>{user.name}</span>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.users
    };
};

export default connect(mapStateToProps, null)(Users);
