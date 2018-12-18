import React, { Component } from 'react';

import classes from './Messages.module.css';
import Message from "./Message/Message";

class messages extends Component {
    componentDidMount() {
        console.log(this.props.messages);
    }

    render() {
        return (
            <div className={classes.Messages}>
                <ul>
                    {this.props.messages.map(message => (
                        <Message
                            key={message.id}
                            {...message}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default messages;
