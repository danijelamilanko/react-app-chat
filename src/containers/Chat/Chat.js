import React, { Component } from 'react';
import Tabs from '../../components/Tabs/Tabs';
import Messages from "../../components/Messages/Messages";
import classes from './Chat.module.css';

const tabs = [
    { title: 'Name 1' },
    { title: 'Name 2' }
];

class Chat extends Component {
    render () {
        return (
            <div className={classes.Chat}>
                <Tabs tabs={tabs}/>
                <Messages/>
            </div>
        );
    }
}

export default Chat;
