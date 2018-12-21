import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from '../../components/Tabs/Tabs';
import Messages from "../../components/Messages/Messages";
import classes from './Chat.module.css';

import * as actions from "../../store/actions";
import MessageInput from "../../components/MessageInput/MessageInput";
import Users from "../../components/Users/Users";

const tabs = [
    {title: 'Name 1'},
    {title: 'Name 2'}
];

class Chat extends Component {
    componentDidMount() {
        this.props.onInitMessages();
    }

    render() {
        return (
            <div className={classes.Chat}>
                <div className={classes.ChatMessages}>
                    <Tabs tabs={tabs}/>
                    <Messages messages={this.props.messages}/>
                    <MessageInput userName={this.props.userName} messageSend={this.props.onMessageSend}/>
                </div>
                <div className={classes.ChatUsers}>
                    <Users></Users>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages.messages,
        userName: state.auth.userName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMessageSend: (event, message, userName) => {
            dispatch(actions.sendMessage('default', message, userName));
        },
        onInitMessages: () => dispatch(actions.initMessages()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
