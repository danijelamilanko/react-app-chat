import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Users.module.css';


class Users extends Component {
    render() {
        return (
            <div className={classes.Users}>
                <ul>
                    {this.props.users.map(user => (
                        <li key={user.id}><span>{user.name}</span></li>
                    ))}
                </ul>
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
