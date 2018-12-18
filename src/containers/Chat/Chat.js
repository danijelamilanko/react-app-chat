import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from '../../components/Tabs/Tabs';
import Messages from "../../components/Messages/Messages";
import classes from './Chat.module.css';

import * as actions from "../../store/actions";
import MessageInput from "../../components/MessageInput/MessageInput";

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
                <Tabs tabs={tabs}/>
                <Messages messages={this.props.messages}/>
                <MessageInput messageSend={this.props.onMessageSend}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages.messages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMessageSend: (event, message) => {
            event.preventDefault();
            dispatch(actions.sendMessage('default', message, 'danijela'));
        },
        onInitMessages: () => dispatch(actions.initMessages()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
